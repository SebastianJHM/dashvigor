import React from "react";
import "../styles/RiesgoSocial.css";
import { GroupedBarRiesgoSocial } from "./Charts/GroupedBarRiesgoSocial.js";

function RiesgoSocial(props) {
    if (!props.data || !props.dataContestadas) {
        return(<h1>cargando...</h1>);
    }

    const r = {labels: [], data1: [], data2: [], percentages1: [], percentages2: []};
    Object.entries(props.data).forEach(function([t, data]) {
        r.labels.push(t);
        r.data1.push(data.y[0]);
        r.data2.push(data.y[1]);
        r.percentages1.push(parseFloat(100*data.y[0]/(data.y[0]+data.y[1])).toFixed(2));
        r.percentages2.push(parseFloat(100*data.y[1]/(data.y[0]+data.y[1])).toFixed(2));
    });
    const contestadas = props.dataContestadas["contestadas"];
    const totalContestadas = props.dataContestadas["totalContestadas"];
    return (
        <>
            <h1>Riesgo Social</h1>
            <p><b>Objetivo de aplicación:</b> Evaluar riesgo social.</p>
            <h2 style={{fontSize: "1.4rem"}}>La escala de Riesgo Social el nivel de los siguientes tipos de apoyo:</h2>
            <p style={{fontStyle: "italic"}}>&bull; Apoyo Emocional  &bull; Apoyo instrumental  &bull; Apoyo interacción positiva  &bull; Apoyo afectivo  &bull; Indice global</p>
            <h2 style={{fontSize: "1.4rem"}}>Categorías:</h2>
            <p>1. Resultado normal</p>
            <p>2. Falta de apoyo</p>
            <div className="barRiesgoSocial">
                <GroupedBarRiesgoSocial labels={r.labels} data1={r.data1} data2={r.data2} />
            </div>

            <h2 style={{fontSize: "1.4rem"}}>&bull; Tabla de frecuencias por categorías</h2>
            <p style={{fontStyle: "italic"}}>Esta escala la contestaron {contestadas} de {totalContestadas} pacientes de VIGOR.</p>
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th rowSpan="2">Apoyo</th>
                            <th colSpan="2">Frec. Absoluta</th>
                            <th colSpan="2">Frec. Relativa</th>
                        </tr>
                        <tr>
                            <th>Resultado normal</th>
                            <th>Falta de apoyo</th>
                            <th>Resultado normal</th>
                            <th>Falta de apoyo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {r.labels.map((label, i) => (
                            <tr key={i}>
                                <td>{label}</td>
                                <td>{r.data1[i]}</td>
                                <td>{r.data2[i]}</td>
                                <td>{r.percentages1[i]}%</td>
                                <td>{r.percentages2[i]}%</td>
                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export { RiesgoSocial };