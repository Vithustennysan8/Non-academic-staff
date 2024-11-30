import "../../css/customElements/file.css"

const File = ({label}) => {
  return (
    <div className="customInput-file">
      <label htmlFor="customFile">{label}</label>
      <input type="file" name="" id="customFile"/>
    </div>
  );
};

export default File;
