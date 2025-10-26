import { useEffect, useState } from "react";
import "../../css/Admin/subIncharge.css";
import { Axios } from "../AxiosReqestBuilder";
import { toast } from "react-toastify";

const SubIncharge = () => {
    const [staff, setStaff] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const response = await Axios('admin/managers');
                if (response.status !== 200) {
                    toast.error("Failed to fetch staff data");
                    return;
                }
                setStaff(response.data);
            } catch (error) {
                console.log("Error fetching staff", error);
            } finally {
                setTimeout(() => {
                    setIsLoading(false);
                }, 500);
            }
        };
        fetchStaff();
    },[]);

    const handleSelectChange = async (id, choice) => {
        if(choice === "incharge"){
            try {
                const response = await Axios.put(`admin/incharge/${id}`);
                setStaff(response.data);
                toast.success("Successfully assigned incharge");
            } catch (error) {
                console.log("Error assigning incharge", error);
            }
        }else if(choice === "non-incharge"){
            try {
                const response = await Axios.put(`admin/unIncharge/${id}`);
                setStaff(response.data);
                toast.success("Successfully assigned non-incharge");
            } catch (error) {
                console.log("Error assigning non-incharge", error);
            }
        }
    };

    if(isLoading){
        return (
            <div className="subIncharge_container">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading staff information...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="subIncharge_container">
            <h1>Assign Temporary Head of Department</h1>
            <div className="table-container">
            <table border="1" style={{ width: '100%', textAlign: 'left' }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Staff ID</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {staff.map((member) => (
                        <tr key={member.id}>
                            <td>{member.first_name + " " + member.last_name}</td>
                            <td>{member.id}</td>
                            <td>{member.role === "ADMIN" ? "incharge" : "non-incharge"}</td>
                            <td>
                                {/* <select
                                    onChange={(e) => handleSelectChange(member.id, e.target.value)}
                                >
                                    <option value="">Select</option>
                                    <option value="incharge">Incharge</option>
                                    <option value="non-incharge">Non-Incharge</option>
                                </select> */}
                                { member.role === "ADMIN" ? 
                                <button className="bttn incharge" onClick={() => handleSelectChange(member.id, "non-incharge")}>
                                    Remove Incharge
                                </button> :
                                <button className="bttn nonIncharge" onClick={() => handleSelectChange(member.id, "incharge")}>
                                    Assign Incharge
                                </button>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default SubIncharge;