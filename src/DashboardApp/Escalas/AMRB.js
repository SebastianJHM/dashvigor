import React from "react";
import { BarChart } from "./Charts/BarChart.js"
import "../styles/AMRB.css"

function AMRB(props) {
    if (!props.data) {
        return(<h1>loading...</h1>)
    }

    const t = props.data.y.reduce((acum, x) => (acum + x), 0);
    const percentages = props.data.y.map((x) => parseFloat(100*x/t).toFixed(2));

    const contestadas = props.dataContestadas["contestadas"];
    const totalContestadas = props.dataContestadas["totalContestadas"];
    return (
        <>
            <h1>Riesgo AMR B</h1>
            <p><b>Objetivo de aplicación:</b> riesgo de padecer un episodio cardiovascular, mortal o no, en un periodo de 10 años.</p>
            <h2 style={{fontSize: "1.4rem"}}>Categorías:</h2>
            <p>1. Riesgo inferior al 10% de padecer un episodio cardiovascular. <b>({percentages[0]}%)</b></p>
            <p>2. Riesgo entre el 10% y el 20% de padecer un episodio cardiovascular. <b>({percentages[1]}%)</b></p>
            <p>3. Riesgo entre el 20% y el 30% de padecer un episodio cardiovascular. <b>({percentages[2]}%)</b></p>
            <p>4. Riesgo entre el 30% y el 40% de padecer un episodio cardiovascular. <b>({percentages[3]}%)</b></p>
            <p>5. Riesgo superior al 40% de padecer un episodio cardiovascular. <b>({percentages[4]}%)</b></p>

            <div className="barAMRB">
                <BarChart data={props.data} title="Riesgo AMR B" />
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

export { AMRB };