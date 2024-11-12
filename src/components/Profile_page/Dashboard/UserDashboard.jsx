import { useContext, useEffect, useState } from "react"
import "../../../css/Profile_page/Dashboard/userDashboard.css"
import { Axios } from "../../AxiosReqestBuilder"
import { LoginContext } from "../../../Contexts/LoginContext"
import { useNavigate } from "react-router-dom"
import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { constructNow } from "date-fns"
import LoadingAnimation from "../../Common/LoadingAnimation"

// Register necessary components from chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const UserDashboard = () => {
  const {isLogin} = useContext(LoginContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [forms, setForms] = useState([]);
  const [filteredForms, setFilteredForms] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');

  const [totalAcceptedLeaves, setTotalAcceptedLeaves] = useState(0);
  const [totalRejectedLeaves, setTotalRejectedLeaves] = useState(0);
  const [current_availableLeaves, setCurrent_availableLeaves] = useState(0);
  const [current_acceptedLeaves, setCurrent_acceptedLeaves] = useState(0);
  const [current_rejectedLeaves, setCurrent_rejectedLeaves] = useState(0);
  const [current_pendingLeaves, setCurrent_pendingLeaves] = useState(0);
  const [current_noPay, setCurrent_noPay] = useState(0);
  const [filtered_acceptedForms, setFiltered_acceptedForms] = useState(0);
  const [filtered_rejectedForms, setFiltered_rejectedForms] = useState(0);
  const [filtered_noPayForms, setFiltered_noPayForms] = useState(0);

  const [formTypeAndCount, setFormTypeAndCount] = useState({
                                                          "Normal Leave Form":0,
                                                          "Accident Leave Form":0,
                                                          "Medical Leave Form":0,
                                                          "Paternal Leave Form":0,
                                                          "Maternity Leave Form":0,
                                                          "No-Pay":0,
                                                        });

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handleCurrentStatus = () => {
    let acceptedForms = 0;
    let rejectedForms = 0;
    let currentPendingForms = 0;
    let currentRejectedForms = 0;
    let currentAcceptedForms = 0;
    let FormsTypeAndCount = {
      "Normal Leave Form":0,
      "Accident Leave Form":0,
      "Medical Leave Form":0,
      "Paternal Leave Form":0,
      "Maternity Leave Form":0, 
      "No-Pay":0,

    }

    forms.map((form) => {
      if(form.status === "Accepted"){
        acceptedForms++;
      }else if(form.status === "Rejected"){
        rejectedForms++;
      }

      if(form.createdAt){
        let date = new Date(form.createdAt);
        let currentDate = new Date();
        if(date.toISOString().substring(0,7) === currentDate.toISOString().substring(0,7)){
          if(form.status === "Accepted"){
            currentAcceptedForms++;
          }else if(form.status === "Rejected"){
            currentRejectedForms++;
          }else{
            currentPendingForms++;
          }
        }

        switch (form.formType) {
          case "Normal Leave Form":
            FormsTypeAndCount["Normal Leave Form"] += 1;
            break;
          case "Paternal Leave Form":
            FormsTypeAndCount["Paternal Leave Form"] += 1;
            break;
          case "Accident Leave Form":
            FormsTypeAndCount["Accident Leave Form"] += 1;
            break;
          case "Maternity Leave Form":
            FormsTypeAndCount["Maternity Leave Form"] += 1;
            break;
          case "Medical Leave Form":
            FormsTypeAndCount["Medical Leave Form"] += 1;
            break;
          default:
            break;
        }
      }
    });

    if(acceptedForms <= 2){
      setCurrent_availableLeaves(2 - acceptedForms);
    }else{
      setCurrent_availableLeaves(0);
      setCurrent_noPay(acceptedForms - 2);
    }

    setTotalAcceptedLeaves(acceptedForms);
    setTotalRejectedLeaves(rejectedForms);
    setCurrent_acceptedLeaves(currentAcceptedForms);
    setCurrent_rejectedLeaves(currentRejectedForms);
    setCurrent_pendingLeaves(currentPendingForms);
    setFormTypeAndCount(FormsTypeAndCount);
  }


  
  useEffect(() => { 
    setTimeout(() => {
      if (isLogin) {
        const fetchForms = async () => {
          try {
          const response = await Axios.get("/auth/user/leaveForms");
          setForms(response.data);
          console.log(response.data);
          setIsLoading(false);
        }catch(error){
          console.log(error);
        }
      }
      fetchForms();
      
    }else{
      window.scrollTo({top:0, behavior:"smooth"});
      navigate("/login");
    }
  }, 600);
  },[isLogin, navigate]);

  useEffect(()=>{
    if(forms.length > 0){
      handleCurrentStatus();
    }
  },[forms.length])
  

  const handleFilteredForm = (applications) => {
    let acceptedForms = 0;
    let rejectedForms = 0;
    let FormsTypeAndCount = {
      "Normal Leave Form":0,
      "Accident Leave Form":0,
      "Medical Leave Form":0,
      "Paternal Leave Form":0,
      "Maternity Leave Form":0, 
      "No-Pay":0,
    }

    applications.map((form) => {
      if(form.status === "Accepted"){
        acceptedForms++;
      }else if(form.status === "Rejected"){
        rejectedForms++;
      }

      switch (form.formType) {
        case "Normal Leave Form":
          FormsTypeAndCount["Normal Leave Form"] += 1;
          break;
        case "Paternal Leave Form":
          FormsTypeAndCount["Paternal Leave Form"] += 1;
          break;
        case "Accident Leave Form":
          FormsTypeAndCount["Accident Leave Form"] += 1;
          break;
        case "Maternity Leave Form":
          FormsTypeAndCount["Maternity Leave Form"] += 1;
          break;
        case "Medical Leave Form":
          FormsTypeAndCount["Medical Leave Form"] += 1;
          break;
        default:
          break;
      }
    });

    if(selectedMonth !== ""){
      if(acceptedForms<=2){
        setFiltered_noPayForms(0);
      }else{
        setFiltered_noPayForms(acceptedForms-2);
      }
    }


    setFiltered_acceptedForms(acceptedForms);
    setFiltered_rejectedForms(rejectedForms);
    setFormTypeAndCount(FormsTypeAndCount);
    console.log(Object.keys(FormsTypeAndCount));
    console.log(Object.values(FormsTypeAndCount));
  }
  
  const handleSearch = () => {
    if(selectedYear === ""){
      return;
    }

    setFormTypeAndCount({
    "Normal Leave Form":0,
    "Accident Leave Form":0,
    "Medical Leave Form":0,
    "Paternal Leave Form":0,
    "Maternity Leave Form":0, 
    "No-Pay":0,

  });
    setFilteredForms([]);
    setFiltered_acceptedForms(0);
    setFiltered_rejectedForms(0);
    setFiltered_noPayForms(0);
    const filteredForms_local = []
    
    forms.map(form => {
      if(form.createdAt.substring(0,4) === selectedYear && monthNames[form.createdAt.substring(5,7)-1] === selectedMonth){
        filteredForms_local.push(form);
      }else if(form.createdAt.substring(0,4) === selectedYear && selectedMonth === ""){
        filteredForms_local.push(form);
      }
    })
    
    setFilteredForms(filteredForms_local);
  }
  
  useEffect(()=>{
    if(filteredForms.length > 0){
      handleFilteredForm(filteredForms);
    }
  },[filteredForms])


  const getChartData = () => {

    return{
      labels: [],
      datasets: [
        {
          data: Object.values(formTypeAndCount),
          backgroundColor: ['#800080', '#a52a2a', '#ffff00', '#008000', '#0000ff', '#e90000'],
          borderColor: ['#800080', '#a52a2a', '#ffff00', '#008000', '#0000ff', '#e90000'],
          borderWidth: 3,
        },
      ],
    }};


  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top', // Position of the legend
      },
      tooltip: {
        enabled: true, // Show tooltips on hover
      },
    },
  };


  return (
    <>
    {isLoading? <LoadingAnimation/>:
      <div className="userDashboardContainer">
        <h2>Summary</h2>
        <div className="userDashboardGridBox">

          <div className="searchDiv">
            <div className="searchArea">
              <input type="number" placeholder="Year" value={selectedYear} onChange={(e)=>setSelectedYear(e.target.value)} />
              <select name="month" value={selectedMonth} onChange={(e)=>setSelectedMonth(e.target.value)}>
                <option value="">Select</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="Augest">Augest</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
              <button onClick={handleSearch}><img src="https://cdn-icons-png.flaticon.com/128/16020/16020060.png" alt="searchIcon" /></button>
            </div>

            <div className="searchText">
              <p>{selectedYear}</p>
              <p>{selectedMonth}</p>
            </div>

            <div className="searchInfo">
              <div>
                <p>Total accepted leaves</p>
                <p>{filtered_acceptedForms}</p>
              </div>
              <div>
                <p>Total rejected leaves</p>
                <p>{filtered_rejectedForms}</p>
              </div>
              <div>
                <p>Total no-pay leaves</p>
                <p>{filtered_noPayForms}</p>
              </div>
              <div>
                <p>Total applied leaves</p>
                <p>{filtered_acceptedForms}</p>
              </div>
            </div>
          </div>

          <div className="salaryDiv">
            <h4>SALARY INFO</h4>
            <div className="salaryInfo">
              <div>
                <p>Basic Salary</p>
                <p>60000/-</p>
              </div>
              <div>
                <p>No-pay leaves (NP)</p>
                <p>{filtered_noPayForms}</p>
              </div>
              <div>
                <p>Salary allocated per day (X)</p>
                <p>2000/-</p>
              </div>
              <div>
                <p>Salary credit</p>
                <p>Salary - (NP)(X)</p>
              </div>
              <div>
                <p>Final Salary</p>
                <p>{60000 - filtered_noPayForms*2000}/-</p>
              </div>
            </div>
          </div>

          <div className="summaryChartDiv">
            <h4>Summary in Chart</h4>
            <div className="summaryInfo">
              <div className="chart">
                { (formTypeAndCount["Accident Leave Form"]+formTypeAndCount["Maternity Leave Form"]+formTypeAndCount["Medical Leave Form"]+formTypeAndCount["No-Pay"]+
                formTypeAndCount["Normal Leave Form"]+formTypeAndCount["Paternal Leave Form"]) > 0?
                <Pie data={getChartData()} options={options}/>:
                <p>No Details!!!</p>}
              </div>
              <div className="chartAttributes">
                <div>
                  <p>Normal</p>
                </div>
                <div>
                  <p>Accident</p>
                </div>
                <div>
                  <p>Medical</p>
                </div>
                <div>
                  <p>Paternal</p>
                </div>
                <div>
                  <p>Maternity</p>
                </div>
                <div>
                  <p>No-Pay</p>
                </div>
              </div>
            </div>
          </div>

          <div className="currentMonthStatusDiv">
            <div className="monthAndYear">
              <p>{monthNames[new Date().getMonth()]}</p>
              <p>{new Date().getFullYear()}</p>
            </div>
            <div className="currentMonthInfo">
              <div>
                <p>Available Leaves</p>
                <p>{current_availableLeaves}/2</p>
              </div>
              <div>
                <p>Accepted Leaves</p>
                <p>{current_acceptedLeaves}</p>
              </div>
              <div>
                <p>Rejected Leaves</p>
                <p>{current_rejectedLeaves}</p>
              </div>
              <div>
                <p>Pending Leaves</p>
                <p>{current_pendingLeaves}</p>
              </div>
              <div>
                <p>No-Pay Leaves</p>
                <p>{current_noPay}</p>
              </div>
            </div>
          </div>

          <div className="totalLeaveInfoDiv">
            <div>
              <p>Total Accepted Leaves</p>
              <p>{totalAcceptedLeaves}</p>
            </div>
            <div>
              <p>Total Rejected Leaves</p>
              <p>{totalRejectedLeaves}</p>
            </div>
            <div>
              <p>Total applied Leaves</p>
              <p>{forms.length}</p>
            </div>
          </div>

        </div>

      </div>
  }
    </>
  )
}

export default UserDashboard