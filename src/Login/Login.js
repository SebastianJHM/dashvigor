import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as LockIcon } from "./assets/lock.svg";
import { ReactComponent as ExclamationIcon } from "./assets/exclamation.svg";
import { ReactComponent as ArrowRightIcon } from "./assets/arrow-right.svg";
import "./Login.css"

function Login(props) {

    const [contrasenaIngresada, setContrasenaIngresada] = React.useState("");
    const [contrasenaIncorrecta, setContrasenaIncorrecta] = React.useState(false);
    const navigate = useNavigate();
    
    async function digestMessage(message) {
        const msgUint8 = new TextEncoder().encode(message);                           // encode as (utf-8) Uint8Array
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);           // hash the message
        const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
        return hashHex;
    }

    async function verificarContrasenna() {
        const digestBuffer = await digestMessage(contrasenaIngresada);
        if (digestBuffer === process.env.REACT_APP_PW) {
            props.setLoggedIn(true);    
            navigate('/dashvigor/');
        } else {
            setContrasenaIncorrecta(true);
        }
    }

    function ingresar(ev) {
        setContrasenaIngresada(ev.target.value)
    }

    return(
        <>
            <div className="login-page">
                
                <h1 className="login-title">Credenciales</h1>
                <div className="login-card">
                    <div className="password-label" >
                        <LockIcon className="lock-icon" />
                        <span>Digite la contraseña:</span>
                    </div>
                    <input className="input-login" type="password" placeholder="Contraseña" value={contrasenaIngresada} onInput={ingresar} />
                </div>
                {contrasenaIncorrecta && 
                    <div className="contrasena-incorrecta">
                        <ExclamationIcon className="exclamation-icon" />
                        Contrasena incorrecta. Vuelva a intertarlo
                    </div>
                }
                <button className="button-login" onClick={verificarContrasenna}>
                    <ArrowRightIcon className="arrow-right-icon" />
                    Entrar
                </button>
                
            </div>
        </>
    );
}

export { Login };