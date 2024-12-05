import "../../css/Common/popup.css"

const Popup = ({handlePopup, operation, content}) => {

  return (
    <div id="popup-container">
        <div id="popup">
            <p>{content}</p>
            <div>
                <button className="yes" onClick={
                    () => {
                        handlePopup();
                        operation();
                        }
                }>Yes</button>
                <button className="no" onClick={handlePopup}>no</button>
            </div>
        </div>
    </div>
  )
}

export default Popup