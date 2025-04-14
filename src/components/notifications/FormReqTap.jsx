import "../../css/Notifications/formReqTap.css"
import PropTypes from 'prop-types';

const FormReqTap = ({form, handleSingleForm}) => {
  return (
    <>
        <div className="formReq-container opened" onClick={handleSingleForm}>
            <h3>{form?.formType}</h3>
            <h3>{form?.form}</h3>
            <div>
              {form?.user?.first_name && <p className="name">{form?.user?.first_name}</p>}
              {form?.formUser?.first_name && <p className="name">{form?.formUser?.first_name}</p>}
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

FormReqTap.propTypes = {
  form: PropTypes.shape({
    formType: PropTypes.string,
    form: PropTypes.string,
    user: PropTypes.shape({
      first_name: PropTypes.string,
    }),
    formUser: PropTypes.shape({
      first_name: PropTypes.string,
    }),
    status: PropTypes.string,
    formStatus: PropTypes.string,
    formCreatedAt: PropTypes.string,
    createdAt: PropTypes.string,
    leaveAt: PropTypes.string,
  }),
  handleSingleForm: PropTypes.func.isRequired,
};

export default FormReqTap