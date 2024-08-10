import LoadingAnimation from "./LoadingAnimation";
import "../css/staffs.css";
import StaffCard from "./StaffCard";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LoginContext } from "../Contexts/LoginContext";

const Staffs = () => {
  const {isLogin} = useContext(LoginContext);
  const [search, setSearch] = useState("");
  const [staffs, setStaffs] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");
  
  useEffect(() => {
    setTimeout(() => {
      const getUsers = async () => {
        if (isLogin) {
          try {
            const response = await axios.get(
              "http://localhost:8080/api/auth/user/staffs",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  },
              }
            );
            setStaffs(response.data);
            setIsLoading(false)
          } catch (error) {
            console.log(error);
          }
        }else{
          setIsLoading(false)
        }
      };
      getUsers();
    },600);

  },[token, isLogin]);

  return (
    <>

      {isloading? <LoadingAnimation/> : <>
      <div className="staffs">
        <h2>Staffs</h2>

        <div className="staff-search">
          <img
            src="https://uxwing.com/wp-content/themes/uxwing/download/user-interface/search-icon.png"
            alt=""
          />
          <input
            type="search"
            placeholder="Enter the Staff name.........."
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
        </div>

        <div className="staffs-detail">
          {/* default head images for the head of every department */}
          {!isLogin && <>
          <h3>Head of the Non-academic staffs</h3>
          <div className="staff-container">
                <StaffCard
                  photo={"https://people.ce.pdn.ac.lk/images/staff/non-academic-staff/bandara.jpg"}
                  title={"Bandara Wasundara"}
                  body={"Engineering"}
                />
                <StaffCard
                  photo={"https://people.ce.pdn.ac.lk/images/staff/non-academic-staff/kelum.jpg"}
                  title={"Kelum Gunarathne"}
                  body={"Engineering"}
                  />
                <StaffCard
                  photo={"https://mgt.pdn.ac.lk/siteimages/staff/Ranjith.jpg"}
                  title={"Mr. H.R.L. Abeyrathne"}
                  body={"Management"}
                  />
                <StaffCard
                  photo={"https://med.pdn.ac.lk/departments/anaesthesiology/pathum.gif"}
                  title={"Mr. W.R.P.T. Wickramasinghe"}
                  body={"Medicine"}
                  />
                <StaffCard
                  photo={"https://sci.pdn.ac.lk/botany/assets/img/nstaff/3.webp"}
                  title={"Mr. A.B. Kotuwegedara"}
                  body={"Botany"}
                  />
                <StaffCard
                  photo={"https://web2.ee.pdn.ac.lk/sites/default/files/inline-images/MrWalisundara.jpg"}
                  title={"MR. W.M.S.B. WALISUNDARA"}
                  body={"EEE"}
                  />
          </div> </>}

          {/* based on the department staff will display */}
          {isLogin && <h3>{staffs[0]?.department+" ("+staffs[0]?.faculty+")"}</h3>}
          <div className="staff-container">
            {staffs
              .filter((item) => item.first_name.concat(" "+item.last_name).toLowerCase().includes(search))
              .map((staff) => {

                // adding default image to the staff card if there is no profile image is added
                let src = staff.image_data? `data:${staff.image_type};base64,${staff.image_data}`: "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg";
                
                return(
                  <StaffCard
                  key={staff.id}
                  photo={src}
                  title={staff.first_name.concat(" "+staff.last_name)}
                  body={staff.faculty}
                  />)
                  })}
          </div>
        </div>
      </div>
      </>
    }
    </>
  );
};
export default Staffs;
