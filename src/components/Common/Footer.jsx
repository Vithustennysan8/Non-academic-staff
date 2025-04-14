import "../../css/Common/footer.css";
import twitter from "../../assets/images/home/twitter.png";
import github from "../../assets/images/footer/github-icon.png";
import linkedin from "../../assets/images/footer/linkedin-square-icon.svg";
import youtube from "../../assets/images/footer/youtube-icon.svg";

const Footer = () => {
  return (
    <div className='footer-contanier'>
        <div className='footer-content'>

            <div className="about">
                <h2>UNIVERSITY OF PERADENIYA</h2>
                <a href="https://www.pdn.ac.lk/">About the University</a>
            </div>

            <div className="socials">
                <a href="https://twitter.com/uperadeniya?lang=en" target="_blank"><img src={twitter} alt="Twitter_link"/></a>
                <a href="https://github.com/UniversityOfPeradeniya" target="_blank"><img src={github} alt="Github_link" /></a>
                <a href="https://www.facebook.com/UniversityOfPeradeniya/" target="_blank"><img src={linkedin} alt="Linkedin_link" /></a>
                <a href="https://www.youtube.com/channel/UCxN_hZh8t5uFGW7kwahQwqQ" target="_blank"><img src={youtube} alt="Youtube_link" /></a>
            </div>

            <div className="contact">
                <h4>CONTACT US</h4>
                <p>General Numbers: 123-456-7890, 123-234-4567</p>
                <p>General Fax: +1234567883</p>
                <p>Email: peradeniya@eng.pdn.ac.lk</p>
                <p>Address: University of peradeniya, Peradeniya, Kandy 40000</p>
            </div>

            <div className="copyright">
                <p>Copyright © 2024 University of Peradeniya.  All rights Reserved.</p>
            </div>

        </div>
    </div>
  )
}

export default Footer