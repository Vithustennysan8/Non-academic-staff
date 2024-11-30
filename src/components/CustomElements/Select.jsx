import "../../css/customElements/select.css";

const Select = ({label, options}) => {
  return (
    <div className="customSelect">
      <label htmlFor="customSelect">{label}</label>
      <select name="" id="">
        <option value="">Select</option>
        {
          options.map((option, index) => (
              <option key={index} value={option}>{option}</option>
          ))
        }
      </select>
    </div>
  );
};

export default Select;
