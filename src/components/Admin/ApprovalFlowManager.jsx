import { useState, useEffect } from "react";
import { Axios } from "../AxiosReqestBuilder";
import "../../css/Admin/approvalFlowManager.css";
import Popup from "../Common/Popup";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd"

const ApprovalFlowManager = () => {
  const [flows, setFlows] = useState([]); // List of all flows
  const [selectedFlow, setSelectedFlow] = useState(null); // Currently selected flow
  const [newRole, setNewRole] = useState(""); // Role being added
  const [formType, setFormType] = useState("");
  const [uniqueName, setUniqueName] = useState('');
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [update, setUpdate] = useState(true);

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
    fetchFlows();
  }, []);

  // Handle adding a new role to the selected flow
  const handleAddRole = () => {
    if (!newRole) return;

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
        alert("Approval flow saved successfully!");
        console.log(response.data);
        setFlows(response.data);
        setUpdate(true);
        setFaculty('');
        setUniqueName('');
        setDepartment('');
        setFormType('');  
    }catch(error){
        alert(error.response.data.message);
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
        alert("Approval flow deleted successfully!");
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
      alert(error.response.data.message);
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
        alert("Update successfully");
    } catch (error) {
        console.log(error);
    }
  };

  const [popup, setPopup] = useState(false);
  const handlePopup = () => {
    if(popup){
      setPopup(false);
      document.getElementById("popup-container").style.display = "none";
    }else{
      setPopup(true);
      document.getElementById("popup-container").style.display = "block";
    }
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

      <Popup handlePopup={handlePopup} operation={handleDeleteFlow} content={"Do you want to delete???"}/>
      {/* Form for selecting or creating a flow */}
      <div className="inputDiv">
        <div className="inputs">
          <input
            type="text"
            placeholder="Form Type"
            value={formType}
            onChange={(e) => setFormType(e.target.value)}
            />
          <input
            type="text"
            placeholder="uniqueName"
            value={uniqueName}
            onChange={(e) => setUniqueName(e.target.value)}
            />
          {/* <input
            type="text"
            placeholder="Faculty"
            value={faculty}
            onChange={(e) => setFaculty(e.target.value)}
            />
            <input
            type="text"
            placeholder="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            /> */}
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
            <input
              type="text"
              placeholder="New Role"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              />
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

