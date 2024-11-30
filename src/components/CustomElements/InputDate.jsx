import { useState } from "react";
import "../../css/customElements/inputDate.css"

const InputDate = ({label}) => {
    const [date, setDate] = useState("");

  return (
    <div className="customInput-date">
      <label htmlFor="customInput">{label}</label>
      <input type="date" id="customInput" value={date} onChange={(e) => setDate(e.target.value)}/>
    </div>
  );
};

export default InputDate;
