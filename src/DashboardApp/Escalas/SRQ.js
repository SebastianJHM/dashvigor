import React from "react";
import "../styles/SRQ.css"
import { GroupedBarSRQ } from "./Charts/GroupedBarSRQ.js";

function SRQ(props) {
    
    if (!props.data) {
        return(<h1>loading...</h1>)
    }

    const r = {labels: [], data1: [], data2: [], percentages1: [], percentages2: []}
    Object.entries(props.data).forEach(function([t, data]) {
        r.labels.push(t);
        r.data1.push(data.y[0]);
        r.data2.push(data.y[1]);
        r.percentages1.push(parseFloat(100*data.y[0]/(data.y[0]+data.y[1])).toFixed(2));
        r.percentages2.push(parseFloat(100*data.y[1]/(data.y[0]+data.y[1])).toFixed(2));
    })
    console.log(r)

    const contestadas = props.dataContestadas["contestadas"];
    const totalContestadas = props.dataContestadas["totalContestadas"];

    return (
        <>
            <h1>SRQ</h1>
            <p><b>Objetivo de aplicación:</b> Se aplicará a la población con sospecha de trastornos mentales.</p>
            <h2 style={{fontSize: "1.4rem"}}>La escala SRQ califica los siguientes trastornos mentales:</h2>
            <p style={{fontStyle: "italic"}}>&bull; Salud Mental  &bull; Psicosis  &bull; Trastorno compulsivo  &bull; Alcoholismo</p>
            <h2 style={{fontSize: "1.4rem"}}>Categorías:</h2>
            <p>1. Situación normal</p>
            <p>2. Alta probabilidad de sufrir dicho trastorno</p>
            <div className="barSRQ">
                <GroupedBarSRQ labels={r.labels} data1={r.data1} data2={r.data2} />
            </div>

            <h2 style={{fontSize: "1.4rem"}}>&bull; Tabla de frecuencias por categorías</h2>
            <p style={{fontStyle: "italic"}}>Esta escala la contestaron {contestadas} de {totalContestadas} pacientes de VIGOR.</p>
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th rowSpan="2">Trastorno</th>
                            <th colSpan="2">Frec. Absoluta</th>
                            <th colSpan="2">Frec. Relativa</th>
                        </tr>
                        <tr>
                            <th>Situación normal</th>
                            <th>Probabilidad de sufrir</th>
                            <th>Situación normal</th>
                            <th>Probabilidad de sufrir</th>
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

export { SRQ };