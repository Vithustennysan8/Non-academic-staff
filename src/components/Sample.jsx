import { useContext, useState } from 'react'
import { Axios } from './AxiosReqestBuilder';
import {UserContext} from '../Contexts/UserContext'

const Sample = () => {
    const {user} = useContext(UserContext);

    const [data , setData] = useState({
        name: '',
        reason: '',
        faculty: user.faculty,
        department: user.department,
        userId: user.id,
    })

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });  
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try {
            const response = await Axios.post("/auth/sample/submit", data);
            alert("form submitted successfully");
            setData({ name: '', reason: '', faculty: user.faculty, department: user.department, userId: user.id })
            console.log(response.data);
        } catch (error) {
            console.log("Testing",error);
        }
    }

  return (
    <form onSubmit={handleSubmit}>
        <div>
            <label>Name:</label>
            <input type="text" name="name" value={data.name} onChange={handleChange}/>
        </div>
        <div>
            <label>Reason:</label>
            <input type="text" name="reason" value={data.reason} onChange={handleChange}/>
        </div>
        <input type="submit" value={"Submit"}/>
    </form>
  )
}

export default Sample