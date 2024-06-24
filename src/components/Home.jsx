import Footer from "./Footer";
import "../css/home.css";
import Cards from "./Cards";
import Header from "./Header";

const Home = () => {

  return (
    <div>
      <Header/>

      <div className="home">
          <div className="home-img-slider">
            <img src="https://arts.pdn.ac.lk/civco/assets/data1/images/1.jpg" alt=""/>
            <img src="https://arts.pdn.ac.lk/civco/assets/data1/images/1.jpg" alt=""/>
            <img src="https://arts.pdn.ac.lk/civco/assets/data1/images/1.jpg" alt=""/>
            <img src="https://arts.pdn.ac.lk/civco/assets/data1/images/1.jpg" alt=""/>
          </div>

          {/* <div className="home-container">
            <div className="main">
              <div>
                <Cards title={"Form"} body={"cdsihv iad vca sfdf sdf s dfsd f sdf sd fs df"}/> 
                <Cards title={"Form"} body={"cdsihv iad vca sfdf sdf s dfsd f sdf sd fs df"}/> 
              </div>
              <div>
                <Cards title={"Form"} body={"cdsihv iad vca sfdf sdf s dfsd f "}/> 
                <Cards title={"Form"} body={"cdsihv iad vca sfdf sdf s dfsd f "}/> 
              </div>
            </div>
            <div className="side1">
              
            </div>
            <div className="side2">

            </div>
          </div> */}

          <div className="newsFeed">
            <Cards title={"news"} body={"cdsihv iad vca sfdf sdf s dfsd f sdf sd fs dfs dfsdfsdf sdfsdf sdf"}/>
            <Cards title={"news"} body={"cdsihv iad vca sfdf sdf s dfsd f sdf sd fs dfs dfsdfsdf sdfsdf sdf"}/>
            <Cards title={"news"} body={"cdsihv iad vca sfdf sdf s dfsd f sdf sd fs dfs dfsdfsdf sdfsdf sdf"}/>
            <Cards title={"news"} body={"cdsihv iad vca sfdf sdf s dfsd f sdf sd fs dfs dfsdfsdf sdfsdf sdf"}/>
            <Cards title={"news"} body={"cdsihv iad vca sfdf sdf s dfsd f sdf sd fs dfs dfsdfsdf sdfsdf sdf"}/>
            <Cards title={"news"} body={"cdsihv iad vca sfdf sdf s dfsd f sdf sd fs dfs dfsdfsdf sdfsdf sdf"}/>
          </div>
      </div>
      

      <Footer/>
    </div>
  );
};

export default Home;
