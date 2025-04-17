import { useEffect, useState } from "react";
import "../../css/Admin/subIncharge.css";
import { Axios } from "../AxiosReqestBuilder";
import Swal from "sweetalert2";

const SubIncharge = () => {
    const [staff, setStaff] = useState([]);

    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const response = await Axios('admin/managers');
                if (response.status !== 200) {
                    Swal.fire({
                        title: "Error",
                        text: "Failed to fetch staff data",
                        icon: "error",
                        confirmButtonText: "Ok",
                    });
                    return;
                }
                setStaff(response.data);
            } catch (error) {
                Swal.fire({
                    title: "Network Error",
                    text: "Failed to fetch staff data",
                    icon: "error",
                    confirmButtonText: "Ok",
                });
            }
        };
        fetchStaff();
    },[]);

    const handleSelectChange = async (id, choice) => {
        if(choice === "incharge"){
            try {
                const response = await Axios.put(`admin/incharge/${id}`);
                setStaff(response.data);
                Swal.fire({
                    title: "Success",
                    text: "Successfully assigned incharge",
                    icon: "success",
                    confirmButtonText: "Ok",
                });
            } catch (error) {
                Swal.fire({
                    title: error.response.data.message || "Error",
                    text: "Failed to assign incharge",
                    icon: "error",
                    confirmButtonText: "Ok",
                });
            }
        }else if(choice === "non-incharge"){
            try {
                const response = await Axios.put(`admin/unIncharge/${id}`);
                setStaff(response.data);
                Swal.fire({
                    title: "Success",
                    text: "Successfully assigned non-incharge",
                    icon: "success",
                    confirmButtonText: "Ok",
                });
            } catch (error) {
                Swal.fire({
                    title: error.response.data.message || "Error",
                    text: "Failed to assign non-incharge",
                    icon: "error",
                    confirmButtonText: "Ok",
                });
            }
        }
    };

    return (
        <div className="subIncharge_container">
            <h1>Assign Temporary Head of Department</h1>
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
    );
};

export default SubIncharge;