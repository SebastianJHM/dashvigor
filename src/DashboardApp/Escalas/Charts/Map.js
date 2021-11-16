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

    const path_ = geoPath().projection(projection);
    const pathSanAndres = geoPath().projection(projectionSanAndres);
    const pathProvidencia = geoPath().projection(projectionProvidencia);
    const colorScale = scaleLinear().domain([0, 1]).clamp(true).range(['rgb(255, 255, 255)', 'green']);


    const MAP = require("../../assets/GeoJSONColombia.json");
    const SanAndres = MAP.features[MAP.features.length - 2];
    const Providencia = MAP.features[MAP.features.length - 1];

    function mouseOverDep(e) {
        console.log(e.target)
        setSelectedDep({label: e.target.attributes.datadeplabel.value, frecuencia: data[e.target.attributes.datadep.value]["frecuencia"]});
        if (e.target.attributes.dataindex.value === "32") {
            document.querySelectorAll('path[dataindex="32"]').forEach(function (x) {
                x.style.fill = "rgb(90, 90, 90)";
            })
        } else {
            e.target.style.fill = "rgb(90, 90, 90)";
        }
    }

    function mouseOutDep(e) {
        setSelectedDep(null);
        if (e.target.attributes.dataindex.value === "32") {
            document.querySelectorAll('path[dataindex="32"]').forEach(function (x) {
                x.style.fill = colorScale(data["ARCHIPIELAGO DE SAN ANDRES PROVIDENCIA Y SANTA CATALINA"]["color"]);
            })
        } else {
            e.target.style.fill = colorScale(data[e.target.attributes.datadep.value]["color"]);
        }
    }

    return (
        <>

            <svg width={chart_width} height={chart_height} viewBox={`0 0 ${chart_width} ${chart_height}`}>
                <g>
                    <g className="map-layer">
                        {MAP.features.slice(0, -2).map((dep, i) => (
                            <path
                                key={dep.properties.NOMBRE_DPT}
                                d={path_(dep)}
                                datadep={dep.properties.NOMBRE_DPT}
                                dataindex={i}
                                datadeplabel={data[dep.properties.NOMBRE_DPT]["label"]}
                                vectorEffect="non-scaling-stroke"
                                style={{ fill: colorScale(data[dep.properties.NOMBRE_DPT]["color"]) }}
                                onMouseOver={mouseOverDep}
                                onMouseOut={mouseOutDep}
                            />
                        ))}

                        <path
                            key={SanAndres.properties.NOMBRE_DPT}
                            d={pathSanAndres(SanAndres)}
                            datadep={SanAndres.properties.NOMBRE_DPT}
                            dataindex={32}
                            datadeplabel="San Andrés y Providencia"
                            vectorEffect="non-scaling-stroke"
                            style={{ fill: colorScale(data["ARCHIPIELAGO DE SAN ANDRES PROVIDENCIA Y SANTA CATALINA"]["color"]) }}
                            onMouseOver={mouseOverDep}
                            onMouseOut={mouseOutDep}
                        />

                        <path
                            key={Providencia.properties.NOMBRE_DPT}
                            d={pathProvidencia(Providencia)}
                            datadep={Providencia.properties.NOMBRE_DPT}
                            dataindex={32}
                            datadeplabel="San Andrés y Providencia"
                            vectorEffect="non-scaling-stroke"
                            style={{ fill: colorScale(data["ARCHIPIELAGO DE SAN ANDRES PROVIDENCIA Y SANTA CATALINA"]["color"]) }}
                            onMouseOver={mouseOverDep}
                            onMouseOut={mouseOutDep}
                        />

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