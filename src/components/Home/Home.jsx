import "../../css/Home/home.css";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import { Axios } from "../AxiosReqestBuilder";
import { Link } from "react-router-dom";
import News from "../Home/News";
import { motion } from "framer-motion";
import google from "../../assets/images/home/google.png"
import twitter from "../../assets/images/home/twitter.png"
import linkedin from "../../assets/images/home/linkedin.png"
import github from "../../assets/images/home/github-icon.svg"
import youtube from "../../assets/images/home/youtube.png"
import DpLogo from "../../assets/defaultImage.webp";
import slide1 from "../../assets/images/home/slide1.jpg";
import slide2 from "../../assets/images/home/slide2.jpg";
import slide3 from "../../assets/images/home/slide3.jpg";
import slide4 from "../../assets/images/home/slide4.jpg";

const Home = () => {
  const { isLogin, user, setUser } = useAuth();
  const [src, setSrc] = useState(DpLogo);
  const [role, setRole] = useState("USER");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getUserDetail = async () => {
      if (isLogin) {
        try {
          const response = await Axios.get("/user/info");
          setUser(response.data);
          setRole(response.data.role);
          if (response.data.image_data) {
            setSrc(
              `data:${response.data.image_type};base64,${response.data.image_data}`
            );
          }
        } catch (error) {
          console.log("Error fetching user details", error);
        } finally {
          setTimeout(() => {
            window.scrollTo({top:0, behavior:"smooth"});
            setIsLoading(false);
          }, 500);
        }
      }else{
        setIsLoading(false);
      }
    };    

    getUserDetail();
  }, [isLogin, setUser]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = useRef(null);

  const slides = [
    { backgroundImage: `url(${slide1})` },
    { backgroundImage: `url(${slide2})` },
    {
      backgroundImage:
        `url(${slide3})`,
    },
    { backgroundImage: `url(${slide4})` },
  ];

  useEffect(() => {
    const nextSlide = () => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    };

    slideInterval.current = setInterval(nextSlide, 6000);

    return () => clearInterval(slideInterval.current);
  }, [slides.length]);

  if (isLoading) {
    return (
      <div className="contact_container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading home information...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -20 }} 
      transition={{ duration: 0.6 }}
    >
    <div className="home">
          {isLogin ? (
            /* --------- user profile ----------- */
            <div>
              <div className="home-top">
                <div className="home-banner-profile">
                  <div className="homeProfilePic">
                    <img src={src} alt="userProfile" />
                  </div>
                  <h2>
                    {user.first_name} {user.last_name}
                  </h2>
                  <p>-{user.job_type}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="home-img-slider">
              <img
                src={slide1}
                alt=""
              />
              <h1>University Of Peradeniya</h1>
            </div>
          )}

          <div className="home-wrapper">
            {isLogin ? (
              <>
                {role === "USER" && (
                  <div className="form-shortcut-container">
                    <h2 className="quick-links-title">Quick Links</h2>
                    <div className="form-shortcuts">
                      <div className="form-shortcut">
                        <p>
                          <Link to="/forms">Apply for Leaves</Link>
                        </p>
                      </div>
                      <div className="form-shortcut">
                        <p>
                          <Link to="/forms">Apply for Transfer</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* ----- image slider ---------- */}
                <div className="home-image-slide">
                  {slides.map((slide, index) => (
                    <div
                      key={index}
                      className={`slide ${
                        index === currentSlide ? "active" : ""
                      }`}
                      style={slide}
                    ></div>
                  ))}
                </div>
              </>
            ) : (
              <div className="home-container">
                <div className="home-main-img">
                  <img
                    src="https://news.kln.ac.lk/images/2022/07/04/_88A9993.jpg"
                    alt=""
                  />
                </div>
                <div className="home-main">
                  <h1>Welcome to our University</h1>
                  <p>
                    Non-academic staff are the backbone of our educational
                    institution, ensuring seamless operations and providing
                    essential support to students, faculty, and administration.
                    From administrative duties and IT support to student
                    services and facility management, these dedicated
                    professionals create an environment conducive to learning
                    and growth. Their roles encompass a wide range of
                    responsibilities, including admissions, career counseling,
                    health and wellness, financial management, and more.
                    Committed to excellence, our non-academic staff work
                    tirelessly behind the scenes to enhance the educational
                    experience and maintain the high standards of our
                    institution.
                  </p>
                </div>
              </div>
            )}

            {/* ----------- news feed ---------- */}
            <News role={role} />

            {/* ----------- social media links -----------*/}
            <div className="linkto">
              <h2>Link to official websites</h2>
              <p>Connect with us on social media</p>
              <div>
                <a href="https://www.pdn.ac.lk/" target="_blank">
                  <img
                    src={google}
                    alt="Google_link"
                  />
                </a>
                <a
                  href="https://twitter.com/uperadeniya?lang=en"
                  target="_blank"
                >
                  <img
                    src={twitter}
                    alt="Twitter_link"
                  />
                </a>
                <a
                  href="https://www.facebook.com/UniversityOfPeradeniya/"
                  target="_blank"
                >
                  <img
                    src={linkedin}
                    alt="Linkedin_link"
                  />
                </a>
                <a
                  href="https://github.com/UniversityOfPeradeniya"
                  target="_blank"
                >
                  <img
                    src={github}
                    alt="Github_link"
                  />
                </a>
                <a
                  href="https://www.youtube.com/channel/UCxN_hZh8t5uFGW7kwahQwqQ"
                  target="_blank"
                >
                  <img
                    src={youtube}
                    alt="Youtube_link"
                  />
                </a>
              </div>
            </div>
          </div>
    </div>
    </motion.div>
  );
};

export default Home;
