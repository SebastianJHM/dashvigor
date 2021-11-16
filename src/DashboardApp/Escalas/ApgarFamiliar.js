import React from "react";
import { BarChart } from "./Charts/BarChart.js"
import "../styles/ApgarFamiliar.css"

function ApgarFamiliar(props) {
    if (!props.data) {
        return(<h1>loading...</h1>)
    }

    const t = props.data.y.reduce((acum, x) => (acum + x), 0);
    const percentages = props.data.y.map((x) => parseFloat(100*x/t).toFixed(2));

    const contestadas = props.dataContestadas["contestadas"];
    const totalContestadas = props.dataContestadas["totalContestadas"];
    return (
        <>
            <h1>Apgar Familiar</h1>
            <p><b>Objetivo de aplicación:</b> Cuestionario para la evaluacion de la funcionalidad en la familia.</p>
            <h2 style={{fontSize: "1.4rem"}}>Categorías:</h2>
            <p>1. Disfunción familiar severa <b>({percentages[0]}%)</b></p>
            <p>2. Disfunción familiar moderada <b>({percentages[1]}%)</b></p>
            <p>3. Disfunción familiar leve <b>({percentages[2]}%)</b></p>
            <p>4. Disfunción familiar normal <b>({percentages[3]}%)</b></p>

            <div className="barApgar">
                <BarChart data={props.data} title="Apgar Familiar" />
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

export { ApgarFamiliar };