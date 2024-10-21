import "../../css/Notifications/formReqTap.css"

const FormReqTap = ({form, handleSingleForm}) => {
  return (
    <>
        <div className="formReq-container opened" onClick={handleSingleForm}>
            <h3>{form.formType}</h3>
            <p className="name">{form.user.first_name}</p>
            <p>{form.reason}</p>
        </div>
    </>
  )
}

export default FormReqTap