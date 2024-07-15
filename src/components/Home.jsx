import Footer from "./Footer";
import "../css/home.css";
import Cards from "./Cards";
import Header from "./Header";
import lab8 from "../pdfs/co226_lab8.pdf";
import { useEffect, useRef, useState } from "react";

const Home = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(()=>{
    // localStorage.removeItem("token");
    if(localStorage.getItem("token") != null){
      setIsLogin(true);
      }
  },[])

  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = useRef(null);

  const slides = [
    { backgroundImage: "url(https://arts.pdn.ac.lk/images/slider/slide1.jpg)" },
    { backgroundImage: "url(https://arts.pdn.ac.lk/images/slider/slide2.jpg)" },
    { backgroundImage: "url(https://arts.pdn.ac.lk/civco/assets/data1/images/1.jpg)" },
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
    <>
      <Header />

      <div className="home-wrapper">
        {isLogin ? (
          /* --------- user profile ----------- */
          <div className="home-top">
            <div className="home-banner-profile">
              <div className="homeProfilePic">
                <img
                  src="https://cdn2.momjunction.com/wp-content/uploads/2015/08/33-Funky-Short-Hairstyles-For-Kids.jpg.webp"
                  alt=""
                />
              </div>
              <h2>Vithustennysan E.T.L.</h2>
              <p>-Staff</p>
            </div>
          </div>
        ) : (
          <div className="home-img-slider">
            <img src="https://arts.pdn.ac.lk/images/slider/slide1.jpg" alt="" />
            <h1>University Of Peradeniya</h1>
          </div>
        )}

        {isLogin ? (
          /* ----- image slider ---------- */
          <div className="home-image-slide">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`slide ${index === currentSlide ? "active" : ""}`}
                style={slide}
              ></div>
            ))}
          </div>
        ) : (
          <div className="home-container">
            <div className="home-main-img">
              <img
                src="https://adaderanaenglish.s3.amazonaws.com/1710299909-strike-trade-union-action-l.jpg"
                alt=""
              />
            </div>
            <div className="home-main">
              <h1>Welcome to our University</h1>
              <p>
                Non-academic staff are the backbone of our educational
                institution, ensuring seamless operations and providing
                essential support to students, faculty, and administration. From
                administrative duties and IT support to student services and
                facility management, these dedicated professionals create an
                environment conducive to learning and growth. Their roles
                encompass a wide range of responsibilities, including
                admissions, career counseling, health and wellness, financial
                management, and more. Committed to excellence, our non-academic
                staff work tirelessly behind the scenes to enhance the
                educational experience and maintain the high standards of our
                institution.
              </p>
            </div>
          </div>
        )}

        {/* ----------- quick links ----------- */}
        <div className="homeQuikLinks">
          <h1>Quick Downloads</h1>
          <div className="homeLinks">
            <a href={lab8} download="Leave_form" target="_blank">
              <p className="leftLink">
                <img
                  src="https://uxwing.com/wp-content/themes/uxwing/download/web-app-development/download-pdf-icon.png"
                  alt=""
                />
                Application for leaves
              </p>
            </a>

            <a href={lab8} download="Subtitue_form" target="_blank">
              <p className="rightLink">
                <img
                  src="https://uxwing.com/wp-content/themes/uxwing/download/web-app-development/download-pdf-icon.png"
                  alt=""
                />
                Application for subtitute
              </p>
            </a>

            <a href={lab8} download="Transfer_form" target="_blank">
              <p className="leftLink">
                <img
                  src="https://uxwing.com/wp-content/themes/uxwing/download/web-app-development/download-pdf-icon.png"
                  alt=""
                />
                Application for transfer
              </p>
            </a>

            <a href={lab8} download="Leave_form" target="_blank">
              <p className="rightLink">
                <img
                  src="https://uxwing.com/wp-content/themes/uxwing/download/web-app-development/download-pdf-icon.png"
                  alt=""
                />
                Application for subtitute
              </p>
            </a>
          </div>
        </div>

        {/* ----------- news feed ---------- */}
        <div className="newsFeed">
          <h2>Important Announcements</h2>
          <Cards
            title={"news"}
            body={
              "cdsihv iad vca sfdf sdf s dfsd f sdf sd fs dfs dfsdfsdf sdfsdf sdf sdkfaebiufbicbiubcuc sa csicbibc cjs cu csou oquscbqos cqs cuqsc few widc cwdcbwiudbcwdcw dciw dcbwudbcdc ad ca c cuabcua scua scasca sas a sda sf"
            }
            reporter={"Vithu"}
          />
          <Cards
            title={"news"}
            body={
              " sdf sdkfaebiufbicbiubcuc sa csicbibc cjs cu csou oquscbqos cqs cuqsc few widc cwdcbwiudbcwdcw dciw dcbwudbcdc ad ca c cuabcua scua scasca sas a sda sf"
            }
            reporter={"Tennysan"}
          />
          <Cards
            title={"news"}
            body={
              "cdsihv iad vca sfdf sdf s dfsd f sdf sd fs dfs dfsdfsdf sdfsdf sdf sdkfaebiufbicbiubcuc sa csicbibc cjs cu csou oquscbqos cqs cuqsc few widc cwdcbwiudbcwdcw dciw dcbwudbcdc ad ca c cuabcua scua scasca sas a sda sf"
            }
            reporter={"Vithu"}
          />
          <Cards
            title={"news"}
            body={
              "cdsih sdf s dfsd f sdf sd fs dfs dfsdfsdf sdfsdf sdf sdkfaebiufbicbiubcuc sa csicbibc cjs cu csou oquscbqos cqs cuqsc few widc cwdcbwiudbcwdcw dciw dcbwudbcdc ad ca c cuabcua scua scasca sas a sda sf"
            }
            reporter={"Samir"}
          />
        </div>

        {/* ----------- social media links -----------*/}
        <div className="linkto">
          <h2>Link to official websites</h2>
          <div>
            <a href="https://www.pdn.ac.lk/" target="_blank">
              <img
                src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-color-icon.png"
                alt="Twitter_link"
              />
            </a>
            <a href="https://twitter.com/uperadeniya?lang=en" target="_blank">
              <img
                src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/x-social-media-black-icon.png"
                alt="Twitter_link"
              />
            </a>
            <a
              href="https://www.facebook.com/UniversityOfPeradeniya/"
              target="_blank"
            >
              <img
                src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/linkedin-app-icon.png"
                alt="Linkedin_link"
              />
            </a>
            <a href="https://github.com/UniversityOfPeradeniya" target="_blank">
              <img
                src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/github-icon.svg"
                alt="Github_link"
              />
            </a>
            <a
              href="https://www.youtube.com/channel/UCxN_hZh8t5uFGW7kwahQwqQ"
              target="_blank"
            >
              <img
                src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/youtube-color-icon.png"
                alt="Youtube_link"
              />
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
