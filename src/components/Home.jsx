import Footer from "./Footer";
import "../css/home.css";
import Cards from "./Cards";
import Header from "./Header";

const Home = () => {

  return (
    <div>
      <Header/>

      <div className="home-img-slider">
        {/* <img src="https://www.onlanka.com/wp-content/uploads/2021/09/university-of-peradeniya.jpg" alt=""/> */}
        <img src="https://arts.pdn.ac.lk/images/slider/slide1.jpg" alt=""/>
        {/* <img src="https://arts.pdn.ac.lk/civco/assets/data1/images/1.jpg" alt=""/> */}
        {/* <img src="https://arts.pdn.ac.lk/civco/assets/data1/images/1.jpg" alt=""/> */}
        <h1>University Of Peradeniya</h1>
      </div>

      <div className="home">

          <div className="home-container">
            <div className="home-main-img">
              <img src="https://adaderanaenglish.s3.amazonaws.com/1710299909-strike-trade-union-action-l.jpg" alt="" />
            </div>
            <div className="home-main">
                <h1>Welcome to our University</h1>
                <p>Non-academic staff are the backbone of our educational institution, ensuring seamless operations 
                  and providing essential support to students, faculty, and administration. From administrative duties 
                  and IT support to student services and facility management, these dedicated professionals create an 
                  environment conducive to learning and growth. Their roles encompass a wide range of responsibilities, 
                  including admissions, career counseling, health and wellness, financial management, and more. Committed
                   to excellence, our non-academic staff work tirelessly behind the scenes to enhance the educational 
                   experience and maintain the high standards of our institution.</p>
            </div>
          </div>

          <div className="newsFeed">
            <h2>Important Announcements</h2>
            <Cards title={"news"} body={"cdsihv iad vca sfdf sdf s dfsd f sdf sd fs dfs dfsdfsdf sdfsdf sdf sdkfaebiufbicbiubcuc sa csicbibc cjs cu csou oquscbqos cqs cuqsc few widc cwdcbwiudbcwdcw dciw dcbwudbcdc ad ca c cuabcua scua scasca sas a sda sf"}/>
            <Cards title={"news"} body={" sdf sdkfaebiufbicbiubcuc sa csicbibc cjs cu csou oquscbqos cqs cuqsc few widc cwdcbwiudbcwdcw dciw dcbwudbcdc ad ca c cuabcua scua scasca sas a sda sf"}/>
            <Cards title={"news"} body={"cdsihv iad vca sfdf sdf s dfsd f sdf sd fs dfs dfsdfsdf sdfsdf sdf sdkfaebiufbicbiubcuc sa csicbibc cjs cu csou oquscbqos cqs cuqsc few widc cwdcbwiudbcwdcw dciw dcbwudbcdc ad ca c cuabcua scua scasca sas a sda sf"}/>
            <Cards title={"news"} body={"cdsih sdf s dfsd f sdf sd fs dfs dfsdfsdf sdfsdf sdf sdkfaebiufbicbiubcuc sa csicbibc cjs cu csou oquscbqos cqs cuqsc few widc cwdcbwiudbcwdcw dciw dcbwudbcdc ad ca c cuabcua scua scasca sas a sda sf"}/>
          </div>

      </div>
      

      <Footer/>
    </div>
  );
};

export default Home;
