import "../../css/formReqTap.css"

const FormReqTap = ({form}) => {
  return (
    <>
        <div className="formReq-container opened">
            <h3>{form.name}</h3>
            <p>{form.reason}</p>
        </div>
    </>
  )
}

export default FormReqTap