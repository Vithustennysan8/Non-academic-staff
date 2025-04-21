import { Bar } from 'react-chartjs-2';
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useEffect, useMemo, useState } from 'react';
import "../../css/Profile_page/deanCharts.css"
import PropTypes from 'prop-types';
import { Axios } from '../AxiosReqestBuilder';

// Register the required chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DeanCharts = ({allForms}) => {
    const [facultyLeaveCount, setFacultyLeaveCount] = useState([]);
    const [modifiedData, setmodifiedData] = useState({});
    const [faculties, setFaculties] = useState([]);
    const [filter, setfilter] = useState({
        faculty: '',
        year: new Date().getFullYear().toString(),
        month: '',
    })
    const monthsName = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]

    const overAlldepartmentDetails = (arrayMap, year, month) => {
        let facultyObject = []
        faculties.forEach((faculty) => {
            const facultyDetails = arrayMap.get(faculty);
            if (facultyDetails) {
                let count = 0;
                facultyDetails.map((acc) => {
                    if (acc.year == year && acc.month === month) {
                        count += acc.count;
                    }
                    else if( acc.year == year && month === ""){
                        count += acc.count
                    }
                })
                facultyObject.push(count);
            }else{
                facultyObject.push(0)
            }
        })
        console.log(facultyObject)
        setFacultyLeaveCount(facultyObject);
    }

    useEffect(() => {
        const fetchFaculty = async () => {
            try {
              const response = await Axios.get("/auth/user/faculty/getAll");
              const facs = [];
              response.data.forEach(fac => facs.push(fac.facultyName)); 
              setFaculties(facs);
              console.log(response.data);
            } catch (error) {
              console.log(error);
            }
          }

        const fetchFormsByCatogaries = () => {
            let formCategories = new Map();
            
            allForms.forEach((form) => {
                const faculty = form.formUser?.faculty || form.user?.faculty;
                const month = monthsName[form.formCreatedAt?.substring(5, 7)-1 || form.createdAt?.substring(5, 7)-1];
                const year = form.formCreatedAt?.substring(0, 4) || form.createdAt?.substring(0, 4);
                
                // Check if the faculty already exists in the map
                if (formCategories.has(faculty)) {
                    const infos = formCategories.get(faculty);
                    
                    // Find if an entry for this formType, month, and year already exists
                    const existingInfo = infos.find(
                        (info) =>
                        info.month === month &&
                        info.year === year
                    );
                    
                    if (existingInfo) {
                        // Increment the count if found
                        existingInfo.count += 1;
                    } else {
                        // Push a new entry if not found
                        infos.push({ faculty, month, year, count: 1 });
                    }
                } else {
                    // Add a new faculty with the first entry
                    formCategories.set(faculty, [
                        { faculty, month, year, count: 1 },
                    ]);
                }
            });
            
            return formCategories;
        };
            
        fetchFaculty();
        const formCategories = fetchFormsByCatogaries();
        setmodifiedData(formCategories);
        overAlldepartmentDetails(formCategories, filter.year, filter.month);
    }, [allForms, filter]);


      const handleFilters = ()=>{
          if(filter.year.length !== 4){
              alert("Please enter a valid year")
          }
        overAlldepartmentDetails(modifiedData, filter.year, filter.month);
      }

      const handleChange = (e)=>{
        setfilter({...filter, [e.target.name]: e.target.value})
      }


      const generateRandomColor = () =>
        `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
          Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.8)`;    
      
      const colors = useMemo(()=>{
        return faculties.map(()=> generateRandomColor())
      },[]); 

      // Chart data
      const dataOfDepartment = {
        labels: faculties,
        datasets: [
          {
            label: "",
            data: facultyLeaveCount,
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 1,
          },
        ],
      };
    
      // Chart options
      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
        //   title: {
        //     display: true,
        //     text: 'Monthly Sales Data',
        //   },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };

    
      return (<>
        <div className='DeanChart-container'>
            <div className="total">
                <div>
                    <input type="number" name='year' value={filter.year} onChange={(e)=>handleChange(e)} placeholder='year'/>
                    <select name="month" onChange={(e)=>handleChange(e)}>
                        <option value=''>month</option>
                        {monthsName.map((month, index) => (
                            <option key={index} value={month}>{month}</option>
                            ))}
                    </select>
                    <button className='bttn ashbtn' onClick={handleFilters}>search</button>
                </div>
                <Bar data={dataOfDepartment} options={options} />
            </div>
            
        </div>
      </>)
}

DeanCharts.propTypes = {
  allForms: PropTypes.array.isRequired,
};

export default DeanCharts