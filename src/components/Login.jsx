import { useNavigate } from 'react-router-dom'
import '../css/login.css'


const Login = () => {
    const signupNavigate = useNavigate();

    const handleSignup = ()=>{
        signupNavigate("/signup")
    }
    
  return (
    <div className='login-main'>
        <div className="login-container">
            <form action="">

                <div className="logo">
                    <img src="https://w1.pngwing.com/pngs/659/960/png-transparent-gold-badge-university-of-ceylon-university-of-sri-lanka-higher-education-college-faculty-university-of-peradeniya-logo-thumbnail.png" alt="Uni-logo" />
                </div>

                <h1>UOP</h1>

                <div className="email-box">
                    <label htmlFor="login-email">Email Address
                        <input type="email" name="Email" id="login-email" required placeholder='abc123@gmail.com' autoFocus/>
                    </label>
                </div>

                <div className="passwd-box">
                    <label htmlFor="password">Password
                        <input type="password" name="Password" id="login-password" required placeholder='password'/>
                    </label>
                </div>

                <div className="login-btn">
                    <input type="submit" value="Log in"/>
                </div>

                <div className="signup-opt">
                    <p>Do you need new account?</p>
                    <input type="button" onClick={handleSignup}  value="Sign up"/>
                </div>

                <div className="others">
                    <a href="">Forget Password?</a>
                </div>

            </form>

        </div>
    </div>
  )
}

export default Login