import "../../css/fullLeaveFormPreview.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Axios } from "../AxiosReqestBuilder";
import { useEffect, useState } from "react";


const FormPreview = ({ application, approver, setForm }) => {
    const [formStatus, setFormStatus] = useState('pending');
    const [description, setDescription] = useState('');

    useEffect(()=>{
        switch (approver.job_type) {
            case "Head of the Department":
                setFormStatus(application.approverOneStatus);
                break;
            case "Management Assistant":
                setFormStatus(application?.approverTwoStatus);
                break;
            default:
                break;
        }
    },[application, approver.job_type])

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
    
    // const downloadImage = () => {
    //     const input = document.getElementById("pdfContent");
    //     html2canvas(input,{
    //         scale: 2, // Increase the scale to improve resolution
    //         useCORS: true, // Use CORS to load images from external sources
    //         allowTaint: true, // Allow cross-origin images
    //         logging: true,
    //     })
    //     .then((canvas) => {
    //         const dataURL = canvas.toDataURL("image/png");
    //         const link = document.createElement("a");
    //         link.href = dataURL;
    //         link.download = `${application.name}_Leave_Application.png`;
    //         link.click();
    //         })
    //         .catch((error) => {
    //             console.error("Error generating image:", error);
    //         });
    //     }

    const handleAccept = async (id) => {
        if(description === ''){
            alert("Add description");
            return;
        }
        try{
            const response = await Axios.put(`/admin/accept/${id}`, {user:approver.id,description, formType:application.formType});
            setForm({...response.data});
        }catch(error){
            console.error("Error accepting application:", error);
            alert("Failed to accept the application. Please try again.");
        }
    }

    const handleReject = async (id) => {
        try{
            const response = await Axios.put(`/admin/reject/${id}`, {user:approver.id,description,formType:application.formType});
            setForm({...response.data});
        }catch(error){
            console.error("Error rejecting application:", error);
            alert("Failed to reject the application. Please try again.");
        }
    }

    const handleChange = (e) => {
        setDescription(e.target.value);
    }
        
    return (
        <>
    <div className="review-container" >
        <div id="pdfContent">

            <h2 className="review-header">{application.formType}</h2>

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

            {/*  Normal Leave Form */}
            {application.user.first_name && <div className="review-row">
                <div className="review-label">Applicant name:</div>
                <div className="review-value">{application.user.first_name}</div>
            </div>}
            {application.upfNo && <div className="review-row">
                <div className="review-label">UPF no:</div>
                <div className="review-value">{application.upfNo}</div>
            </div>}
            {application.designation && <div className="review-row">
                <div className="review-label">Designation:</div>
                <div className="review-value">{application.designation}</div>
            </div>}
            {application.firstAppointmentDate && <div className="review-row">
                <div className="review-label">First Appointment Date:</div>
                <div className="review-value">{application.firstAppointmentDate?.substring(0,10)}</div>
            </div>}
            {application.casualLeaveLastYear > -1 && <div className="review-row">
                <div className="review-label">Casual Leave LastYear:</div>
                <div className="review-value">{application.casualLeaveLastYear}</div>
            </div>}
            {application.vacationLeaveLastYear > -1 && <div className="review-row">
                <div className="review-label">Vacation Leave LastYear:</div>
                <div className="review-value">{application.vacationLeaveLastYear}</div>
            </div>}
            {application.sickLeaveLastYear >-1 && <div className="review-row">
                <div className="review-label">Sick Leave LastYear:</div>
                <div className="review-value">{application.sickLeaveLastYear}</div>
            </div>}
            {application.casualLeaveThisYear > -1 && <div className="review-row">
                <div className="review-label">Casual Leave ThisYear:</div>
                <div className="review-value">{application.casualLeaveThisYear}</div>
            </div>}
            {application.vacationLeaveThisYear > -1 && <div className="review-row">
                <div className="review-label">Vacation Leave ThisYear:</div>
                <div className="review-value">{application.vacationLeaveThisYear}</div>
            </div>}
            {application.sickLeaveThisYear > -1 && <div className="review-row">
                <div className="review-label">Sick Leave ThisYear:</div>
                <div className="review-value">{application.sickLeaveThisYear}</div>
            </div>}
            {application.noOfLeaveDays > -1 && <div className="review-row">
                <div className="review-label">No Of Leave Days:</div>
                <div className="review-value">{application.noOfLeaveDays}</div>
            </div>}
            {application.leaveType && <div className="review-row">
                <div className="review-label">Leave Type:</div>
                <div className="review-value">{application.leaveType}</div>
            </div>}
            {application.leaveAppliedDate && <div className="review-row">
                <div className="review-label">Leave Applied Date:</div>
                <div className="review-value">{application.leaveAppliedDate?.substring(0,10)}</div>
            </div>}
            {application.reason && <div className="review-row">
                <div className="review-label">Reason:</div>
                <div className="review-value">{application.reason}</div>
            </div>}
            {application.arrangement && <div className="review-row">
                <div className="review-label">Arrangement:</div>
                <div className="review-value">{application.arrangement}</div>
            </div>}
            {application.addressDuringTheLeave && <div className="review-row">
                <div className="review-label">Address During The Leave:</div>
                <div className="review-value">{application.addressDuringTheLeave}</div>
            </div>}
            {application.orderOfHead && <div className="review-row">
                <div className="review-label">Order Of Head of the Department:</div>
                <div className="review-value">{application.orderOfHead}</div>
            </div>}

                
            {/* AcccidentLeaveForm */}
            {application.accidentOccurredDuring && <div className="review-row">
                <div className="review-label">The accident occurred during: </div>
                <div className="review-value">{application.accidentOccurredDuring}</div>
            </div>}
            {application.DateAndTimeOfAccident && <div className="review-row">
                <div className="review-label">Date and time of the accident: </div>
                <div className="review-value">{application.DateAndTimeOfAccident}</div>
            </div>}
            {application.placeOFAccident && <div className="review-row">
                <div className="review-label">PlaceOFAccident of accident: </div>
                <div className="review-value">{application.placeOFAccident}</div>
            </div>}
            {application.whilePerformingAnyDuty && <div className="review-row">
                <div className="review-label">While performing any duty: </div>
                <div className="review-value">{application.whilePerformingAnyDuty}</div>
            </div>}
            {application.natureOfDanger && <div className="review-row">
                <div className="review-label">Nature of danger: </div>
                <div className="review-value">{application.natureOfDanger}</div>
            </div>}
            {application.whoInspectTheAccident && <div className="review-row">
                <div className="review-label">Name of the nearest person / officer who will inspect the accident: </div>
                <div className="review-value">{application.whoInspectTheAccident}</div>
            </div>}
            {application.whoInformedAfterAccident && <div className="review-row">
                <div className="review-label">The officer who informed immediately after the accident was the: </div>
                <div className="review-value">{application.whoInformedAfterAccident}</div>
            </div>}
            {application.referralForTreatment && <div className="review-row">
                <div className="review-label">Referral for Treatment: </div>
                <div className="review-value">{application.referralForTreatment}</div>
            </div>}
            {application.dateAndTimeOfReport && <div className="review-row">
                <div className="review-label">Date and Time of Report to Hospital / Medical Centre: </div>
                <div className="review-value">{application.dateAndTimeOfReport}</div>
            </div>}
            {application.durationOfHospitalStay && <div className="review-row">
                <div className="review-label">Duration of hospital stay: </div>
                <div className="review-value">{application.durationOfHospitalStay}</div>
            </div>}
            {application.isPoliceComplaint && <div className="review-row">
                <div className="review-label">Police complaint was made: </div>
                <div className="review-value">{application.isPoliceComplaint}</div>
            </div>}
            {application.expectAccidentCompensation && <div className="review-row">
                <div className="review-label">Whether to expect accident compensation: </div>
                <div className="review-value">{application.expectAccidentCompensation}</div>
            </div>}




            {application.status && <div className="review-row">
                <div className="review-label">Status:</div>
                <div className={`review-value ${!application.status ? 'status-approved' : 'status-pending'}`}>
                    {application.status === "accepted" ? "Approved" : "Pending"}
                </div>
            </div>}

            <div className="approverContainer">
                <div className="leaveFlowContainer">
                    {application.approverOneStatus && 
                        <div className="review-row">
                            <div className="review-label">Approver1: </div> 
                            <div className={`review-value ${application.approverOneStatus}`}>{application.approverOneStatus}</div>
                        </div>
                    }
                    {application.approverOneDescription && 
                        <div className="review-row">
                            <div className="review-label">Description: </div> 
                            <div className="review-value" >{application.approverOneDescription}</div>
                        </div>
                    }

                    {application.approverTwoStatus && 
                        <div className="review-row">
                            <div className="review-label">Approver2: </div> 
                            <div className="review-value">{application.approverTwoStatus}</div>
                        </div>
                    }
                    {application.approverTwoDescription && 
                        <div className="review-row">
                            <div className="review-label">Description: </div> 
                            <div className="review-value">{application.approverTwoDescription}</div>
                        </div>
                    }

                    {application.approverThreeStatus && 
                        <div className="review-row">
                            <div className="review-label">Approver3: </div> 
                            <div className="review-value" >{application.approverThreeStatus}</div>
                        </div>
                    }
                    {application.approverThreeDescription && 
                        <div className="review-row">
                            <div className="review-label">Description: </div> 
                            <div className="review-value">{application.approverThreeDescription}</div>
                        </div>
                    }

                    {application.approverFourStatus && 
                        <div className="review-row">
                            <div className="review-label">Approver4: </div> 
                            <div className="review-value">{application.approverFourStatus}</div>
                        </div>
                    }
                    {application.approverFourDescription && 
                        <div className="review-row">
                            <div className="review-label">Description: </div> 
                            <div className="review-value">{application.approverFourDescription}</div>
                        </div>
                    }

                    {application.approverFiveStatus && 
                        <div className="review-row">
                            <div className="review-label">Approver5: </div> 
                            <div className="review-value">{application.approverFiveStatus}</div>
                        </div>
                    }
                    {application.approverFiveDescription && 
                        <div className="review-row">
                            <div className="review-label">Description: </div> 
                            <div className="review-value">{application.approverFiveDescription}</div>
                        </div>
                    }
                </div>
            </div>

            { formStatus === "pending" && approver.role === "ADMIN" &&
                <div className="review-row description">
                    <label htmlFor="description" className="review-label">Description: </label>
                    <textarea name="description" id="description" className="review-value" rows={3} cols={40} value={description} onChange={handleChange}></textarea>
                </div>
            }
        </div>
        {/* <button onClick={downloadImage} className="download-pdf-btn">Download Image</button> */}
        <div style={{
            display: "flex",
            justifyContent: "center",
        }}>

            { formStatus === "pending" && approver.role === "ADMIN" &&
                <>
                <button onClick={() => handleAccept(application.id)} className=" btn approve">Approve</button>
                <button onClick={() => handleReject(application.id)} className="btn reject">Reject</button>
                </>
            }
            <button onClick={generatePDF} className="download-pdf-btn btn">Download</button>
        </div>
    </div>
    </>
    );
};

export default FormPreview;
