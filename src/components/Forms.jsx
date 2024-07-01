import '../css/forms.css';
import FormCard from './FormCard';
import Header from "./Header";
import Footer from './Footer';


const Forms = () => {
    return(
        <div>
            <Header />
            <div className='form-content'>
                <div className='form-heading'>
                    Non-Academic Staff Forms
                </div>
                <div className='form-attributes'>
                  <FormCard title={"Leave Form"} content={"Open Leave Form"}/>
                  <FormCard title={"Transfer Form"} content={"Open Transfer Form"}/>
                  <FormCard title={"Half Day Form"} content={"Open Half Day Form"}/>
                  <FormCard title={"Substitute Procedure Form"} content={"Open Substitute Procedure Form"}/>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Forms;