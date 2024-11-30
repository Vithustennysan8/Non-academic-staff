import "../../css/customElements/radio.css"

const Radio = ({label, options}) => {
  return (
    <div className="customRadio">
      <label htmlFor="">{label}</label>
      <br />
      {
        options.map((option, index) => (
          <div key={index}>
            <label htmlFor="customRadio">
              <input type="radio" name="name" id="" />{option}
            </label>
          </div>
        ))}
    </div>
  );
};

export default Radio;
