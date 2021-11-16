import React from "react";
import { BarChart } from "./Charts/BarChart.js"
import "../styles/MMS.css";

function MMS(props) {


    if (!props.data || !props.dataContestadas) {
        return(<h1>loading...</h1>)
    }

    const t = props.data.y.reduce((acum, x) => (acum + x), 0);
    const percentages = props.data.y.map((x) => parseFloat(100*x/t).toFixed(2));

    const contestadas = props.dataContestadas["contestadas"];
    const totalContestadas = props.dataContestadas["totalContestadas"];
    

    return (
        <>
            <h1>Mini Mental State</h1>
            <p><b>Objetivo de aplicación:</b> valorar el estado cognoscitivo de las personas adultas mayores.</p>
            <h2 style={{fontSize: "1.4rem"}}>Categorías:</h2>
            <p>1. Resultado normal <b>({percentages[0]}%)</b></p>
            <p>2. Sospecha de deterioro cognoscitivo, remítase a geriatría, medicina familiar, neurología o psiquiatría según el caso <b>({percentages[1]}%)</b></p>
            <div className="barMMS">
                <BarChart data={props.data} title="Mini Mental State" />
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

export { MMS };
