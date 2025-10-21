import "../../css/Home/home.css";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { LoginContext } from "../../Contexts/LoginContext";
import { Axios } from "../AxiosReqestBuilder";
import { Link } from "react-router-dom";
import News from "../Home/News";
import { motion } from "framer-motion";
import google from "../../assets/images/home/google.png"
import twitter from "../../assets/images/home/twitter.png"
import linkedin from "../../assets/images/home/linkedin.png"
import github from "../../assets/images/home/github-icon.svg"
import youtube from "../../assets/images/home/youtube.png"

const Home = () => {
  const { isLogin, setIsLogin } = useContext(LoginContext);
  const { user, setUser } = useContext(UserContext);
  const [src, setSrc] = useState(
    "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"
  );
  const [role, setRole] = useState("USER");

  useEffect(() => {
    const getUserDetail = async () => {
      try {
        const response = await Axios.get("/auth/user/info");
        setUser(response.data);
        setRole(response.data.role);
        if (response.data.image_data) {
          setSrc(
            `data:${response.data.image_type};base64,${response.data.image_data}`
          );
        }
      } catch (error) {
        console.log("message ", error);
      }
    };    

    getUserDetail();
  }, [setUser, isLogin, setIsLogin]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = useRef(null);

  const slides = [
    { backgroundImage: "url(https://arts.pdn.ac.lk/images/slider/slide1.jpg)" },
    { backgroundImage: "url(https://arts.pdn.ac.lk/images/slider/slide2.jpg)" },
    {
      backgroundImage:
        "url(https://arts.pdn.ac.lk/civco/assets/data1/images/1.jpg)",
    },
    { backgroundImage: "url(https://arts.pdn.ac.lk/images/slider/slide3.jpg)" },
  ];

  useEffect(() => {
    const nextSlide = () => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    };

    slideInterval.current = setInterval(nextSlide, 6000);

    return () => clearInterval(slideInterval.current);
  }, [slides.length]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="home">
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
                src="https://arts.pdn.ac.lk/images/slider/slide1.jpg"
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
                    <div className="form-shortcuts">
                      <div className="form-shortcut">
                        <p>
                          <Link to="/forms">Apply for Leaves</Link>
                        </p>
                      </div>
                    </div>
                    <div className="form-shortcuts">
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

            {/* ----------- quick links ----------- */}
            {/* <div className="homeQuikLinks">
              <h1>Quick Downloads</h1>
              <div className="homeLinks">
                <a href={lab8} download="Leave_form" target="_blank">
                  <p className="Link">
                    <img
                      src={pdfDownload}
                      alt=""
                    />
                    Application for Normal Leave
                  </p>
                </a>

                <a href={lab8} download="Subtitue_form" target="_blank">
                  <p className="Link">
                    <img
                      src={pdfDownload}
                      alt=""
                    />
                    Application for Accident Leave
                  </p>
                </a>

                <a href={lab8} download="Transfer_form" target="_blank">
                  <p className="Link">
                    <img
                      src={pdfDownload}
                      alt=""
                    />
                    Application for Maternity Leave
                  </p>
                </a>

                <a href={lab8} download="Leave_form" target="_blank">
                  <p className="Link">
                    <img
                      src={pdfDownload}
                      alt=""
                    />
                    Application for Paternal Leave
                  </p>
                </a>

                <a href={lab8} download="Leave_form" target="_blank">
                  <p className="Link">
                    <img
                      src={pdfDownload}
                      alt=""
                    />
                    Application for Medical Leave
                  </p>
                </a>
              </div>
            </div> */}

            {/* ----------- news feed ---------- */}
            <News role={role} />

            {/* ----------- social media links -----------*/}
            <div className="linkto">
              <h2>Link to official websites</h2>
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
    </motion.div>
  );
};

export default Home;
