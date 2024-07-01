import React, { useState } from 'react';

const FormCard = ({ title, content, img }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const style = {
        width: "500px",
        borderRadius: "12px",
        boxShadow: "0 3px 7px rgba(0,0,0,0.2)",
        border: "1px solid #ccc",
        padding: "15px",
        backgroundColor: "hsla(0, 100%, 98%, 0.886)",
        margin: "12px 0",
        marginBottom: "30px"
    }

    const formHeadingStyle = {
        padding: "10px",
        fontSize: "1rem",
        fontWeight: "bold",
    }

    const formContent = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: isActive ? "rgb(100,100,)" : (isHovered ? "rgb(80,80,80)" : "rgb(123, 123, 123)"),
        borderRadius: "12px",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        padding: "10px",
        transition: "background-color 0.3s",
        cursor: "pointer"
    }

    const incontent = {
        textAlign: "center",
        fontSize: "1.1rem",
        fontWeight: "bold",
        color:"white"
    }

    return (
        <div className="form-card" style={style}>
            <h2 style={formHeadingStyle}>{title}</h2>
            <div className="content-base">
                <div
                    style={formContent}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => setIsActive(!isActive)}
                >
                    <img src={img} alt="image-for-content" style={{height:"120px"}}/>
                    <p style={incontent}>{content}</p>
                </div>
            </div>
        </div>
    )
}

export default FormCard;