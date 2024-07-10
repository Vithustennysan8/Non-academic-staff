import '../css/footer.css'

const Footer = () => {
  return (
    <div className='footer-contanier'>
        <div className='footer-content'>

            <div className="about">
                <h2>UNIVERSITY OF PERADENIYA</h2>
                <a href="https://www.pdn.ac.lk/">About the University</a>
            </div>

            <div className="socials">
                <a href="https://twitter.com/uperadeniya?lang=en"><img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/x-social-media-logo-icon.png" alt="Twitter_link" /></a>
                <a href="https://github.com/UniversityOfPeradeniya"><img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/github-icon.svg" alt="Github_link" /></a>
                <a href="https://www.facebook.com/UniversityOfPeradeniya/"><img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/linkedin-square-icon.svg" alt="Linkedin_link" /></a>
                <a href="https://www.youtube.com/channel/UCxN_hZh8t5uFGW7kwahQwqQ"><img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/youtube-icon.svg" alt="Youtube_link" /></a>
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