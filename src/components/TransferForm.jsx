import  { useEffect, useState } from 'react';
import '../css/transfer.css'; 
import { useNavigate } from 'react-router-dom';

const TransferForm = () => {
    const naviagte = useNavigate();
    
    useEffect(()=>{
        if(localStorage.getItem("token") == null){
          naviagte("/login");
        }
    },[naviagte])

    const [formData, setFormData] = useState({
        name: '',
        EmpID: '',
        Dept: '',
        email: '',
        experience: '',
        preference1: 'colombo',
        preference2: 'colombo',
        preference3: 'colombo',
        reason: '',
        file: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, file });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        alert(`Transfer application submitted:
        Name: ${formData.name}
        Email: ${formData.email}
        Preference 1: ${formData.preference1}
        Preference 2: ${formData.preference2}
        Preference 3: ${formData.preference3}
        Reason: ${formData.reason}`);
    };

    
    return (
        <div className="transferform">
        <div className="transfer-container">
            <h2>Transfer Application Form</h2>
            <form id="TransferForm" onSubmit={handleSubmit} encType="multipart/form-data">

                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>

                <div className="form-group label-inline">
                    <label htmlFor="EmpID">EmpID:</label>
                    <input type="text" id="EmpID" name="EmpID" value={formData.EmpID} onChange={handleChange} required />
                </div>

                <div className="form-group label-inline">
                    <label htmlFor="Facul">Faculty:</label>
                    <input type="text" id="Facul" name="Facul" value={formData.Facul} onChange={handleChange} required />
                </div>

                <div className="form-group label-inline">
                    <label htmlFor="Dept">Department:</label>
                    <input type="text" id="Dept" name="Dept" value={formData.Dept} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="experience">Experience (working duration):</label>
                    <input type="text" id="experience" name="experience" value={formData.experience} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="preference1">Preference 1:</label>
                    <select id="preference1" name="preference1" value={formData.preference1} onChange={handleChange} required>
                        <option value="colombo">University of Colombo</option>
                        <option value="Jayepura">University of Sri Jayewardenepura</option>
                        <option value="ruhuna">University of Ruhuna</option>
                        <option value="moratuwa">University of Moratuwa</option>
                        <option value="kelaniya">University of Kelaniya</option>
                        <option value="rajarata">Rajarata University</option>
                        <option value="jaffna">University of Jaffna</option>
                        <option value="sabaragamuwa">Sabaragamuwa University</option>
                        <option value="south eastern">South Eastern University</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="preference2">Preference 2:</label>
                    <select id="preference2" name="preference2" value={formData.preference2} onChange={handleChange} required>
                        <option value="colombo">University of Colombo</option>
                        <option value="Jayepura">University of Sri Jayewardenepura</option>
                        <option value="ruhuna">University of Ruhuna</option>
                        <option value="moratuwa">University of Moratuwa</option>
                        <option value="kelaniya">University of Kelaniya</option>
                        <option value="rajarata">Rajarata University</option>
                        <option value="jaffna">University of Jaffna</option>
                        <option value="sabaragamuwa">Sabaragamuwa University</option>
                        <option value="south eastern">South Eastern University</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="preference3">Preference 3:</label>
                    <select id="preference3" name="preference3" value={formData.preference3} onChange={handleChange} required>
                        <option value="colombo">University of Colombo</option>
                        <option value="Jayepura">University of Sri Jayewardenepura</option>
                        <option value="ruhuna">University of Ruhuna</option>
                        <option value="moratuwa">University of Moratuwa</option>
                        <option value="kelaniya">University of Kelaniya</option>
                        <option value="rajarata">Rajarata University</option>
                        <option value="jaffna">University of Jaffna</option>
                        <option value="sabaragamuwa">Sabaragamuwa University</option>
                        <option value="south eastern">South Eastern University</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="reason">Reason:</label>
                    <textarea id="reason" name="reason" rows="4" value={formData.reason} onChange={handleChange} required></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="file">Resume:</label>
                    <input type="file" id="file" name="file" onChange={handleFileChange} />
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
        </div>

    );
};

export default TransferForm;
