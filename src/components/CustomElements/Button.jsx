import "../../css/customElements/customButton.css"

const Button = ({value}) => {
  return (
    <div className="customButton">
      <button type="submit">{value}</button>
    </div>
  );
};

export default Button;
