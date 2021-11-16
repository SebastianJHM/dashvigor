import React from "react";
import { BarChart } from "./Charts/BarChart.js"
import "../styles/RiesgoACV.css"

function RiesgoACV(props) {
    if (!props.data) {
        return(<h1>loading...</h1>)
    }

    const t = props.data.y.reduce((acum, x) => (acum + x), 0);
    const percentages = props.data.y.map((x) => parseFloat(100*x/t).toFixed(2));

    const contestadas = props.dataContestadas["contestadas"];
    const totalContestadas = props.dataContestadas["totalContestadas"];
    return (
        <>
            <h1>RiesgoACV</h1>
            <p><b>Objetivo de aplicación:</b> Valoración del riesgo de ACV en pacientes con FA.</p>
            <h2 style={{fontSize: "1.4rem"}}>Categorías:</h2>
            <p>1. Tasa ajustada de ACV (%/año) 0% <b>({percentages[0]}%)</b></p>
            <p>2. Tasa ajustada de ACV (%/año) 1.3% <b>({percentages[1]}%)</b></p>
            <p>3. Tasa ajustada de ACV (%/año) 2.2% <b>({percentages[2]}%)</b></p>
            <p>4. Tasa ajustada de ACV (%/año) 3.2% <b>({percentages[3]}%)</b></p>
            <p>5. Tasa ajustada de ACV (%/año) 4% <b>({percentages[4]}%)</b></p>
            <p>6. Tasa ajustada de ACV (%/año) 6.7% <b>({percentages[5]}%)</b></p>
            <p>7. Tasa ajustada de ACV (%/año) 9.8% <b>({percentages[6]}%)</b></p>
            <p>8. Tasa ajustada de ACV (%/año) 9.6% <b>({percentages[7]}%)</b></p>
            <p>9. Tasa ajustada de ACV (%/año) 15.2% <b>({percentages[8]}%)</b></p>

            <div className="barRiesgoACV">
                <BarChart data={props.data} title="RiesgoACV" />
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

export { RiesgoACV };