import React from "react";
import "../styles/Home.css"
import { BarChart } from "./Charts/BarChart";
import { DoughnutChart } from "./Charts/DoughnutChart";
import { Map } from "./Charts/Map.js"

function Home(props) {
    if (!props.dataDepartamentos) {
        return (<h1>cargando...</h1>)
    }
    return (
        <>
            <h1>Datos demográficos</h1>
            <p>
                Los siguientes gráficos representan los datos demográficos de los pacientes a los que se le aplica
                las pruebas correspondientes al programa Vigor. Tales mediciones corresponden a género, edad,
                nivel de escolaridad, si tiene un cuidador, grupo étnico al que pertenece, discapacidad, régimen
                en el que se encuentra el paciente, departamento de naciemiento y especialidad del médico tratante

            </p>


            <br />
            <div className="home-container">
                <div className="c2">
                    <h2>Género del paciente</h2>
                    <p>
                        Categorías: Masculino o Femenino
                    </p>
                    <div className="barHome">
                        <BarChart data={props.dataGenero} title={"Género"} />
                    </div>

                    <br />
                    <h2>Nivel de Esolaridad del paciente</h2>
                    <p>
                        Categorías: Ninguna, Analfabeta, Primaria, Secundaria, Técnico, 
                        Tecnólogo, Pregrado, Postgrado, Maestría, Doctorado
                    </p>
                    <div className="barHome">
                        <BarChart data={props.dataEscolaridad} title={"Escolaridad"} />
                    </div>

                    <br />
                    <h2>¿Presenta el paciente alguna discapacidad?</h2>
                    <p>
                        Categorías: Si o No
                    </p>
                    <div className="doughnut">
                        <DoughnutChart data={props.dataDiscapacidad} title={"Discapacidad"} />
                    </div>


                    <br />
                    <h2>Discapacidades presentadas</h2>
                    <p>
                        Categorías: Auditiva, Cognitiva, Física, Mental, Múltiple, Psicosocial, Sordo-Ceguera, Visual
                    </p>
                    <div className="barHome">
                        <BarChart data={props.dataDiscapacidades} title={"Discapacidades"} />
                    </div>

                    <br />
                    <h2>Régimen del paciente</h2>
                    <p>
                        Categorías: Subsidiado, Contributivo, Especial o de Excepcion, Poblacion pobre no asegurada
                    </p>
                    <div className="barHome">
                        <BarChart data={props.dataRegimen} title={"Regimen"} />
                    </div>
                    
                    <br />
                    <h2>Especialidad médico tratante</h2>
                    <p>
                        Categorías: Auxiliar de Enfermeria, Medicina General, Medicina familiar, Geriatria, 
                        Seguimiento enfermeria, Jefe de enfermeria, Otro
                    </p>
                    <div className="barHome">
                        <BarChart data={props.dataEspecialidadMedico} title={"Especialidad Médico"} />
                    </div>
                </div>

                <div className="c2">
                    <h2>Departamento de nacimiento</h2>
                    <p>
                        Departamento de Colombia al que pertenece el paciente. En el mapa se representan los 33
                        departamentos de colombia.
                    </p>
                    <div className="map-container">
                        <Map data={props.dataDepartamentos} />
                    </div>

                    <br />
                    <h2>Edad del paciente</h2>
                    <p>
                        Categorías: menores de 50 años, entre 50 y 60 años, entre 60 y 70 años, entre 70 y 80 años, 
                        entre 80 y 90 años y mayores de 90 años.
                    </p>
                    <div className="barHome">
                        <BarChart data={props.dataEdad} title={"Edad"} />
                    </div>

                    <br />
                    <h2>¿Tiene cuidador el paciente?</h2>
                    <p>
                        Categorías: Si o No
                    </p>
                    <div className="doughnut">
                        <DoughnutChart data={props.dataCuidador} title={"Cuidador"} />
                    </div>

                    <br />
                    <h2>¿Pertenece a un grupo étnico?</h2>
                    <p>
                        Categorías: Si o No
                    </p>
                    <div className="doughnut">
                        <DoughnutChart data={props.dataGrupoEtnico} title={"Grupo Étnico"} />
                    </div>

                    <br />
                    <h2>¿Pertenece a un grupo especial?</h2>
                    <p>
                        Categorías: Si o No
                    </p>
                    <div className="doughnut">
                        <DoughnutChart data={props.dataGrupoEspecial} title={"Grupo Especial"} />
                    </div>

                    
                </div>

            </div>


            
            



            
            
            
            
            
    
        </>
    )
}

export { Home };