import React from "react";
import { BarChart } from "./Charts/BarChart.js"
import "../styles/Audit.css"

function Audit(props) {
    if (!props.data || !props.dataContestadas) {
        return(<h1>cargando...</h1>)
    }

    const t = props.data.y.reduce((acum, x) => (acum + x), 0);
    const percentages = props.data.y.map((x) => parseFloat(100*x/t).toFixed(2));

    const contestadas = props.dataContestadas["contestadas"];
    const totalContestadas = props.dataContestadas["totalContestadas"];
    return (
        <>
            <h1>Audit</h1>
            <p><b>Objetivo de aplicación:</b> Tamización alcoholismo</p>
            <h2 style={{fontSize: "1.4rem"}}>Categorías:</h2>
            <p>1. Resultado normal. <b>({percentages[0]}%)</b></p>
            <p>2. Fuerte probabilidad de daños debido al consumo de alcohol. <b>({percentages[1]}%)</b></p>
            <p>3. Indicativo de una probable dependencia. <b>({percentages[2]}%)</b></p>
            <p>4. Dependencia del alcohol. <b>({percentages[3]}%)</b></p>

            <div className="barAudit">
                <BarChart data={props.data} title="Audit" />
            </div>

            <h2 style={{fontSize: "1.4rem"}}>&bull; Tabla de frecuencias por categorías</h2>
            <p style={{fontStyle: "italic"}}>Esta escala la contestaron {contestadas} de {totalContestadas} pacientes de VIGOR.</p>
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Categoría</th>
                            <th>Frec. Absoluta</th>
                            <th>Frec. Relativa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.data.x.map((label, i) => (
                            <tr key={i}>
                                <td>{label}</td>
                                <td>{props.data.y[i]}</td>
                                <td>{percentages[i]}%</td>
                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export { Audit };