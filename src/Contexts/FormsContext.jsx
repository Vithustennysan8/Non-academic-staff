import { createContext} from "react";

const FormsContext = createContext({
    appliedDynammicForms: [],
    setAppliedDynamicForms: () => {},
    dynamicFormRequests: [],
    setDynamicFormRequests: () => {},
    appliedNormalLeaveForms: [],
    setAppliedNormalLeaveForms: () => {},
    normalLeaveFormRequests: [],
    setNormalLeaveFormRequests: () => {},
    registerRequests: [],
    setRegisterRequests: () => {},
    appliedTransferForms: [],
    setAppliedTransferForms: () => {},
    transferFormRequests: [],
    setTransferFormRequests: () => {},
});

export { FormsContext };