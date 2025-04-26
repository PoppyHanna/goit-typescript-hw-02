// import style from './ErrorMessage.module.css'

interface Messages{
    message:string;
}

const ErrorMessage:React.FC<Messages> = ({ message })  => (

    <div className="error-message">{message}</div>

    );
export default ErrorMessage;