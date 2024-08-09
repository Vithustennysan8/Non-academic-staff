import axios from 'axios'
import {  useState } from 'react'
import FullLeaveFormPreview from './FullLeaveFormPreview'
import { useForm } from 'react-hook-form'
// import ShortLeaveFormPreview from './ShortLeaveFormReview'
// import SubtituteFormPreview from './SubtituteFormPreview'
// import TransferFormPreview from './TransferFormPreview'

const FullLeaveForms = () => {
    const [Forms, setForms] = useState([])


    // const [department, setDepartment] = useState('')
        const onSubmit = async (data) => {
            const {faculty, department, formType} = data

            try {
                const response = await axios.post(`http://localhost:8080/api/admin/${formType}`,{faculty,department},
                    {
                        headers:{
                            Authorization:`Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );
                setForms(response.data);
                console.log(response.data)
            } catch (error) {
                console.log(">>> " + error);
            }
        }

  const {register, handleSubmit, formState: errors} = useForm();
  const [selectedFaculty,setSelectedFaculty] = useState('');


    const faculties = [
        {faculty:"Faculty of Engineering",
          department:"Chemical and Process Engineering, Computer Engineering, Civil Engineering, Electrical and Electronic Engineering, Engineering Mathematics, Manufacturing and Industrial Engineering, Mechanical Engineering, Dean's Office"},
        {faculty:"Faculty of Science",
          department:"Botany, Chemistry, Environmental and Industrial Sciences, Geology, Statistics and Computer Science, Mathematics, Molecular Biology and Biotechnology, Physics, Zoology, Dean's Office"},
        {faculty:"Faculty of Arts",
          department:"Arabic and Islamic Civilization, Archaeology, Classical Languages, Economics and Statistics, Education, English, English Language Teaching, Fine Arts, Geography, History, Information Technology, Law, Philosophy, Psychology, Political Science, Pali and Buddhist Studies, Sinhala, Sociology, Tamil, Dean's Office"},
        {faculty:"Faculty of Medicine",
          department:"Anatomy, Anaesthesiology and Critical Care, Biochemistry, Community Medicine, Family Medicine, Forensic Medicine, Medical Education, Medicine, Microbiology, Obstetrics and Gynaecology, Paediatrics, Parasitology, Pathology, Pharmacology, Physiology, Psychiatry, Radiology, Surgery, Dean's Office"},
        {faculty:"Faculty of Veterinary Medicine and Animal Science",
          department:"Basic Veterinary Sciences, Veterinary Clinical Sciences, Farm Animal Production and Health, Veterinary Pathobiology, Veterinary Public Health and Pharmacology, Dean's Office"},
        {faculty:"Faculty of Agriculture",
          department:"Agricultural Biology, Agricultural Economics and Business Management, Agricultural Engineering, Agricultural Extension, Animal Science, Crop Science, Food Science and Technology, Soil Science, Dean's Office"},
        {faculty:"Faculty of Allied Health Sciences",
          department:"Medical Laboratory Sciences, Nursing, Pharmacy, Physiotherapy, Radiography and Radiotherapy, Basic Sciences, Dean's Office"},
        {faculty:"Faculty of Dental Sciences",
          department:"Basic Sciences, Community Dental Health, Comprehensive Oral Health Care, Oral Medicine and Periodontology, Oral Pathology, Prosthetic Dentistry, Restorative Dentistry, Oral and Maxillofacial Surgery, Dean's Office"},
        {faculty:"Faculty of Management",
          department:"Business Finance, Human Resource Management, Management Studies, Marketing Management, Operations Management"},
        {faculty:"Registrar's Office",
          department:"Administrative Section"},
        {faculty:"Administration Office",
          department:"Administrative Section"},
        {faculty:"IT Services",
          department:"Technical Section"},
        {faculty:"Library Services",
          department:"Library Section"},
        {faculty:"Facilities Management",
          department:"Maintenance Section"},
        {faculty:"Security Services",
          department:"Security Section"},
        {faculty:"Finance Department",
          department:"Finance Section"},
        {faculty:"Human Resources Department",
          department:"HR Section"},
        {faculty:"Student Affairs Office",
          department:"Student Affairs Section"},
      ]

const departments = faculties.find(faculty => faculty.faculty === selectedFaculty)?.department.split(', ') || [];

  return (
    <>
    <div>
        <h1>Request Forms</h1>
        <form onSubmit={handleSubmit(onSubmit)}>

            <div className="half">
                <div className="Faculty">
                  <label htmlFor="faculty">Faculty</label>
                  <select name="faculty" id="faculty" {...register("faculty", {required:{
                      value:true,
                      message:"Faculty is required"
                    }})} 
                  onChange={e => setSelectedFaculty(e.target.value)}
                  >
                    <option value="">select one....</option>
                    {faculties.map((faculty,index) => (
                      <option key={index} value={faculty.faculty}>{faculty.faculty}</option>
                    ))}
                    
                  </select>
                    {errors.faculty && <span className="error">{errors.faculty.message}</span>}
                </div>
              
              
              
              <div className="department">
                <label htmlFor="department">Department</label>
                <select id="department" name="department" {...register("department", {required:{
                    value:true,
                    message:"Department is required"
                }})}>
                  <option value="">select one....</option>
                  
                  {departments.map((department, index) => (
                      <option key={index} value={department}>{department}</option>
                    ))}

                </select>
                {errors.department && <span className="error">{errors.department.message}</span>}
              </div>

              <div>
                <label htmlFor="">Form type</label>
                <select name="formType" id="" {...register("formType")}>
                    <option value="">Select a form type</option>
                    <option value="fullLeaveForm">FullLeaveForm</option>
                    <option value="shortLeaveForm">ShortLeaveForm</option>
                    <option value="subtituteForm">SubtituteForm</option>
                    <option value="transferForm">TransferForm</option>
                </select>
              </div>
            </div>

            <input type="submit" value="Submit" />

        </form>


        <ul>
            FullLeaveForm
            {Forms.map((form, index) => (
                <li key={index} style={{border:"1px solid #ccc", padding:"10px"}}>
                    <FullLeaveFormPreview application={form}/>
                </li>
            ))}

        </ul>

    </div>
    </>
  )
}

export default FullLeaveForms