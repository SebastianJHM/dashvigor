import React from "react";
import "../styles/Assist.css";
import { BarChart } from "./Charts/BarChart.js"
import { GroupedBarAssist } from "./Charts/GroupedBarAssist.js";

function Assist(props) {
    if (!props.data) {
        return(<h1>loading...</h1>)
    }

    console.log(props.data)

    const r = {labels: [], data1: [], data2: [], data3: [], percentages1: [], percentages2: [], percentages3: []}
    Object.entries(props.data.dataSustancias).forEach(function([sust, data]) {
        r.labels.push(sust);
        r.data1.push(data.y[0]);
        r.data2.push(data.y[1]);
        r.data3.push(data.y[2]);
        r.percentages1.push(parseFloat(100*data.y[0]/(data.y[0]+data.y[1]+data.y[2])).toFixed(2));
        r.percentages2.push(parseFloat(100*data.y[1]/(data.y[0]+data.y[1]+data.y[2])).toFixed(2));
        r.percentages3.push(parseFloat(100*data.y[2]/(data.y[0]+data.y[1]+data.y[2])).toFixed(2));
    })
    // console.log(r)

    const t_vi = props.data.dataViaInyectada.y.reduce((acum, x) => (acum + x), 0);
    const percentages_vi = props.data.dataViaInyectada.y.map((x) => parseFloat(100*x/t_vi).toFixed(2));

    const contestadas = props.dataContestadas["contestadas"];
    const totalContestadas = props.dataContestadas["totalContestadas"];
    return(
        <>
            <h1>Assist</h1>
            <p><b>Objetivo de aplicación:</b> Medición de riesgo de sustancias psicoactivas.</p>
            <h2 style={{fontSize: "1.4rem"}}>La escala Assist califica el riesgo según el consumo de las siguientes sustancias psicoactivas:</h2>
            <p style={{fontStyle: "italic"}}>&bull; Tabaco  &bull; Alcohol  &bull; Cannabis  &bull; Cocaína  &bull; Anfetamina  &bull; Inahlantes  &bull; Tranquilizantes  &bull; Alucinógenos &bull; Opiaceos  &bull; Otros</p>
            <h2 style={{fontSize: "1.4rem"}}>Categorías:</h2>
            <p>1. Riesgo Bajo</p>
            <p>2. Riesgo Moderado</p>
            <p>3. Riesgo Alto</p>
            <div className="ass-res-container">
                <GroupedBarAssist labels={r.labels} data1={r.data1} data2={r.data2} data3={r.data3}/>
            </div>

            
            
            {/*<div className="ass-charts">
                {Object.entries(props.data).map(([sust, data]) => (
                    <div key={sust} className="ass-container">
                        <BarChart title={sust} data={data} />
                    </div>
                ))}
                </div>*/}

            <h2 style={{fontSize: "1.4rem"}}>&bull; Tabla de frecuencias por categorías</h2>
            <p style={{fontStyle: "italic"}}>Esta escala la contestaron {contestadas} de {totalContestadas} pacientes de VIGOR.</p>
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th rowSpan="2">Apoyo</th>
                            <th colSpan="3">Frec. Absoluta</th>
                            <th colSpan="3">Frec. Relativa</th>
                        </tr>
                        <tr>
                            <th>Riesgo Bajo</th>
                            <th>Riesgo Moderado</th>
                            <th>Riesgo Alto</th>
                            <th>Riesgo Bajo</th>
                            <th>Riesgo Moderado</th>
                            <th>Riesgo Alto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {r.labels.map((label, i) => (
                            <tr key={i}>
                                <td>{label}</td>
                                <td>{r.data1[i]}</td>
                                <td>{r.data2[i]}</td>
                                <td>{r.data3[i]}</td>
                                <td>{r.percentages1[i]}%</td>
                                <td>{r.percentages2[i]}%</td>
                                <td>{r.percentages3[i]}%</td>
                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>

            <h2 style={{marginTop: "10px"}}>Droga vía inyectada</h2>
            <h3 style={{fontSize: "1.4rem"}}>Categorías:</h3>
            <p>1. Intervención breve, incluyendo la tarjeta riesgos asociados con inyectarse. <b>({percentages_vi[0]}%)</b></p>
            <p>2. Requiere mayor evaluación y tratamiento más intensivo. <b>({percentages_vi[1]}%)</b></p>            
            <div className="barAssist">
                <BarChart title="VI" data={props.data.dataViaInyectada} />
            </div>
        </>
    )
}

export { Assist };