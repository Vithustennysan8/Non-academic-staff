import "../../css/Notifications/formReqTap.css"

const FormReqTap = ({form}) => {
  return (
    <>
        <div className="formReq-container opened">
            <h3>{form.formType}</h3>
            <p className="name">{form.user.first_name}</p>
            <p>{form.reason}</p>
        </div>
    </>
  )
}

export default FormReqTap