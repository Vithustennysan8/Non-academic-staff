import "../../css/customElements/checkbox.css"

const CheckBox = ({label, options}) => {
  return (
    <div className="customCheckbox">
      <label htmlFor="">{label}</label>
      <br />
        {options.map((option, index) => (
          <div key={index}>
            <input type="checkbox" name="" id="" />
            <label htmlFor="customCheckbox">{option}</label>
          </div>
        ))}
    </div>
  );
};

export default CheckBox;
