
import '../../css/LeaveDetails.css'

function LeaveDetails() {
  const leaveForMonth = 2;  // Dynamic data can be fetched here
  const leaveForYear = 18;  // Dynamic data can be fetched here
  
  return (
    <div className="leave-details-card">
      <h2>Leave Details</h2>
      <div className="leave-info">
        <div className="leave-item">

          <p><strong>Leave for this Month:</strong> {leaveForMonth} days</p>
        </div>
        <div className="leave-item">

          <p><strong>Leave for this Year:</strong> {leaveForYear} days</p>
        </div>
      </div>
    </div>
  );
}

export default LeaveDetails;
