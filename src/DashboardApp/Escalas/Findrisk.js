import React from "react";
import { BarChart } from "./Charts/BarChart.js"
import "../styles/Findrisk.css"

function Findrisk(props) {
    if (!props.data || !props.dataContestadas) {
        return(<h1>cargando...</h1>)
    }

    const t = props.data.y.reduce((acum, x) => (acum + x), 0);
    const percentages = props.data.y.map((x) => parseFloat(100*x/t).toFixed(2));

    const contestadas = props.dataContestadas["contestadas"];
    const totalContestadas = props.dataContestadas["totalContestadas"];
    return (
        <>
            <h1>Findrisk</h1>
            <p><b>Objetivo de aplicación:</b>  prever cuál es su riesgo de enfermar de diabetes tipo 2 en los próximos 10 años.</p>
            <h2 style={{fontSize: "1.4rem"}}>Categorías:</h2>
            <p>1. Nivel de riesgo muy Bajo, 1% de riesgo de contraer diabetes. En su caso no es necesario un cuidado especial o de prevención. Es importante cuidar de su alimentación y realizar ejercicio. <b>({percentages[0]}%)</b></p>
            <p>2. Nivel de riesgo Bajo, 4% de riesgo de contraer diabetes. Es recomendable un poco de cuidado, aunque el nivel de riesgo de contraer una diabetes es bajo, seguir las siguientes recomendaciones. En el caso de sobrepeso deberá intentar disminuir su peso en un 7%. Manténgase en actividad, por lo menos, por media hora durante cinco días a la semana. Las comidas grasas debe ser máximo, sólo un 30% de su alimentación. La parte de ácidos grasos no saturados (sobre todo en la grasa animal) no debería sobrepasar el 10% de la alimentación. Consuma diariamente, por lo menos, 30 gramos de fibras vegetales (como las contenidas en productos integrales, verduras y frutas). <b>({percentages[1]}%)</b></p>
            <p>3. Tomar medidas preventivas, 17% de riesgo de contraer diabetes. El paciente debe adherirse a tomar medidas preventiva. En este caso lo pueden ayudar consejos e instrucciones de expertos para cambiar su estilo de vida, los cuales puede aplicarse por el paciente. Se recomienda recurrir a un profesional médico. <b>({percentages[2]}%)</b></p>
            <p>4. Nivel de riesgo muy alto, 33% de riesgo de contraer diabetes. El riesgo es muy alto: una tercera parte de los pacientes que corresponden a este grupo de riesgo, contraen diabetes en los próximos 10 años. El subestimar esta situación puede traer graves consecuencias. <b>({percentages[3]}%)</b></p>
            <p>5. Actuar inmediatamente, 50% de riesgo de contraer diabetes. Existe la necesidad de actuar inmediatamente, ya que es muy posible que usted ya sufra de diabetes. Eso pasa con el 35% de las personas que se encuentransobre los 20 puntos. Solicite una cita médica y se realizará exámenes para confirmar el diagnóstico de DM2. <b>({percentages[4]}%)</b></p>
            
            <div className="barFindrisk">
                <BarChart data={props.data} title="Findrisk" />
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

export { Findrisk };