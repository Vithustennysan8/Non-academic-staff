import "../css/forms.css";
import FormCard from "./FormCard";

const Forms = () => {
  return (
    <div>
      <div className="form-content">
        <div className="form-heading">Request Forms</div>
        <div className="form-attributes">
          <FormCard
            title={"Leave Form"}
            content={"Open Leave Form"}
            img={
              "https://cdn.iconscout.com/icon/premium/png-256-thumb/leaving-1649219-1399243.png"
            }
            url={"/fullLeaveForm"}
          />
          <FormCard
            title={"Transfer Form"}
            content={"Open Transfer Form"}
            img={"https://static.thenounproject.com/png/2409660-200.png"}
            url={"/transferForm"}
          />
          <FormCard
            title={"Short Leave Form"}
            content={"Open Short Leave Form"}
            img={"https://pngimg.com/d/exit_PNG19.png"}
            url={"/halfLeaveForm"}
          />
          <FormCard
            title={"Substitute Procedure Form"}
            content={"Open Substitute Procedure Form"}
            img={"https://static.thenounproject.com/png/2118961-200.png"}
            url={"/subtitute"}
          />
        </div>
      </div>
    </div>
  );
};

export default Forms;
