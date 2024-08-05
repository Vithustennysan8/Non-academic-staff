import "../css/fullLeaveFormPreview.css";
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

                <h2 className="review-header">FullLeave Application Review</h2>
                <div className="review-row">
                    <div className="review-label">Name:</div>
                    <div className="review-value">{application.name}</div>
                </div>
                <div className="review-row">
                    <div className="review-label">Employee ID:</div>
                    <div className="review-value">{application.empId}</div>
                </div>
                <div className="review-row">
                    <div className="review-label">Faculty:</div>
                    <div className="review-value">{application.faculty}</div>
                </div>
                <div className="review-row">
                    <div className="review-label">Department:</div>
                    <div className="review-value">{application.department}</div>
                </div>
                <div className="review-row">
                    <div className="review-label">Job Start Date:</div>
                    <div className="review-value">{application.job_start_date?.substring(0,10)}</div>
                </div>
                <div className="review-row">
                    <div className="review-label">Leave Days:</div>
                    <div className="review-value">{application.leave_days}</div>
                </div>
                <div className="review-row">
                    <div className="review-label">Leave Type:</div>
                    <div className="review-value">{application.leave_type}</div>
                </div>
                <div className="review-row">
                    <div className="review-label">Start Date:</div>
                    <div className="review-value">{application.start_date?.substring(0,10)}</div>
                </div>
                <div className="review-row">
                    <div className="review-label">End Date:</div>
                    <div className="review-value">{application.end_date?.substring(0,10)}</div>
                </div>
                <div className="review-row">
                    <div className="review-label">Acting Personnel:</div>
                    <div className="review-value">{application.acting}</div>
                </div>
                <div className="review-row">
                    <div className="review-label">Reason:</div>
                    <div className="review-value">{application.reason}</div>
                </div>
                <div className="review-row">
                    <div className="review-label">Status:</div>
                    <div className={`review-value ${!application.status ? 'status-approved' : 'status-pending'}`}>
                        {!application.status ? "Approved" : "Pending"}
                    </div>
                </div>
            </div>
            <button onClick={downloadImage} className="download-pdf-btn">Download Image</button>
            <button onClick={generatePDF} className="download-pdf-btn">Download PDF</button>
        </div>
    </>
    );
};

export default FullLeaveFormPreview;
