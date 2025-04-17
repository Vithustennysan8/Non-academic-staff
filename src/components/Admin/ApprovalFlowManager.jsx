import { useState, useEffect } from "react";
import { Axios } from "../AxiosReqestBuilder";
import "../../css/Admin/approvalFlowManager.css";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd"
import Swal from "sweetalert2";

const ApprovalFlowManager = () => {
  const [flows, setFlows] = useState([]); // List of all flows
  const [selectedFlow, setSelectedFlow] = useState(null); // Currently selected flow
  const [newRole, setNewRole] = useState(""); // Role being added
  const [formType, setFormType] = useState("");
  const [uniqueName, setUniqueName] = useState('');
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [update, setUpdate] = useState(true);
  const [positions, setPositions] = useState([]); 
  const [dynamicForms, setDynamicForms] = useState([]);

  // Fetch approval flows from the backend
  useEffect(() => {

    const fetchFlows = async () => {
        try {
            const response = await Axios.get("/admin/approvalFlow/getAll");
            setFlows(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    const fetchPositions = async () => {
      try {
        const response = await Axios.get("/auth/user/jobPosition/get");
        setPositions(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    const fetchDynamicFormList = async () => {
      try {
        const response = await Axios.get("/auth/user/dynamicForm/getAll");
        setDynamicForms(response.data);
      } catch (error) {
        console.log(error);          
      }
    }
    fetchDynamicFormList();
    fetchPositions();
    fetchFlows();
  }, []);

  // Handle adding a new role to the selected flow
  const handleAddRole = () => {
    // Check if a flow is selected
    if (!newRole){
      Swal.fire({
        title: "Please select a role!",
        icon: "warning",
      });
      return;
    } 
    
    // Check if the role already exists in the flow
    const roleExists = selectedFlow.flow.some((item) => item.roleName === newRole);
    if (roleExists) {
      Swal.fire({
        title: "Role already exists in the flow!",
        icon: "warning",
      });
      return;
    }
    // Check if the newRole is already selected
    const roleAlreadySelected = selectedFlow.flow.some((item) => item.roleName === newRole);
    if (roleAlreadySelected) {
      Swal.fire({
        title: "Role already selected!",
        icon: "warning",
      });
      return;
    }

    const newSequence = selectedFlow.flow.length + 1;
    const updatedFlow = [
      ...selectedFlow.flow,
      { roleName: newRole, sequence: newSequence },
    ];

    setSelectedFlow({ ...selectedFlow, flow: updatedFlow });
    setNewRole("");
  };

  // Handle saving the flow to the backend
  const handleAddNewFlow = async () => {
    try {
    const response = await Axios.post("/admin/approvalFlow/add", {
        formType,
        uniqueName,
        approvalStage: selectedFlow.flow,
      })
        Swal.fire({
          title: "Approval flow saved successfully!",
          icon: "success",
        })
        console.log(response.data);
        setFlows(response.data);
        setUpdate(true);
        setFaculty('');
        setUniqueName('');
        setDepartment('');
        setFormType('');  
    }catch(error){
      Swal.fire({
        title: error.response.data.message,
        icon: "error",
      })
    }
  };

  // Handle deleting the selected flow
  const handleDeleteFlow = async () => {
    try {
        const response = await Axios.delete("/admin/approvalFlow/delete", {
            data: { "formType": formType,
              "uniqueName": uniqueName,
             },
        })
        console.log(response.data);
        Swal.fire({
          title: "Approval flow saved successfully!",
          icon: "success",
        })
        setFlows((prevFlows) =>
          prevFlows.filter((flow) =>
              flow.formType !== formType ||
              flow.faculty !== faculty ||
              flow.department !== department ||
              flow.uniqueName !== uniqueName
          )
        );
        setSelectedFlow(null);
        setFormType('');
        setFaculty('');
        setUniqueName('');
        setDepartment('');
    } catch (error) {
      Swal.fire({
        title: error.response.data.message,
        icon: "error",
      })
        console.log(error);
    }
  };

  const handleUpdateFlow = async () => {
    try {
        const response = await Axios.put("/admin/approvalFlow/update", {
            formType,
            uniqueName,
            approvalStage: selectedFlow.flow,
        })
        console.log(selectedFlow.flow);
        setFlows(response.data);
        console.log(response.data);
        Swal.fire({
          title: "Approval flow updated successfully!",
          icon: "success",
        })
    } catch (error) {
        console.log(error);
    }
  };


  const handlePopup = () => {
    const showConfirmDialog = () => {
      Swal.fire({
        title: "Are you sure?",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Succcess", "");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      });
    };
    showConfirmDialog();
}

// const handleDragEnd = (result) => {
//   if (!result.destination) return; // Dropped outside the list

//   const items = Array.from(roles);
//   const [reorderedItem] = items.splice(result.source.index, 1);
//   items.splice(result.destination.index, 0, reorderedItem);

//   // Update the sequence based on new order
//   const updatedRoles = items.map((item, index) => ({
//     ...item,
//     sequence: index + 1,
//   }));

//   setRoles(updatedRoles);
// };

  return (
    <div className="approval-flow-manager">
      <h1>Approval Flow Manager</h1>

    <div className="approval-flow-manager-div">

      {/* Form for selecting or creating a flow */}
      <div className="inputDiv">
        <div className="inputs">
          <select
            value={formType}
            onChange={(e) => setFormType(e.target.value)}
            >
            <option value="">Select Form Type</option>
            {dynamicForms.map((form, index) => (
              <option key={index} value={form.formType}>
                {form.formType}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="uniqueName"
            value={uniqueName}
            onChange={(e) => setUniqueName(e.target.value)}
            />
        </div>
        <button
        className="bttn ashbtn"
        onClick={() =>{
          setUpdate(false);
          if(formType===""){
            alert("Please enter form type");
            return;
          }
          setSelectedFlow({formType, uniqueName, faculty, department,flow: [],})
        }
      }
      >
          Create New Flow
        </button>
      </div>

      {/* List of existing flows */}
      <div className="flowViewer">
        <h2>Existing Flows</h2>
        <ul>
            {flows?.map((flow, index) =>
                <li
                key={index}
                onClick={() => {
                  setFormType(flow.formType);
                  setFaculty(flow.faculty);
                  setDepartment(flow.department);
                  setUniqueName(flow.uniqueName);
                    setSelectedFlow(flow);
                    setUpdate(true)
                  }}
                  >
              {flow.formType} - {flow.uniqueName} - {flow.faculty} - {flow.department}
            </li>
            )}
        </ul>
      </div>

          {/* Drag-and-Drop Editor */}
            {selectedFlow && (
            <div className="selectedFlow">
              <h2>Editing Flow for {selectedFlow.formType}</h2>
              <DragDropContext
                onDragEnd={(result) => {
                  if (!result.destination) return;

                  // Handle reordering logic here
                  const reorderedFlow = Array.from(selectedFlow.flow);
                  const [movedItem] = reorderedFlow.splice(result.source.index, 1);
                  reorderedFlow.splice(result.destination.index, 0, movedItem);

                  const updatedTheorder = reorderedFlow.map((item, index) => {
                    return {...item, "sequence": index + 1};
                  })

                  // Update the selectedFlow state with the reordered flow
                  const updatedFlow = { ...selectedFlow, flow: updatedTheorder };
                  // Assuming a function `updateSelectedFlow` to update the state
                  setSelectedFlow(updatedFlow);
                }}
              >
                <Droppable droppableId="roles">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        padding: "10px",
                        border: "1px solid #ddd",
                        borderRadius: "5px",
                        backgroundColor: "#f0f0f0",
                      }}
                    >
                      {selectedFlow.flow?.map((role, index) => (
                        <Draggable key={role.roleName} draggableId={role.roleName} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                ...provided.draggableProps.style,
                                padding: "10px",
                                margin: "5px 0",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                                backgroundColor: "#fff",
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            > 
                              <span>{role.roleName}</span>
                              <span>{role.sequence}</span>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          )}


          {/* Add new role */}
          <div className="addNewRole">
            <select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              >
              <option value="">Select Role</option>
              {positions.map((position, index) => (
                <option key={index} value={position.jobPositionName}>
                  {position.jobPositionName}
                </option>
              ))}
            </select>
            <button onClick={handleAddRole}>Add Role</button>
          </div>

          {/* Save or Delete */}
          <div className="saveDelete">
            {
              update ? 
              <button className="bttn ashbtn" onClick={handleUpdateFlow}>Update Flow</button>:
              <button className="bttn ashbtn" onClick={handleAddNewFlow}>Save Flow</button>
            }
            <button className="bttn redbtn" onClick={handlePopup} >
              Delete Flow
          </button>
          </div>
          </div>
        </div>
      )}

export default ApprovalFlowManager;

