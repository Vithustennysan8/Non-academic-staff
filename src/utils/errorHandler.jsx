import { toast } from "react-toastify";

export const handleError = ({ code, message }) => {
    switch(code){
        case "NETWORK_ERROR":
            toast.error(message);
            break;
        case "BAD_REQUEST":
            toast.error(message);
            break;
        case "UNAUTHORIZED":
            toast.error(message);
            break;
        case "TOKEN_EXPIRED":
            toast.error(message);
            break;
        case "FORBIDDEN":
            toast.error(message);
            break;
        case "NOT_FOUND":
            toast.error(message);
            break;
        case "CONFLICT":
            toast.error(message);
            break;
        case "TOO_MANY_REQUESTS":
            toast.error("Too many requests. Please try again later.");
            break;
        case "BAD_GATEWAY":
            toast.error("Server error. Please try again later.");
            break;
        case "SERVICE_UNAVAILABLE":
            toast.error("Service temporarily unavailable. Please try again later.");
            break;
        case "GATEWAY_TIMEOUT":
            toast.error("Request timeout. Please try again.");
            break;
        case "INTERNAL_SERVER_ERROR":
            toast.error("Server error. Please try again later.");
            break;
        case "UNKNOWN_ERROR":
            toast.error(message);
            break;
        default:
            toast.error('Something went wrong, please try again later');
            // TODO: remove this console.error after development
            console.error(message);
            break;
        }
}
