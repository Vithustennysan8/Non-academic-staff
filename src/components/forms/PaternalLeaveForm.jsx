import { useContext } from 'react'
import "../../css/Forms/paternalLeaveForm.css"
import { UserContext } from '../../Contexts/UserContext'
import { useForm } from 'react-hook-form';

const PaternalLeaveForm = () => {
    const {user} = useContext(UserContext);

    const {register, handleSubmit, formState : {errors}} = useForm();

    const onSubmit = async () => {

    }

  return (
    <>
        <div className='PaternalLeaveForm'>
            <h2>Paternal Leave Form</h2>

            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="input-group">
                    <label htmlFor="name">Name of the applicant: </label>
                    <p>{user.first_name}</p>
                </div>

                <div className="input-group">
                    <label htmlFor="upfNo">UPF No: </label>
                    <p>{user.emp_id}</p>
                </div>

                <div className="input-group">
                    <label htmlFor="designation">Designation: </label>
                    <input type="text" name='designation' {...register("designation", {required:{
                        value: true,
                        message: "Designation is required"
                    }})}/>
                    {errors.designation && <p>{errors.designation.message}</p>}
                </div>

                <div className="input-group">
                    <label htmlFor="faculty">Faculty/unit: </label>
                    <p>{user.faculty}</p>
                </div>

                <div className="input-group">
                    <label htmlFor="department">Division/Department/Unit/Center: </label>
                    <p>{user.department}</p>
                </div>

                <div className="input-group">
                    <label htmlFor="childBirthDate">Child Birth Date: </label>
                    <input type="date" name="childBirthDate" {...register("childBirthDate", {required:{
                        value: true,
                        message: "Child Birth Date is required"
                    }})} />
                    {errors.childBirthDate && <p>{errors.childBirthDate.message}</p>}
                </div>

                <div className="input-group">
                    <label htmlFor="birthCertificate">Birth Certificate: </label>
                    <input type="file" name="birthCertificate" />
                </div>

                <div className="input-group">
                    <label htmlFor="requestDate">Request Date: </label>
                    <input type="date" name="requestDate" {...register("requestDate", {required:{
                        value: true,
                        message: "Request Date is required"
                    }})} />
                    {errors.requestDate && <p>{errors.requestDate.message}</p>}
                    
                </div>
                    
                <div className="submit-btn">
                    <input type="submit" className='bttn redbtn' value={"Submit"}/>
                </div>
            </form>
        </div>
    </>
  )
}

export default PaternalLeaveForm