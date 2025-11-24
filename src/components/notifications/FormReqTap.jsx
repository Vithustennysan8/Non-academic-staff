import "../../css/Notifications/notifications-content.css"
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faUser, faCalendarAlt, faClock } from "@fortawesome/free-solid-svg-icons";

const FormReqTap = ({form, handleSingleForm}) => {
  // Determine status for styling
  const status = form?.status || form?.formStatus;
  
  // Map status to color for text/badge only
  const getStatusColor = (s) => {
      if(!s) return '#64748b'; // slate-500
      switch(s.toLowerCase()) {
          case 'accepted': 
          case 'approved': return '#10b981'; // emerald-500
          case 'rejected': return '#ef4444'; // red-500
          case 'pending': return '#f59e0b'; // amber-500
          default: return '#3b82f6'; // blue-500
      }
  };

  const statusColor = getStatusColor(status);

  return (
    <div className="request-card" onClick={handleSingleForm} style={{cursor: 'pointer'}}>
        <div className="card-header" style={{borderBottom: '1px solid #f1f5f9', paddingBottom: '12px', marginBottom: '12px'}}>
            <div className="card-title" style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                <div style={{
                    color: '#64748b', 
                    fontSize: '1.2rem',
                    display: 'flex', 
                    alignItems: 'center'
                }}>
                    <FontAwesomeIcon icon={faFileAlt} />
                </div>
                <div>
                    <h3 style={{fontSize: '1rem', margin: '0', color: '#334155', fontWeight: '600'}}>{form?.formType || form?.form}</h3>
                </div>
            </div>
            <div style={{
                fontSize: '0.75rem', 
                fontWeight: '600',
                color: statusColor,
                border: `1px solid ${statusColor}40`,
                padding: '4px 10px',
                borderRadius: '12px',
                textTransform: 'capitalize',
                height: 'fit-content'
            }}>
                {status}
            </div>
        </div>
        
        <div className="card-body">
            {(form?.user?.first_name || form?.formUser?.first_name) && (
                <div className="card-row" style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', color: '#64748b', fontSize: '0.85rem'}}>
                    <FontAwesomeIcon icon={faUser} style={{width: '16px', color: '#94a3b8'}} />
                    <span style={{fontWeight: '500', color: '#475569'}}>{form?.user?.first_name || form?.formUser?.first_name}</span>
                </div>
            )}

            <div className="card-row" style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', color: '#64748b', fontSize: '0.85rem'}}>
                <FontAwesomeIcon icon={faCalendarAlt} style={{width: '16px', color: '#94a3b8'}} />
                <span>{form?.createdAt?.substring(0,10) || form?.formCreatedAt?.substring(0,10)}</span>
            </div>

            {form?.leaveAt && (
                 <div className="card-row" style={{display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.85rem'}}>
                    <FontAwesomeIcon icon={faClock} style={{width: '16px', color: '#94a3b8'}} />
                    <span>Leave At: {form.leaveAt.substring(0,10)}</span>
                 </div>
            )}
        </div>
    </div>
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