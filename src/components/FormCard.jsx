import { useNavigate } from 'react-router-dom';
import "../css/formCard.css"

const FormCard = ({ title, content, img, url }) => {

    const navigate = useNavigate()

    const handleClick = () =>{
        navigate(url)
    }

    return (
        <div className="form-card">
            <h2 >{title}</h2>
            <div className="content-base">
                <div
                    onClick={handleClick}
                >
                    <img src={img} alt="image-for-content" style={{height:"120px"}}/>
                    <p >{content}</p>
                </div>
            </div>
        </div>
    )
}

export default FormCard;