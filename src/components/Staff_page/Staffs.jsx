import "../../css/Staffs_page/staffs.css"
import StaffCard from "./StaffCard";
import { useEffect, useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import { Axios } from "../AxiosReqestBuilder";
import { motion } from "framer-motion";
import defaultDp from "../../assets/defaultImage.webp";
import { Link } from "react-router-dom";

const Staffs = () => {
  const { isLogin, user } = useAuth();
  const [search, setSearch] = useState("");
  const [staffs, setStaffs] = useState([]);
  const token = localStorage.getItem("token");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      const getUsers = async () => {
        if (isLogin) {
          try {
            const response = await (user.role === "SUPER_ADMIN" ? Axios.get("/super_admin/staffs") : Axios.get("/auth/user/staffs"));
            setStaffs(response.data);
          } catch (error) {
            console.log("Error fetching staffs", error.message);
          } finally {
            setTimeout(() => {
              setIsLoading(false);
            }, 500);
          }
        }
      };
      getUsers();  
    }, 0);
  }, [token, isLogin, user.role]);

  if (isLoading) {
    return (
      <div className="staffs">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading staff information...</p>
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

            {
              isLogin && ( user.role === "ADMIN" || user.role === "SUPER_ADMIN" ) && (
              <div className="incharge">
                <Link to={"/subIncharge"}>Assign Sub-Incharge</Link>
              </div>
            )}
            

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
              {isLogin && !search && user.role !== "SUPER_ADMIN" &&
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
                <h3>{user.role === "SUPER_ADMIN" ? "All Users" : "Non-academic staffs"}</h3>
                </>
              )}
              <div className="staff-container">
                {staffs?.filter((item) => item.first_name.concat(" " + item.last_name).toLowerCase().includes(search) && (user.role !== "SUPER_ADMIN" ? item.role === "USER": true))
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
                  <div className="modern-popup-overlay">
                    <div className="modern-popup-container">
                      <div className="modern-popup-header">
                        <div className="header-content">
                          <div className="employee-avatar">
                            <span className="avatar-text">
                              {selectedUser.first_name?.charAt(0)}{selectedUser.last_name?.charAt(0)}
                            </span>
                          </div>
                          <div className="header-info">
                            <h2 className="employee-name">
                              {selectedUser.first_name} {selectedUser.last_name}
                            </h2>
                            <p className="employee-role">{selectedUser.jobType}</p>
                            <p className="employee-id">ID: {selectedUser.emp_id}</p>
                          </div>
                        </div>
                        <button
                          className="modern-close-btn"
                          onClick={() => setSelectedUser(null)}
                          aria-label="Close popup"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        </button>
                      </div>

                      <div className="modern-info-content">
                        <div className="info-category">
                          <h3 className="category-title">
                            <span className="category-icon">👤</span>
                            Personal Information
                          </h3>
                          <div className="info-cards">
                            <div className="info-card">
                              <div className="card-icon">📧</div>
                              <div className="card-content">
                                <span className="card-label">Email</span>
                                <span className="card-value">{selectedUser.email}</span>
                              </div>
                            </div>
                            <div className="info-card">
                              <div className="card-icon">📱</div>
                              <div className="card-content">
                                <span className="card-label">Mobile</span>
                                <span className="card-value">{selectedUser.phone_no}</span>
                              </div>
                            </div>
                            <div className="info-card">
                              <div className="card-icon">🎂</div>
                              <div className="card-content">
                                <span className="card-label">Date of Birth</span>
                                <span className="card-value">{selectedUser.date_of_birth?.substring(0, 10)}</span>
                              </div>
                            </div>
                            <div className="info-card">
                              <div className="card-icon">⚧</div>
                              <div className="card-content">
                                <span className="card-label">Gender</span>
                                <span className="card-value">{selectedUser.gender}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="info-category">
                          <h3 className="category-title">
                            <span className="category-icon">🏢</span>
                            Work Information
                          </h3>
                          <div className="info-cards">
                            <div className="info-card">
                              <div className="card-icon">🎓</div>
                              <div className="card-content">
                                <span className="card-label">Faculty</span>
                                <span className="card-value">{selectedUser.faculty}</span>
                              </div>
                            </div>
                            <div className="info-card">
                              <div className="card-icon">🏛️</div>
                              <div className="card-content">
                                <span className="card-label">Department</span>
                                <span className="card-value">{selectedUser.department}</span>
                              </div>
                            </div>
                            <div className="info-card">
                              <div className="card-icon">💼</div>
                              <div className="card-content">
                                <span className="card-label">Job Type</span>
                                <span className="card-value">{selectedUser.jobType}</span>
                              </div>
                            </div>
                            <div className="info-card">
                              <div className="card-icon">🆔</div>
                              <div className="card-content">
                                <span className="card-label">Identity Card</span>
                                <span className="card-value">{selectedUser.ic_no}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="info-category">
                          <h3 className="category-title">
                            <span className="category-icon">📍</span>
                            Address Information
                          </h3>
                          <div className="info-cards">
                            <div className="info-card full-width">
                              <div className="card-icon">🏠</div>
                              <div className="card-content">
                                <span className="card-label">Address</span>
                                <span className="card-value">{selectedUser.address}</span>
                              </div>
                            </div>
                            <div className="info-card">
                              <div className="card-icon">🏙️</div>
                              <div className="card-content">
                                <span className="card-label">City</span>
                                <span className="card-value">{selectedUser.city}</span>
                              </div>
                            </div>
                            <div className="info-card">
                              <div className="card-icon">📮</div>
                              <div className="card-content">
                                <span className="card-label">Postal Code</span>
                                <span className="card-value">{selectedUser.postal_code}</span>
                              </div>
                            </div>
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
