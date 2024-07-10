import "../css/profile.css";
import Header from "./Header";
import Footer from "./Footer";

const Profile = () => {
  return (
    <div>
      <Header />
      <div id="profile-container">
        <div className="profile-bar">
          <div className="profile-heading">
            <h3>Personal</h3>
          </div>
          <div className="profile-attributes">
            <a href="#">
              <img
                src="https://cdn-icons-png.flaticon.com/128/7596/7596756.png"
                alt=""
              />
            </a>
            <a href="#">
              <img
                src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
                alt=""
              />
            </a>
          </div>
        </div>

        <div className="small-navbar">
          <p>
            <a href="#">
              <span>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/8188/8188360.png"
                  alt="icon1"
                />
                Edit Profile
              </span>
            </a>
          </p>
          <p>
            <a href="#">
              <span>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/25/25215.png"
                  alt="icon2"
                />
                Security Settings
              </span>
            </a>
          </p>
          <p>
            <a href="#">
              <span>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/3602/3602123.png"
                  alt="icon3"
                />
                Notification
              </span>
            </a>
          </p>
          <p>
            <a href="#">
              <span>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/10541/10541390.png"
                  alt="icon3"
                />
                Subscriptions
              </span>
            </a>
          </p>
        </div>

        <div className="profile-img">
          <img
            src="data:image/jpeg;base64,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"
            alt=""
          />
        </div>
        <div className="profile-detail-container">
          <div className="profile-namebox">
            <label htmlFor="firstname">
              First Name Change
              <input
                type="text"
                name="firstname"
                id="firstname"
                required
                placeholder=""
              />
            </label>
            <label htmlFor="lastname">
              Last Name Change
              <input
                type="text"
                name="lastname"
                id="lastname"
                required
                placeholder=""
              />
            </label>
          </div>

          <div className="profile-emailbox">
            <label htmlFor="emailAddress">
              Email Address
              <input
                type="text"
                name="emailAddress"
                id="emailAddress"
                required
                placeholder=""
              />
            </label>
          </div>

          <div className="profile-phoneNumber">
            <label htmlFor="phoneNumber">
              Phone Number
              <input
                type="number"
                name="phoneNumber"
                id="phoneNumber"
                required
                placeholder=""
              />
            </label>
          </div>

          <div className="profile-streetAddress">
            <label htmlFor="streetAddress">
              Street Address
              <input
                type="text"
                name="streetAddress"
                id="streetAddress"
                required
                placeholder=""
              />
            </label>
          </div>

          <div className="profile-city">
            <label htmlFor="zipCode">
              Zip Code Update
              <input
                type="number"
                name="zipCode"
                id="zipCode"
                required
                placeholder=""
              />
            </label>
            <label htmlFor="city">
              City Change
              <input
                type="text"
                name="city"
                id="city"
                required
                placeholder=""
              />
            </label>
          </div>

          <div className="profile-state">
            <label htmlFor="state_update">
              State Update
              <input
                type="text"
                name="state_update"
                id="state_update"
                required
                placeholder=""
              />
            </label>
            <label htmlFor="country_update">
              Country Update
              <input
                type="text"
                name="country_update"
                id="country_update"
                required
                placeholder=""
              />
            </label>
          </div>

          <div className="submit_btn">
            <input type="button" value="Submit" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
