import React from 'react';
import './styles/DashboardApp.css';
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";

import { ReactComponent as BarIcon } from "./assets/bar-chart-line-fill.svg";
import { ReactComponent as MenuIcon } from "./assets/menu-icon.svg";
import { ReactComponent as DeleteIcon } from "./assets/delete.svg";

import { loadGoogleSpreadsheet } from "./Service/service.js";

import { Home } from "./Escalas/Home.js";
import { MMS } from './Escalas/MMS.js';
import { Barthel } from './Escalas/Barthel.js';
import { LawtonBrody } from './Escalas/LawatonBrody.js';
import { Assist } from './Escalas/Assist.js';
import { Usca } from "./Escalas/Usca.js";
import { Tamizaje } from "./Escalas/Tamizaje.js";
import { LindaFried } from './Escalas/LindaFried';
import { Framingham } from './Escalas/Framingham';
import { Findrisk } from './Escalas/Findrisk';
import { AMRB } from './Escalas/AMRB';
import { ApgarFamiliar } from './Escalas/ApgarFamiliar';
import { MNA } from './Escalas/MNA';
import { PumaScore } from './Escalas/PumaScore.js'
import { RiesgoACV } from './Escalas/RiesgoACV.js'
import { Hasbled } from './Escalas/Hasbled.js'
import { GAD2 } from './Escalas/GAD2.js'
import { Hamilton } from './Escalas/Hamilton.js'
import { Whooley } from './Escalas/Whooley.js'
import { Yesavage } from './Escalas/Yesavage.js'
import { HHIES } from './Escalas/HHIES.js'
import { SRQ } from './Escalas/SRQ.js'
import { Audit } from './Escalas/Audit.js'
import { RiesgoEpoc } from './Escalas/RiesgoEpoc.js'
import { RiesgoCaidas } from './Escalas/RiesgoCaidas.js'
import { RiesgoSocial } from './Escalas/RiesgoSocial.js'
import { Zarit } from './Escalas/Zarit.js'
import { Moca } from './Escalas/Moca.js'

function useWindowSize() {
    const [w, setW] = React.useState(10000);
    //const [h, setH] = React.useState(0);

    React.useLayoutEffect(() => {
        setW(window.innerWidth);
        //setH(window.innerHeight);

        function updateSize() {
            setW(window.innerWidth);
            //setH(window.innerHeight);
        }

        window.addEventListener('resize', updateSize);
        return (function () {
            window.removeEventListener('resize', updateSize);
        })
    }, []);
    return (w);
}


function DashboardApp() {
    const [data, setData] = React.useState({});
    const [openSideBar, setOpenSideBar] = React.useState(false);
    const widthScreen = useWindowSize();

    React.useEffect(function () {
        async function loadData() {
            const d = await loadGoogleSpreadsheet();
            console.log(d)
            setData(d);
        }
        loadData();
    }, []);

    React.useEffect(function () {
        if (window.innerWidth <= 600) {
            setOpenSideBar(true);
        }
    }, []);

    const urls = [
        { urlPath: "mms", title: "MiniMental State" },
        { urlPath: "barthel", title: "Barthel" },
        { urlPath: "lawtonbrody", title: "Lawton Brody" },
        { urlPath: "lindafried", title: "Linda Fried" },
        { urlPath: "mna", title: "MiniNutritional Assesment" },
        { urlPath: "framingham", title: "Valoración Framingham" },
        { urlPath: "findrisk", title: "Findrisk" },
        { urlPath: "amrb", title: "Riesgo AMR B" },
        { urlPath: "apgar", title: "APGAR familiar" },
        { urlPath: "pumascore", title: "Puma Score" },
        { urlPath: "acv", title: "Riesgo Tromboembólico ACV" },
        { urlPath: "hasbled", title: "HAS-BLED" },
        { urlPath: "usca", title: "Usca Test" },
        { urlPath: "gad2", title: "GAD 2" },
        { urlPath: "hamilton", title: "Hamilton" },
        { urlPath: "whooley", title: "Whooley" },
        { urlPath: "yesavage", title: "Yesavage" },
        { urlPath: "hhies", title: "HHIE-S" },
        { urlPath: "srq", title: "SRQ" },
        { urlPath: "assist", title: "Assist" },
        { urlPath: "audit", title: "Audit" },
        { urlPath: "repoc", title: "Riesgo Epoc" },
        { urlPath: "rcaidas", title: "Riegos Caidas" },
        { urlPath: "rsocial", title: "Riesgo Social" },
        { urlPath: "zarit", title: "Zarit" },
        { urlPath: "moca", title: "Moca" },
    ]

    function openClose() {
        setOpenSideBar(!openSideBar);
    }

    if (widthScreen > 600) {
        if (openSideBar === true) {
            setOpenSideBar(false);
        }
    }


    return (
        <>
            <BrowserRouter>
                <div id="screen" >

                    <div className={`sidebar-menu ${openSideBar ? "resp-sidebar" : ""}`}>
                        <div id="container-title-app">
                            <Link to="/home">
                                <span id="title-app">Vigor Dashboard</span>
                            </Link>
                        </div>

                        <div style={{ fontSize: "1.4rem" }}>
                            <Link to="/tamizaje">
                                <BarIcon className="bar-icon" />
                                Pruebas de Tamizaje
                            </Link>
                        </div>

                        <div style={{ fontSize: "1.4rem", fontWeight: "bolder" }}>
                            &bull;Escalas Obligatorias
                        </div>
                        <ul>
                            {urls.slice(0, 9).map((u, index) => (
                                <li key={index}>
                                    <Link to={`/${u.urlPath}`} className="links">
                                        <BarIcon className="bar-icon" />
                                        {u.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div style={{ fontSize: "1.4rem", fontWeight: "bolder" }}>
                            &bull;Escalas Adicionales
                        </div>
                        <ul>
                            {urls.slice(9,).map((u, index) => (
                                <li key={index}><Link to={`/${u.urlPath}`} className="links">
                                    <BarIcon className="bar-icon" />
                                    {u.title}
                                </Link></li>
                            ))}

                        </ul>

                    </div>

                    <div id="s2">
                        <Routes>
                            <Route exact path="/" element={<Navigate to="/home" />} />
                            <Route exact path="/home" element={
                                <Home
                                    dataEdad={data["dataEdad"]}
                                    dataGenero={data["dataGenero"]}
                                    dataEscolaridad={data["dataEscolaridad"]}
                                    dataDepartamentos={data["dataDepartamentos"]}
                                    dataCuidador={data["dataCuidador"]}
                                    dataGrupoEtnico={data["dataGrupoEtnico"]}
                                    dataDiscapacidad={data["dataDiscapacidad"]}
                                    dataDiscapacidades={data["dataDiscapacidades"]}
                                    dataRegimen={data["dataRegimen"]}
                                    dataGrupoEspecial={data["dataGrupoEspecial"]}
                                    dataEspecialidadMedico={data["dataEspecialidadMedico"]}
                                />} 
                            />
                            <Route path="/tamizaje" element={<Tamizaje title={"Pruebas de Tamizaje"} data={data["dataTamizaje"]} dataContestadas={data["dataContestadas"] && data["dataContestadas"]["Tamizaje"]} />} />
                            <Route path="/mms" element={<MMS data={data["dataMMS"]} dataContestadas={data["dataContestadas"] && data["dataContestadas"]["MMS"]} />} />
                            <Route path="/barthel" element={<Barthel data={data["dataBarthel"]} dataContestadas={data["dataContestadas"] && data["dataContestadas"]["Barthel"]} />} />
                            <Route path="/lawtonbrody" element={<LawtonBrody data={data["dataLawtonBrody"]} dataContestadas={data["dataContestadas"] && data["dataContestadas"]["LawtonBrody"]} />} />
                            <Route path="/lindafried" element={<LindaFried data={data["dataLindaFried"]} dataContestadas={data["dataContestadas"] && data["dataContestadas"]["LindaFried"]} />} />
                            <Route path="/mna" element={<MNA data={data["dataMNA"]} dataContestadas={data["dataContestadas"] && data["dataContestadas"]["MNA"]} />} />
                            <Route path="/framingham" element={<Framingham data={data["dataFramingham"]} dataContestadas={data["dataContestadas"] && data["dataContestadas"]["Framingham"]} />} />
                            <Route path="/findrisk" element={<Findrisk data={data["dataFindrisk"]} dataContestadas={data["dataContestadas"] && data["dataContestadas"]["Findrisk"]} />} />
                            <Route path="/amrb" element={<AMRB data={data["dataAMRB"]} dataContestadas={data["dataContestadas"] && data["dataContestadas"]["AMRB"]} />} />
                            <Route path="/apgar" element={<ApgarFamiliar data={data["dataApgarFamiliar"]} dataContestadas={data["dataContestadas"] && data["dataContestadas"]["ApgarFamiliar"]} />} />
                            <Route path="/pumascore" element={<PumaScore data={data["dataPumaScore"]} dataContestadas={data["dataContestadas"] && data["dataContestadas"]["PumaScore"]} />} />
                            <Route path="/acv" element={<RiesgoACV data={data["dataRiesgoACV"]} dataContestadas={data["dataContestadas"] && data["dataContestadas"]["RiesgoACV"]} />} />
                            <Route path="/hasbled" element={<Hasbled data={data["dataHasbled"]} dataContestadas={data["dataContestadas"] && data["dataContestadas"]["Hasbled"]} />} />
                            <Route path="/usca" element={<Usca data={data["dataUsca"]} dataContestadas={data["dataContestadas"] && data["dataContestadas"]["Usca"]} />} />
                            <Route path="/gad2" element={<GAD2 data={data["dataGAD2"]} dataContestadas={data["dataContestadas"] && data["dataContestadas"]["GAD2"]} />} />
                            <Route path="/hamilton" element={<Hamilton data={data["dataHamilton"]} dataContestadas={data["dataContestadas"] && data["dataContestadas"]["Hamilton"]} />} />
                            <Route path="/whooley" element={<Whooley data={data["dataWhooley"]} dataContestadas={data["dataContestadas"] && data["dataContestadas"]["Whooley"]} />} />
                            <Route path="/yesavage" element={<Yesavage data={data["dataYesavage"]} dataContestadas={data["dataContestadas"] && data["dataContestadas"]["Yesavage"]} />} />
                            <Route path="/hhies" element={<HHIES data={data["dataHHIES"]} dataContestadas={data["dataContestadas"] && data["dataContestadas"]["HHIES"]} />} />
                            <Route path="/srq" element={<SRQ data={data["dataSRQ"]} dataContestadas={data["dataContestadas"] && data["dataContestadas"]["SRQ"]} />} />
                            <Route path="/assist" element={<Assist data={data["dataAssist"]} dataContestadas={data["dataContestadas"] && data["dataContestadas"]["Assist"]} />} />
                            <Route path="/audit" element={<Audit data={data["dataAudit"]} dataContestadas={data["dataContestadas"] && data["dataContestadas"]["Audit"]} />} />
                            <Route path="/repoc" element={<RiesgoEpoc data={data["dataRiesgoEPOC"]} dataContestadas={data["dataContestadas"] && data["dataContestadas"]["RiesgoEpoc"]} />} />
                            <Route path="/rcaidas" element={<RiesgoCaidas data={data["dataRiesgoCaidas"]} dataContestadas={data["dataContestadas"] && data["dataContestadas"]["RiesgoCaidas"]} />} />
                            <Route path="/rsocial" element={<RiesgoSocial data={data["dataRiesgoSocial"]} dataContestadas={data["dataContestadas"] && data["dataContestadas"]["RiesgoSocial"]} />} />
                            <Route path="/zarit" element={<Zarit data={data["dataZarit"]} dataContestadas={data["dataContestadas"] && data["dataContestadas"]["Zarit"]} />} />
                            <Route path="/moca" element={<Moca data={data["dataMoca"]} dataContestadas={data["dataContestadas"] && data["dataContestadas"]["Moca"]} />} />
                        </Routes>
                    </div>

                    <button className="button-open" onClick={openClose}>
                        {openSideBar ?
                            <MenuIcon className="menu-icon" />
                            :
                            <DeleteIcon className="delete-icon" />
                        }
                    </button>
                </div>
            </BrowserRouter>
        </>
    );
}

export {DashboardApp};
