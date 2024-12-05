import "../../css/Notifications/formReqTap.css"

const FormReqTap = ({form, handleSingleForm}) => {
  return (
    <>
        <div className="formReq-container opened" onClick={handleSingleForm}>
            <h3>{form?.formType}</h3>
            <h3>{form?.form}</h3>
            <div>
              {form?.user?.first_name && <p className="name">{form?.user?.first_name}</p>}
              {form?.userName && <p className="name">{form?.userName}</p>}
              <div>
                <p className="status">{form?.status}</p>
                <p className="status">{form?.formStatus}</p>
                <p className="status">{form?.formCreatedAt?.substring(0,10)}</p>
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