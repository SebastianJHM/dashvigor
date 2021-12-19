import React from "react";
import { geoMercator, geoPath, scaleLinear } from "d3";
import "../../styles/Map.css"

function Map(props) {
    // https://bl.ocks.org/john-guerra/43c7656821069d00dcbc
    // Data
    // https://gist.githubusercontent.com/john-guerra/43c7656821069d00dcbc/raw/be6a6e239cd5b5b803c6e7c2ec405b793a9064dd/Colombia.geo.json

    const [selectedDep, setSelectedDep] = React.useState(null);

    const data = props.data;


    const chart_width = 400;
    const chart_height = 500;

    const projection = geoMercator().scale(1500).center([-74, 4.5]).translate([chart_width * 0.4, chart_height * 0.5]);
    const projectionSanAndres = geoMercator().scale(19000).center([-81.7, 12.6]).translate([50, 30]);
    const projectionProvidencia = geoMercator().scale(19000).center([-81.3, 13.35]).translate([90, 52]);

    const path = geoPath().projection(projection);
    const pathSanAndres = geoPath().projection(projectionSanAndres);
    const pathProvidencia = geoPath().projection(projectionProvidencia);
    const colorScale = scaleLinear().domain([0, 1]).clamp(true).range(['rgb(255, 255, 255)', 'green']);


    const mapJson = require("../../assets/GeoJSONColombia.json");
    const SanAndres = mapJson.features[mapJson.features.length - 2];
    const Providencia = mapJson.features[mapJson.features.length - 1];

    const mapaColombia = [];
    mapJson.features.slice(0, -2).forEach(function (dep) {
        mapaColombia.push({ 
            d: path(dep), 
            color: colorScale(data[dep.properties.NOMBRE_DPT]["color"]), 
            numDep: dep.properties.DPTO,
            label: data[dep.properties.NOMBRE_DPT]["label"],
            frecuencia: data[dep.properties.NOMBRE_DPT]["frecuencia"],
        });
    });
    mapaColombia.push({ 
        d: pathSanAndres(SanAndres), 
        color: colorScale(data["ARCHIPIELAGO DE SAN ANDRES PROVIDENCIA Y SANTA CATALINA"]["color"]), 
        numDep: SanAndres.properties.DPTO,
        label: data["ARCHIPIELAGO DE SAN ANDRES PROVIDENCIA Y SANTA CATALINA"]["label"],
        frecuencia: data["ARCHIPIELAGO DE SAN ANDRES PROVIDENCIA Y SANTA CATALINA"]["frecuencia"],
    });
    mapaColombia.push({ 
        d: pathProvidencia(Providencia), 
        color: colorScale(data["ARCHIPIELAGO DE SAN ANDRES PROVIDENCIA Y SANTA CATALINA"]["color"]), 
        numDep: Providencia.properties.DPTO,
        label: data["ARCHIPIELAGO DE SAN ANDRES PROVIDENCIA Y SANTA CATALINA"]["label"],
        frecuencia: data["ARCHIPIELAGO DE SAN ANDRES PROVIDENCIA Y SANTA CATALINA"]["frecuencia"],
    });

    function mouseOverDep(ev) {
        setSelectedDep({ 
            label: ev.target.attributes.datadeplabel.value, 
            frecuencia: ev.target.attributes.datadepfrecuencia.value 
        });
        if (ev.target.attributes.datadepnum.value === "88") {
            document.querySelectorAll('path[datadepnum="88"]').forEach(function (x) {
                x.style.fill = "rgb(90, 90, 90)";
            });
        } else {
            ev.target.style.fill = "rgb(90, 90, 90)";
        }
    }

    function mouseOutDep(ev, color) {
        setSelectedDep(null);
        if (ev.target.attributes.datadepnum.value === "88") {
            document.querySelectorAll('path[datadepnum="88"]').forEach(function (x) {
                x.style.fill = color;
            });
        } else {
            ev.target.style.fill = color;
        }
    }

    return (
        <>

            <svg width={chart_width} height={chart_height} viewBox={`0 0 ${chart_width} ${chart_height}`}>
                <g>
                    <g className="map-layer">
                        {mapaColombia.map((dep, i) => (
                            <path
                                key={i}
                                d={dep.d}
                                style={{ fill: dep.color }}
                                datadeplabel={dep.label}
                                datadepnum = {dep.numDep}
                                datadepfrecuencia = {dep.frecuencia}
                                onMouseOver={mouseOverDep}
                                onMouseOut={(ev) => (mouseOutDep(ev, dep.color))}
                            />
                        ))}

                        {selectedDep &&
                            <g transform={"translate(250,120)"}>
                                <text>{selectedDep.label}</text>
                                <text y="12">Pacientes: {selectedDep.frecuencia}</text>
                            </g>
                        }
                    </g>
                </g>

            </svg>

        </>
    )
}

export { Map };