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
            <div className="main">
                <h1>Welcome to our University</h1>
                <p>Our university is one of the leading universities in the country, with a strong reputation
                  for academic excellence, innovative research, and a commitment to social responsibility.</p>
                  <button>Learn More</button>
                  
            </div>
            <div className="side1">
              
            </div>
            <div className="side2">

            </div>
          </div>

          <div className="newsFeed">
            <h2>Important Announcements</h2>
            <Cards title={"news"} body={"cdsihv iad vca sfdf sdf s dfsd f sdf sd fs dfs dfsdfsdf sdfsdf sdf sdkfaebiufbicbiubcuc sa csicbibc cjs cu csou oquscbqos cqs cuqsc few widc cwdcbwiudbcwdcw dciw dcbwudbcdc ad ca c cuabcua scua scasca sas a sda sf"}/>
            <Cards title={"news"} body={"cdsihv iad vca sfdf sdf s dfsd f sdf sd fs dfs dfsdfsdf sdfsdf sdf sdkfaebiufbicbiubcuc sa csicbibc cjs cu csou oquscbqos cqs cuqsc few widc cwdcbwiudbcwdcw dciw dcbwudbcdc ad ca c cuabcua scua scasca sas a sda sf"}/>
            <Cards title={"news"} body={"cdsihv iad vca sfdf sdf s dfsd f sdf sd fs dfs dfsdfsdf sdfsdf sdf sdkfaebiufbicbiubcuc sa csicbibc cjs cu csou oquscbqos cqs cuqsc few widc cwdcbwiudbcwdcw dciw dcbwudbcdc ad ca c cuabcua scua scasca sas a sda sf"}/>
            <Cards title={"news"} body={"cdsihv iad vca sfdf sdf s dfsd f sdf sd fs dfs dfsdfsdf sdfsdf sdf sdkfaebiufbicbiubcuc sa csicbibc cjs cu csou oquscbqos cqs cuqsc few widc cwdcbwiudbcwdcw dciw dcbwudbcdc ad ca c cuabcua scua scasca sas a sda sf"}/>
          </div>

      </div>
      

      <Footer/>
    </div>
  );
};

export default Home;
