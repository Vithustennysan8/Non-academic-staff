import "../../css/customElements/heading.css"

const Heading = ({value}) => {
  return (
    <div className="customHeading">
      <h3>{value}</h3>
    </div>
  );
};

export default Heading;
