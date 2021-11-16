import React from "react";
import "../styles/Tamizaje.css"
import { GroupedBarTamizaje } from "./Charts/GroupedBarTamizaje";

function Tamizaje(props) {
    if (!props.data) {
        return(<h1>loading...</h1>)
    }
   
    const pruebasTam = [
        "1.Tamizaje de cuello uterino (ADN-VPH). Se debe realizar a todas las mujeres entre 30 y 65 años de edad con un con un esquema 1 - 5 - 5 (cada 5 años) ante resultados negativos.",
        "2. Tamizaje de cuello uterino (citolog ía) Esquema 1 - 3 - 3 (cada 3 a años) hasta los 65 años.",
        "3. Tamizaje para cáncer de mama (mamografía) cada 2 años hasta los 69 años (anotar la fecha).",
        "4. Tamizaje para cáncer de mama (valoración clínica de la mama) anual hasta los 69 años.",
        "5. Biopsia de mama (según hallazgos de la mamografía).",
        "6. Tamizaje para cáncer de próstata (PSA) cada 5 años hasta los 75 años (anotar la fecha).",
        "7. Tamizaje para cáncer de próstata (Tacto rectal) cada 5 años, hasta los 75 años.",
        "8. Biopsia de próstata (según hallazgos en la tamización) hasta los 75 años.",
        "9. Tamizaje para cáncer de colon (sangre oculta en materia fecal por inmunoquímica) cada 2 años hasta los 75 años (anotar la fecha).",
        "10. Colonoscopia (según resultados de sangre oculta) hasta los 75 años.",
        "11. Biopsia de colon (según hallazgos endoscópicos).",
        "12. Tamizaje de riesgo cardiovascular, cada 5 años hasta los 79 años: Glicemia basal, perfil lipídico (colestero HDL, LDL, Colesterol total y triglicéridos), creatinina y uroanálisis.",
        "13. Prueba rápida treponémica (según la exposición al riesgo).",
        "14. Prueba rápida para VIH (según exposición al riesgo).",
        "15. Prueba rápida para Hepatitis B (según exposición al riesgo, relaciones sexuales sin protección).",
        "16. Prueba rápida para Hepatitis C (para toda la población entre los 50 y 79 años, una vez en la vida).",
        "17. Asesoría en anticoncepción (por demanda solo para la población masculina, hasta los 79 años e incentivar a las mujeres mayores de 60 años a la prevención de enfermedades de transmisión sexual).",
        "18. Vasectomía (por demanda, hasta los 79 años).",
        "19. Suministro de preservativos (en consulta se entregarán 10 condones al mes de acuerdo a la directriz).",
        "20. Vacunación según esquema vigente de Influenza cada año (gratuita).",
        "21. Pneumococo conjugada (una sola vez luego de los 50 años).",
        "22. Pneumococo polisacárida, una dosis al año de aplicada la conjugada y repetir a los 5 años (gratuita en Bogotá).",
        "23. Vacunación según esquema vigente de Herpes zoster (una vez luego de los 50 años).",
        "24. Educación individual: hábitos y estilos de vida saludable (registrar si cumple recomendaciones de actividad física).",
        "25. Educación dirigida a la familia (de acuerdo a la necesidad se establecerán los ciclos y contenidos educativos).",
        "26. Educación grupal (de acuerdo a la necesidad se establecerán los ciclos y contenidos educativos, se debe derivar por lo menos a tres ciclos educativos. Se debe realizar sesiones educativas grupales para personas cuidadoras. Deben realizarse sesiones educativas de entrenamiento cognitivo y emocional).",
        "27. Remisión a odontología para profilaxis y remoción de placa bacteriana (una vez cada dos años).",
        "28. Remisión a odontología para detartraje supragingival (según necesidad).",
    ]

    const contestadas = props.dataContestadas["contestadas"];
    const totalContestadas = props.dataContestadas["totalContestadas"];
    return(
        <>
            <h1>Pruebas de Tamizaje</h1>
            <p style={{fontWeight: "700"}}>
                Lista de actividades y pruebas de tamizaje a realizar en personas mayores de acuerdo a la resolución 3280 de 2018:
            </p>
            {pruebasTam.map((pt, index) => (
                <p key={index} className="pt-titles">{pt}</p>
            ))}
            <div className="tam-res-container">
                <GroupedBarTamizaje labels={props.data.resumen.l} data1={props.data.resumen.x1} data2={props.data.resumen.x2} />
            </div>
            <p style={{fontStyle: "italic"}}>Esta escala la contestaron {contestadas} de {totalContestadas} pacientes de VIGOR.</p>

            {/*<h2 style={{fontSize: "2rem", margin: "10px 0", textAlign: "center"}}>Resultado por pregunta</h2>
            <div className="tam-charts">
                {Object.entries(props.data.preguntas).map(([preg, data]) => (
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <h2 style={{marginBottom: "5px"}}>Pregunta {preg}</h2>
                        <div key={preg} className="tam-container">
                            <DoughnutChart title={`Pregunta ${preg}`} data={data} />
                        </div>
                    </div>
                ))}
                </div>*/}
        </>
    )
}

export { Tamizaje };