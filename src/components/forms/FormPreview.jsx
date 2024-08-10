import "../../css/fullLeaveFormPreview.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const FullLeaveFormPreview = ({ application }) => {

    const generatePDF = () => {
        const input = document.getElementById("pdfContent");
        html2canvas(input,{
            scale: 2, // Increase the scale to improve resolution
            useCORS: true, // Use CORS to load images from external sources
            allowTaint: true, // Allow cross-origin images
            logging: true,
        })
            .then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF();
            const imgWidth = 210; // A4 page width in mm (for portrait orientation)
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            const x = (pdf.internal.pageSize.getWidth() - imgWidth) / 2; // Center the image horizontally
            const y = (pdf.internal.pageSize.getHeight() - imgHeight) / 2; // Center the image horizontally

            pdf.addImage(imgData, "PNG", x,20, imgWidth, imgHeight);
                pdf.save(`${application.name}_Leave_Application.pdf`);
            })
            .catch((error) => {
                console.error("Error generating PDF:", error);
            });
    };

    const downloadImage = () => {
        const input = document.getElementById("pdfContent");
        html2canvas(input,{
            scale: 2, // Increase the scale to improve resolution
        useCORS: true, // Use CORS to load images from external sources
        allowTaint: true, // Allow cross-origin images
        logging: true,
        })
        .then((canvas) => {
            const dataURL = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = dataURL;
            link.download = `${application.name}_Leave_Application.png`;
            link.click();
            })
            .catch((error) => {
                console.error("Error generating image:", error);
                });
    }

    return (
        <>
        <div className="review-container" >
            <div id="pdfContent">

                <h2 className="review-header">Request Form</h2>
                {application.name && <div className="review-row">
                    <div className="review-label">Name:</div>
                    <div className="review-value">{application.name}</div>
                </div>}
                { application.emp_id &&<div className="review-row">
                    <div className="review-label">Employee ID:</div>
                    <div className="review-value">{application.emp_id}</div>
                </div>}
                {application.faculty && <div className="review-row">
                    <div className="review-label">Faculty:</div>
                    <div className="review-value">{application.faculty}</div>
                </div>}
                { application.department && <div className="review-row">
                    <div className="review-label">Department:</div>
                    <div className="review-value">{application.department}</div>
                </div>}
                {application.job_start_date && <div className="review-row">
                    <div className="review-label">Job Start Date:</div>
                    <div className="review-value">{application.job_start_date?.substring(0,10)}</div>
                </div>}
                {application.duration && <div className="review-row">
                    <div className="review-label">Duration(hr):</div>
                    <div className="review-value">{application.duration}</div>
                </div>}
                {application.leave_type && <div className="review-row">
                    <div className="review-label">Leave Type:</div>
                    <div className="review-value">{application.leave_type}</div>
                </div>}
                {application.start_date && <div className="review-row">
                    <div className="review-label">Start Date:</div>
                    <div className="review-value">{application.start_date?.substring(0,10)}</div>
                </div>}
                {application.end_date && <div className="review-row">
                    <div className="review-label">End Date:</div>
                    <div className="review-value">{application.end_date?.substring(0,10)}</div>
                </div>}
                {application.acting && <div className="review-row">
                    <div className="review-label">Acting Personnel:</div>
                    <div className="review-value">{application.acting}</div>
                </div>}
                {application.experience && <div className="review-row">
                    <div className="review-label">Experience:</div>
                    <div className="review-value">{application.experience}</div>
                </div>}
                {application.preference1 && <div className="review-row">
                    <div className="review-label">Preference 1:                    </div>
                    <div className="review-value">{application.preference1}</div>
                </div>}
                {application.preference2 && <div className="review-row">
                    <div className="review-label">Preference 2:</div>
                    <div className="review-value">{application.preference2}</div>
                </div>}
                {application.preference3 && <div className="review-row">
                    <div className="review-label">Preference 3:</div>
                    <div className="review-value">{application.preference3}</div>
                </div>}
                {application.reason && <div className="review-row">
                    <div className="review-label">Reason:</div>
                    <div className="review-value">{application.reason}</div>
                </div>}
                {application.status && <div className="review-row">
                    <div className="review-label">Status:</div>
                    <div className={`review-value ${!application.status ? 'status-approved' : 'status-pending'}`}>
                        {!application.status ? "Approved" : "Pending"}
                    </div>
                </div>}
            </div>
            <button onClick={downloadImage} className="download-pdf-btn">Download Image</button>
            <button onClick={generatePDF} className="download-pdf-btn">Download PDF</button>
        </div>
    </>
    );
};

export default FullLeaveFormPreview;
