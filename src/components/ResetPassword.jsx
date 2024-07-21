import '../css/resetPassword.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import LoadingAnimation from './LoadingAnimation'

const ResetPassword = () => {
    const token = localStorage.getItem("token");
  const [isloading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [reset, setReset] = useState({
        old_password:'',
        new_password:'',
        confirm_new_password:'',
        password_for_delete:'',
    })

    useEffect(()=>{
        if(!token){
            navigate("/login");
        }
        setTimeout(() => {
            setIsLoading(false)
        }, 600);
    })

    const handleReset =async (e) => {
        e.preventDefault();

        if(reset.new_password != reset.confirm_new_password){
            alert("Password does not match");
            return;
        }

        try{
            const response  = await axios.put("http://localhost:8080/api/auth/user/reset",reset,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                        }
                }
            );
            console.log(response.data);
            alert("Password changed successfully");
            if(response.status === 200){
                navigate("/login");
            }
        }catch(err){
            console.log(err);
        }
    }
    
    const handleDelete = async (e) => {
        e.preventDefault();

        try{
            const response  = await axios.delete("http://localhost:8080/api/auth/user/delete",
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                        },
                        data:reset
                }
            );
            console.log(response.data);
            alert("Account deleted successfully");
            localStorage.removeItem("token");
            navigate("/login");
        }catch(err){
            console.log(err);
        }
    }

    const handleVissiblePassword = (img,val) => {
        const element = document.getElementById(val)
        const images = document.getElementById(img)
        if (element.type === "password") {
          element.type = "text";
          images.src="https://uxwing.com/wp-content/themes/uxwing/download/web-app-development/see-icon.png"
        }else{
          element.type = "password";
          images.src="https://uxwing.com/wp-content/themes/uxwing/download/health-sickness-organs/closed-eye-icon.png"
        }
      }

      const handleChange = (e)=>{
        const {name,value} = e.target;
        setReset({...reset, [name]:value})
      }

  return (
    <>
    {isloading? <LoadingAnimation/> :
        <div className="resetPassword">
            <h1>SECURITY</h1>
            <div className="resetPassword_container">
                <form>
                    <h2>Change Password</h2>
                    <p>To change the old Password, you should enter the old password<span> *</span></p>
                    <div>
                        <img id="resetOldPasswordImg" src="https://uxwing.com/wp-content/themes/uxwing/download/health-sickness-organs/closed-eye-icon.png" alt="" title="show password" onClick={()=>handleVissiblePassword("resetOldPasswordImg","resetOldPassword")}/>
                        <input type="password" placeholder="Old Password" id="resetOldPassword" name='old_password' value={reset.old_password} onChange={handleChange}/>
                    </div>
                    <hr />
                    <p>Your new password must be at least six characters and not same as the old password!<span> *</span></p>
                    <div>
                        <img id="resetNewPasswordImg" src="https://uxwing.com/wp-content/themes/uxwing/download/health-sickness-organs/closed-eye-icon.png" alt="" title="show password" onClick={()=>handleVissiblePassword("resetNewPasswordImg","resetNewPassword")}/>
                       <input type="password" placeholder="New Password" id="resetNewPassword" name='new_password' value={reset.new_password} onChange={handleChange}/>
                    </div>
                    <div>
                        <img id="resetConfirmNewPasswordImg" src="https://uxwing.com/wp-content/themes/uxwing/download/health-sickness-organs/closed-eye-icon.png" alt="" title="show password" onClick={()=>handleVissiblePassword("resetConfirmNewPasswordImg","resetNewConfirmPassword")}/>
                        <input id="resetNewConfirmPassword" type="password" placeholder="Confirm Password" name='confirm_new_password' value={reset.confirm_new_password} onChange={handleChange}/>
                    </div>
                    <button className="resetPassword_button" onClick={handleReset}>Change Password</button>
                </form>
            </div>

            <div className="deleteAccountContainer">
            <hr />
                <form >
                    
                    <h2>Delete Account</h2>
                    <p className='deleteInfo'>To delete your account permanately, please provide the correct password of your account</p>
                    <div>
                        <img id="PasswordForDeleteImg" src="https://uxwing.com/wp-content/themes/uxwing/download/health-sickness-organs/closed-eye-icon.png" alt="" title="show password" onClick={()=>handleVissiblePassword("PasswordForDeleteImg","PasswordForDelete")}/>
                        <input type="password" placeholder="Current Password" id="PasswordForDelete" name='password_for_delete' value={reset.password_for_delete} onChange={handleChange}/>
                    </div>
                    <p className='deleteConfirmInfo'>Are you sure you want to delete your account?<span className='importantastrick'> *</span></p>
                    <button className="deleteAccount_button" onClick={handleDelete}>Delete Account</button>
                </form>

            </div>

        </div>  
        }
    </>
  )
}

export default ResetPassword