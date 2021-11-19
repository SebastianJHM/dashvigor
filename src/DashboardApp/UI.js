import React from 'react';
import './styles/UI.css';

import { ReactComponent as BarIcon } from "./assets/bar-chart-line-fill.svg";
import { ReactComponent as MenuIcon } from "./assets/menu-icon.svg";
import { ReactComponent as DeleteIcon } from "./assets/delete.svg";
import { Link, Outlet } from 'react-router-dom';

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

function UI() {
    const [openSideBar, setOpenSideBar] = React.useState(false);
    const widthScreen = useWindowSize();

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
            <div id="screen" >

                <div className={`sidebar-menu ${openSideBar ? "resp-sidebar" : ""}`}>
                    <div id="container-title-app">
                        <Link to="/dashvigor/a/home">
                            <span id="title-app">Vigor Dashboard</span>
                        </Link>
                    </div>

                    <div className="sidebar-label">
                        <Link to="/dashvigor/a/tamizaje">
                            <BarIcon className="bar-icon" /> Pruebas de Tamizaje
                        </Link>
                    </div>

                    <div className="sidebar-label b">&bull;Escalas Obligatorias</div>
                    <ul>
                        {urls.slice(0, 9).map((u, index) => (
                            <li key={index}>
                                <Link to={`/dashvigor/a/${u.urlPath}`} className="links">
                                    <BarIcon className="bar-icon" /> {u.title}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="sidebar-label b">&bull;Escalas Adicionales</div>
                    <ul>
                        {urls.slice(9,).map((u, index) => (
                            <li key={index}>
                                <Link to={`/dashvigor/a/${u.urlPath}`} className="links">
                                    <BarIcon className="bar-icon" />
                                    {u.title}
                                </Link>
                            </li>
                        ))}

                    </ul>

                </div>

                <div id="s2">
                    <Outlet />
                </div>

                <button className="button-open" onClick={openClose}>
                    {openSideBar ?
                        <MenuIcon className="menu-icon" />
                        :
                        <DeleteIcon className="delete-icon" />
                    }
                </button>
            </div>
        </>
    );
}

export { UI };