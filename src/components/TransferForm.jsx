import  { useEffect } from 'react';
import '../css/transfer.css'; 
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const TransferForm = () => {
    const naviagte = useNavigate();
    
    useEffect(()=>{
        if(localStorage.getItem("token") == null){
          naviagte("/login");
        }
    },[naviagte])

    const {register, handleSubmit, formState: {errors}} = useForm();

    const onSubmit = async (data) => {
        
        const formData = new FormData();
        if(data.file){
            formData.append('file', data.file[0]);
        }

        Object.keys(data).forEach((key) => {
            if (key === "job_start_date"){
                formData.append(key, data[key].split('-').reverse().join("-"));
            }
            if( key != "file" || key != "job_start_date"){
                formData.append(key, data[key]);
            }
        })

        console.log(formData);

        try {
            const response = await axios.post("http://localhost:8080/api/auth/transfer_form/send", formData,
                {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                      'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                  }
            );
            console.log(response.data);
            alert("form submitted successfully");
            naviagte("/forms");
        } catch (error) {
            console.log(error);
        }

    }
    
    return (
        <div className="transferform">
            <div className="transfer-container">
                <h2>Transfer Application Form</h2>
                <form id="TransferForm" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">

                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" {...register("name", {required: {
                            value: true,
                            message: "Name is required"
                        }})} />
                        {errors.name && <span className='error'>{errors.name.message}</span>}
                    </div>

                    <div className="form-group label-inline">
                        <label htmlFor="EmpID">EmpID:</label>
                        <input type="text" id="EmpID" name="empId" {...register("empId", {required: {
                            value: true,
                            message: "EmpID is required"
                        }})} />
                        {errors.emp_id && <span className='error'>{errors.emp_id.message}</span>}
                    </div>

                    <div className="form-group label-inline">
                        <label htmlFor="Facul">Faculty:</label>
                        <input type="text" id="Facul" name="faculty" {...register("faculty", {required: {
                            value: true,
                            message: "Faculty is required"
                        }})}/>
                        {errors.faculty && <span className='error'>{errors.faculty.message}</span>}
                    </div>

                    <div className="form-group label-inline">
                        <label htmlFor="Dept">Department:</label>
                        <input type="text" id="Dept" name="department" {...register("department", {required: {
                            value: true,
                            message: "Department is required"
                        }})} />
                        {errors.department && <span className='error'>{errors.department.message}</span>}
                    </div>

                    <div className="form-group label-inline">
                        <label htmlFor="jobStartDate">Job Start Date:</label>
                        <input type="date" id="jobStartDate" name="job_start_date" {...register("job_start_date", {required: {
                            value: true,
                            message: "Job Start Date is required"
                        }})} />
                        {errors.job_start_date && <span className='error'>{errors.job_start_date.message}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="experience">Experience (working duration):</label>
                        <input type="text" id="experience" name="experience" {...register("experience")} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="preference1">Preference 1:</label>
                        <select id="preference1" name="preference1" {...register("preference1", {required: {
                            value: true,
                            message: "Preference 1 is required"
                        }})}>
                            <option value="">Select one...</option>
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
                        {errors.preference1 && <span className='error'>{errors.preference1.message}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="preference2">Preference 2:</label>
                        <select id="preference2" name="preference2" {...register("preference2", {required: {
                            value: true,
                            message: "Preference 2 is required"
                        }})} >
                            <option value="">Select one...</option>
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
                        {errors.preference2 && <span className='error'>{errors.preference2.message}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="preference3">Preference 3:</label>
                        <select id="preference3" name="preference3" {...register("preference3", {required: {
                            value: true,
                            message: "Preference 3 is required"
                        }})} >
                            <option value="">Select one...</option>
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
                        {errors.preference3 && <span className='error'>{errors.preference3.message}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="reason">Reason:</label>
                        <textarea id="reason" name="reason" rows="4" {...register("reason", {required: {
                            value: true,
                            message: "Reason is required"
                        }})} ></textarea>
                        {errors.reason && <span className='error'>{errors.reason.message}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="file">Additional Documnets:</label>
                        <input type="file" id="file" name="file" {...register('file')} />
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>

    );
};

export default TransferForm;
