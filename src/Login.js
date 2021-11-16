import React from "react";
import sha256 from 'crypto-js/sha256';

function Login() {
    return(
        <>
            <h1>Soy el login</h1>
            <p>{sha256("x")}</p>
        </>
    )
}

export{ Login };