
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import '../../../css/Profile_page/Dashboard/LeaveGraph.css'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const LeaveGraph = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Leave Taken (Days)',
        data: [2, 3, 1, 4, 2, 3, 0, 2, 4, 1, 2, 3], // Sample data for leave per month
        backgroundColor: 'rgba(54, 162, 235, 0.6)', // Blue bars
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Leave Taken Per Month',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1, // Ensure each step on y-axis increments by 1 day
        },
      },
    },
  };

  return (
    <div className="leave-graph-card">
      <h2>Leave Graph</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default LeaveGraph;
