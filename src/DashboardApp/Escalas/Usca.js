import React from "react";
import "../styles/Usca.css"

function Usca(props) {
    if (!props.data || !props.dataContestadas) {
        return(<h1>cargando...</h1>)
    }
    const w = props.data.meanUsca;
    return(
        <>
            <h1>{props.title}</h1>
            <p><b>Objetivo de aplicación:</b> medir el impacto que la EPOC (enfermedad pulmonar obstructiva crónica) tiene en el bienestar y la vida diaria del paciente.</p>
            <h2 style={{fontSize: "1.4rem"}}>Indicaciones:</h2>
            <p>1. El puntaje obtenido por un paciente al que se le aplica el Usca Test oscila entre 0 y 25 puntos</p>
            <p>2. 0 puntos para un paciente significa la nula influencia de la EPOC en su vida diaria.</p>
            <p>3. 25 puntos para un paciente significa la máxima influencia de la EPOC en su vida diaria.</p>
            <p>4. Lo que se muestra a continuación es el promedio de los resultados obtenidos por los pacientes a los que se les aplica Usca Test.</p>
            <div className="progress-container">
                <p><b>Puntaje promedio del Usca Test: </b>{w.toFixed(2)}</p>
                <div className="progress-bar">
                    <div className="progress" style={{width: `${100*w/25}%`}}></div>
                </div>
                <div>
                    <span className="progress-label">0</span>
                    <span className="progress-label l-right">25</span>
                </div>
            </div>
        </>
    )
}

export { Usca };