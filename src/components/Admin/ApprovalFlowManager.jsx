import { useState, useEffect } from "react";
import axios from "axios";
import { Axios } from "../AxiosReqestBuilder";
import "../../css/Admin/approvalFlowManager.css";

const ApprovalFlowManager = () => {
  const [flows, setFlows] = useState([]); // List of all flows
  const [selectedFlow, setSelectedFlow] = useState(null); // Currently selected flow
  const [newRole, setNewRole] = useState(""); // Role being added
  const [formType, setFormType] = useState("");
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
        approvalStage: selectedFlow.flow,
      })
        alert("Approval flow saved successfully!");
        console.log(response.data);
        setFlows(response.data);
        setUpdate(true);
        setFaculty('');
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
            data: { formType: formType },
        })
        console.log(response.data);
        alert("Approval flow deleted successfully!");
        setFlows((prevFlows) =>
          prevFlows.filter((flow) =>
              flow.formType !== formType ||
              flow.faculty !== faculty ||
              flow.department !== department
          )
        );
        setSelectedFlow(null);
        setFormType('');
        setFaculty('');
        setDepartment('');
    } catch (error) {
        console.log(error);
    }
  };

  const handleUpdateFlow = async () => {
    try {
        const response = await Axios.put("/admin/approvalFlow/update", {
            formType,
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

  return (
    <div className="approval-flow-manager">
      <h1>Approval Flow Manager</h1>

      {/* Form for selecting or creating a flow */}
      <div className="inputDiv">
        <input
          type="text"
          placeholder="Form Type"
          value={formType}
          onChange={(e) => setFormType(e.target.value)}
        />
        <input
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
        />
        <button
        className="bttn ashbtn"
          onClick={() =>{
            setUpdate(false);
            if(formType===""){
              alert("Please enter form type");
              return;
            }
            setSelectedFlow({formType, faculty, department,flow: [],})
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
            {flows.map((flow, index) =>
                <li
                key={index}
                onClick={() => {
                    setFormType(flow.formType);
                    setFaculty(flow.faculty);
                    setDepartment(flow.department);
                    setSelectedFlow(flow);
                    setUpdate(true)
                }}
            >
              {flow.formType} - {flow.faculty} - {flow.department}
            </li>
            )}
        </ul>
      </div>

      {/* Drag-and-Drop Editor */}
      {selectedFlow && (
        <div className="selectedFlow">
          <h2>Editing Flow for {selectedFlow.formType}</h2>
                  {selectedFlow.flow.map((role, index) => (
                    
                        <div
                        key={index}
                          style={{
                            padding: "10px",
                            margin: "5px 0",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                            backgroundColor: "#f9f9f9",
                          }}
                        >
                            {role.roleName} - {role.sequence}
                        </div>
                  ))}
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
            <button className="bttn redbtn" onClick={handleDeleteFlow} >
              Delete Flow
          </button>
          </div>
        </div>
      )}

export default ApprovalFlowManager;

