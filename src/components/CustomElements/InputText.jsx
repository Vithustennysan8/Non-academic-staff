import "../../css/customElements/inputText.css"

const InputText = ({label, placeholder }) => {
  return (
    <div className="customInput-text">
      <label htmlFor="customInput">{label}</label>
      <input type="text" name="" id="customInput" placeholder={placeholder} />
    </div>
  );
};

export default InputText;
