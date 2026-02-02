import { Link } from "react-router-dom";
import "../styles/Button.css"
function Button({ disabled, text, isLink, to }) {
    if (isLink) {
        return (
            <>
                {disabled ? (
                    <span className="btn-span"><button className="button-option">{text}</button></span>
                ) : (
                    <Link to={to}><button className="button-option">{text}</button></Link>
                )}
            </>
        )
    }
    return (
        <button className="button-option">{text}</button>
    )
}

export default Button;
