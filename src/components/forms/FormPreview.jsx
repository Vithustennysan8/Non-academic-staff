import "../../css/Forms/formPreview.css"
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Axios } from "../AxiosReqestBuilder";
import { useEffect, useState } from "react";
import NormalLeaveFormTemplate from "../notifications/NormalLeaveFormTemplate";
import OtherLeaveFormsTemplate from "../notifications/OtherLeaveFormsTemplate";

const FormPreview = ({ application, approver, setForm }) => {
    const [formStatus, setFormStatus] = useState('');
    const [description, setDescription] = useState('');

    useEffect(()=>{
        switch (approver.job_type) {
            case "Head of the Department":
                setFormStatus(application?.headStatus);
                break;
            case "Dean":
                setFormStatus(application?.deanStatus);
                break;
            case "Chief Medical Officer":
                setFormStatus(application?.cmoStatus);
                break;
            case "Registrar":
                if(application.formType === "Transfer Form" && application.naeStatus === "Accepted"){
                    setFormStatus(application?.registrarApprovalStatus);
                }else{
                    setFormStatus(application?.registrarStatus);
                }
                break;
            case "Non Academic Establishment Division":
                setFormStatus(application?.naeStatus);
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
            pdf.save(`${application.user.first_name}_Leave_Application.pdf`);
        })
        .catch((error) => {
            console.error("Error generating PDF:", error);
        });
    };


    const handleAccept = async (id) => {
        if(description === ''){
            alert("Add description");
            return;
        }

        try{
            const response = await Axios.put(`/admin/accept/${id}`, {user:approver.id,description, formType:application.formType});
            setForm({...response.data});
            console.log("csdvsfvsfbsf")
        }catch(error){
            console.error("Error accepting application:", error);
            alert("Failed to accept the application. Please try again.");
        }
    }

    const handleReject = async (id) => {
        if(description === ''){
            alert("Add description");
            return;
        }

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

            {application.formType === "Normal Leave Form" ? 
            <NormalLeaveFormTemplate application={application}/>:
            <OtherLeaveFormsTemplate application={application}/>}
            


            {application.status && <div className="review-row">
                <div className="review-label">Status:</div>
                <div className={`review-value ${application.status === "Rejected" && 'status-rejected'} ${application.status === "Accepted" && 'status-approved'} ${application.status === "Pending" && 'status-pending'}`}>
                    {application.status}
                </div>
            </div>}

            {/* This will show the form flow of the approvers depend on  the type of the
            application */}
            <div className="approverContainer">
                <div className="leaveFlowContainer">
                    {application.headStatus && 
                        <div className="review-row">
                            <div className="review-label">Head of the Department: </div> 
                            <div className={"review-value"}>{application.headStatus}</div>
                        </div>
                    }
                    {application.headDescription && 
                        <div className="review-row">
                            <div className="review-label">Description: </div> 
                            <div className="review-value" >{application.headDescription}</div>
                        </div>
                    }

                    {application.deanStatus && 
                        <div className="review-row">
                            <div className="review-label">Dean: </div> 
                            <div className="review-value">{application.deanStatus}</div>
                        </div>
                    }
                    {application.deanDescription && 
                        <div className="review-row">
                            <div className="review-label">Description: </div> 
                            <div className="review-value">{application.deanDescription}</div>
                        </div>
                    }

                    {application.cmoStatus && 
                        <div className="review-row">
                            <div className="review-label">CMO: </div> 
                            <div className="review-value" >{application.cmoStatus}</div>
                        </div>
                    }
                    {application.cmoDescription && 
                        <div className="review-row">
                            <div className="review-label">Description: </div> 
                            <div className="review-value">{application.cmoDescription}</div>
                        </div>
                    }

                    {application.registrarStatus && 
                        <div className="review-row">
                            <div className="review-label">Registrar: </div> 
                            <div className="review-value">{application.registrarStatus}</div>
                        </div>
                    }
                    {application.registrarDescription && 
                        <div className="review-row">
                            <div className="review-label">Description: </div> 
                            <div className="review-value">{application.registrarDescription}</div>
                        </div>
                    }

                    {application.naeStatus && 
                        <div className="review-row">
                            <div className="review-label">NAE: </div> 
                            <div className="review-value">{application.naeStatus}</div>
                        </div>
                    }
                    {application.naeDescription && 
                        <div className="review-row">
                            <div className="review-label">Description: </div> 
                            <div className="review-value">{application.naeDescription}</div>
                        </div>
                    }

                    {application.registrarApprovalStatus && 
                        <div className="review-row">
                            <div className="review-label">Registrar Approval: </div> 
                            <div className="review-value">{application.registrarApprovalStatus}</div>
                        </div>
                    }
                    {application.registrarApprovalDescription && 
                        <div className="review-row">
                            <div className="review-label">Description: </div> 
                            <div className="review-value">{application.registrarApprovalDescription}</div>
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
        <div className="buttonDiv">
            { formStatus === "pending" && approver.role === "ADMIN" &&
                <>
                <button onClick={() => handleAccept(application.id)} className=""><img src="https://cdn-icons-png.flaticon.com/128/5290/5290058.png" alt="" /></button>
                <button onClick={() => handleReject(application.id)} className=""><img src="https://cdn-icons-png.flaticon.com/128/10621/10621089.png" alt="" /></button>
                </>
            }
            <button onClick={generatePDF} className=""><img src="https://cdn-icons-png.flaticon.com/128/4208/4208397.png" alt="" /></button>
        </div>
    </div>
    </>
    );
};

export default FormPreview;
