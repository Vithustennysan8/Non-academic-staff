import "../../css/Notifications/formReqTap.css"

const FormReqTap = ({form, handleSingleForm}) => {
  return (
    <>
        <div className="formReq-container opened" onClick={handleSingleForm}>
            <h3>{form?.formType}</h3>
            <div>
              <p className="name">{form?.user?.first_name}</p>
              <div>
                <p className="status">{form?.status}</p>
                {form.formType === "Transfer Form"?
                <p className="date">{form?.createdAt?.substring(0,10)}</p>:
                <p className="date">{form?.leaveAt?.substring(0,10)}</p>
                }
              </div>
            </div>
        </div>
    </>
  )
}

export default FormReqTap