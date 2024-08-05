import axios from 'axios'
import {  useState } from 'react'
import FullLeaveFormPreview from './FullLeaveFormPreview'
import ShortLeaveFormPreview from './ShortLeaveFormReview'
import SubtituteFormPreview from './SubtituteFormPreview'
import TransferFormPreview from './TransferFormPreview'

const FullLeaveForms = () => {
    const [fullLeaveForms, setFullLeaveForms] = useState([])
    const [shortLeaveForms, setShortLeaveForms] = useState([])
    const [subtituteForms, setSubtituteForms] = useState([])
    const [transferForms, setTransferForms] = useState([])

    const [department, setDepartment] = useState('')

    const handleFullForm = async (e) => {
        e.preventDefault();
        
            try {
                const response = await axios.get(`http://localhost:8080/api/auth/full_leave_form/get/${department}`);
                setFullLeaveForms(response.data);
                console.log(response.data)
            } catch (error) {
                console.log( error);
            }
        }
    const handleShortForm = async (e) => {
        e.preventDefault();
        
            try {
                const response = await axios.get(`http://localhost:8080/api/auth/short_leave_form/get/${department}`);
                setShortLeaveForms(response.data);
                console.log(response.data)
            } catch (error) {
                console.log( error);
            }
        }
    const handleTransferForm = async (e) => {
        e.preventDefault();
        
            try {
                const response = await axios.get(`http://localhost:8080/api/auth/transfer_form/get/${department}`);
                setTransferForms(response.data);
                console.log(response.data)
            } catch (error) {
                console.log( error);
            }
        }
    const handleSubtituteForm = async (e) => {
        e.preventDefault();
        
            try {
                const response = await axios.get(`http://localhost:8080/api/auth/subtitute_form/get/${department}`);
                setSubtituteForms(response.data);
                console.log(response.data)
            } catch (error) {
                console.log( error);
            }
        }

  return (
    <>
    <div>Forms
        <div>
            <label htmlFor="">Enter for fullleaveform
                <input type="text" name="department" id="" value={department} onChange={e=> setDepartment(e.target.value)}/>
            </label>
        <button onClick={handleFullForm}>Submit</button>
        </div>
        <div>
            <label htmlFor="">Enter for shortleaveform
                <input type="text" name="department" id="" value={department} onChange={e=> setDepartment(e.target.value)}/>
            </label>
        <button onClick={handleShortForm}>Submit</button>
        </div>
        <div>
            <label htmlFor="">Enter transferform
                <input type="text" name="department" id="" value={department} onChange={e=> setDepartment(e.target.value)}/>
            </label>
        <button onClick={handleTransferForm}>Submit</button>
        </div>
        <div>
            <label htmlFor="">Enter subtituteForm
                <input type="text" name="department" id="" value={department} onChange={e=> setDepartment(e.target.value)}/>
            </label>
        <button onClick={handleSubtituteForm}>Submit</button>
        </div>

        <ul>
            FullLeaveForm
            {fullLeaveForms.map((form, index) => (
                <li key={index} style={{border:"1px solid #ccc", padding:"10px"}}>
                    <FullLeaveFormPreview application={form}/>
                </li>
            ))}

        </ul>
        <ul>
            ShortLeaveForm
            {shortLeaveForms.map((form, index) => (
                <li key={index} style={{border:"1px solid #ccc", padding:"10px"}}>
                    <ShortLeaveFormPreview application={form}/>
                </li>
            ))}

        </ul>
        <ul>
            SubtituteForm
            {subtituteForms.map((form, index) => (
                <li key={index} style={{border:"1px solid #ccc", padding:"10px"}}>
                    <SubtituteFormPreview application={form}/>
                </li>
            ))}

        </ul>
        <ul>
            TranserForm
            {transferForms.map((form, index) => (
                <li key={index} style={{border:"1px solid #ccc", padding:"10px"}}>
                    <TransferFormPreview application={form}/>
                </li>
            ))}

        </ul>
    </div>
    </>
  )
}

export default FullLeaveForms