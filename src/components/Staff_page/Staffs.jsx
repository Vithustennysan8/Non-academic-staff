import LoadingAnimation from "../Common/LoadingAnimation";
import "../../css/Staffs_page/staffs.css"
import StaffCard from "./StaffCard";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../Contexts/LoginContext";
import { UserContext } from "../../Contexts/UserContext";
import { Axios } from "../AxiosReqestBuilder";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import defaultDp from "../../assets/defaultImage.webp";
import { Link } from "react-router-dom";

const Staffs = () => {
  const { isLogin } = useContext(LoginContext);
  const { user } = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [staffs, setStaffs] = useState([]);
  const token = localStorage.getItem("token");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      const getUsers = async () => {
        if (isLogin) {
          try {
            const response = await Axios.get("/auth/user/staffs");
            setStaffs(response.data);
          } catch (error) {
            Swal.fire({
              title: error.response.data.message || "Error!",
              icon: "error",
            });            
          }
        }
      };
      getUsers();
    }, 0);
  }, [token, isLogin]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      {(
        <>
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

            <Link to={"/subIncharge"}>SubIncharge</Link>

            <div className="staffs-detail">
              {/* default head images for the head of every department */}
              {!isLogin && (
                <>
                  <h3>Head of the Non-academic staffs</h3>
                  <div className="staff-container">
                    <StaffCard
                      photo={
                        "https://site.pdn.ac.lk/images/About/DeputyViceChancellor.jpg"
                      }
                      title={"Prof.Terrance Madhujith"}
                      body={"Vice Chancellor"}
                    />
                    <StaffCard
                      photo={
                        "https://inro.pdn.ac.lk/assets/images/bom/Mr.%20EMGMB%20Ekanayake.jpg"
                      }
                      title={"Mr. EMGMB. Ekanayake"}
                      body={"Registrar"}
                    />
                  </div>
                  <h3>Other Departments .....</h3>
                </>
              )}

              {/* based on the department staff will display */}
              {isLogin && !search &&
                <>
                <h3>
                  {staffs[0]?.department + " (" + staffs[0]?.faculty + ")"}
                </h3>
                <div className="academicStaff">
                    {
                      staffs.filter((staff)=> staff.role !== "USER" )
                      .map((staff)=>{
                        let src = staff.image_data
                        ? `data:${staff.image_type};base64,${staff.image_data}`
                        : defaultDp;

                      return (
                        <StaffCard
                          key={staff.id}
                          photo={src}
                          title={staff.first_name.concat(" " + staff.last_name)}
                          body={staff.faculty}
                          user={staff}
                          jobType={staff.jobType}
                          setSelectedUser={setSelectedUser}
                          selectedUser={selectedUser}
                        />
                      );
                      })
                    }
                  </div>
                  </>
                  }
                  
              {isLogin && (
                <>
                <h3>Non-academic staffs</h3>
                </>
              )}
              <div className="staff-container">
                {staffs
                  .filter((item) => item.first_name.concat(" " + item.last_name).toLowerCase().includes(search) && item.role === "USER")
                  .map((staff) => {
                    // adding default image to the staff card if there is no profile image is added
                    let src = staff.image_data
                      ? `data:${staff.image_type};base64,${staff.image_data}`
                      : defaultDp;

                    return (
                      <StaffCard
                        key={staff.id}
                        photo={src}
                        title={staff.first_name.concat(" " + staff.last_name)}
                        body={staff.faculty}
                        user={staff}
                        jobType={staff.jobType}
                        setSelectedUser={setSelectedUser}
                      />
                    );
                  })}

                {selectedUser && user.role !== "USER" && (
                  <div className="popupUserInfoContainer">
                    <div className="userInfo">
                      <button
                        className="bttn redbtn"
                        onClick={() => {
                          setSelectedUser(null);
                        }}
                      >
                        X
                      </button>
                      <h4>Employee Information</h4>

                      <div className="splitDiv">
                        <div className="leftDiv">
                          <div className="info-row">
                            <p className="info-label">First Name:</p>
                            <p className="info-value">
                              {selectedUser.first_name}
                            </p>
                          </div>
                          <div className="info-row">
                            <p className="info-label">Last Name:</p>
                            <p className="info-value">
                              {selectedUser.last_name}
                            </p>
                          </div>
                          <div className="info-row">
                            <p className="info-label">Employee Id:</p>
                            <p className="info-value">{selectedUser.emp_id}</p>
                          </div>
                          <div className="info-row">
                            <p className="info-label">Email:</p>
                            <p className="info-value">{selectedUser.email}</p>
                          </div>
                          <div className="info-row">
                            <p className="info-label">Faculty:</p>
                            <p className="info-value">{selectedUser.faculty}</p>
                          </div>
                          <div className="info-row">
                            <p className="info-label">Department:</p>
                            <p className="info-value">
                              {selectedUser.department}
                            </p>
                          </div>
                          <div className="info-row">
                            <p className="info-label">Identycard:</p>
                            <p className="info-value">{selectedUser.ic_no}</p>
                          </div>
                          <div className="info-row">
                            <p className="info-label">JobType:</p>
                            <p className="info-value">
                              {selectedUser.jobType}
                            </p>
                          </div>
                        </div>

                        <div className="rightDiv">
                          <div className="info-row">
                            <p className="info-label">Mobile no:</p>
                            <p className="info-value">
                              {selectedUser.phone_no}
                            </p>
                          </div>
                          <div className="info-row">
                            <p className="info-label">Date of Birth:</p>
                            <p className="info-value">
                              {selectedUser.date_of_birth?.substring(0, 10)}
                            </p>
                          </div>
                          <div className="info-row">
                            <p className="info-label">Gender:</p>
                            <p className="info-value">{selectedUser.gender}</p>
                          </div>
                          <div className="info-row">
                            <p className="info-label">Address:</p>
                            <p className="info-value">{selectedUser.address}</p>
                          </div>
                          <div className="info-row">
                            <p className="info-label">City:</p>
                            <p className="info-value">{selectedUser.city}</p>
                          </div>
                          <div className="info-row">
                            <p className="info-label">PostalCode:</p>
                            <p className="info-value">
                              {selectedUser.postal_code}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};
export default Staffs;
