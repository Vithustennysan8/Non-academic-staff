import { useState } from "react";
import "../../../css/Profile_page/Dashboard/dashboard.css";
import LoadingAnimation from "../../Common/LoadingAnimation";
import LeaveDetails from "./LeaveDetails";
import LeaveGraph from "./LeaveGraph";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  setTimeout(() => {
    setIsLoading(false);
  }, 600);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <div className="dashboard-container">
          <h1>Summary</h1>
          <LeaveDetails />

          <LeaveGraph />
        </div>
      )}
    </>
  );
};

export default Dashboard;
