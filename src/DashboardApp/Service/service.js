import { GoogleSpreadsheet } from "google-spreadsheet"
import AES from "crypto-js/aes"
import enc from 'crypto-js/enc-utf8';

async function getDataTest(sh, BDTest) {
    await sh.loadCells("A1:AA125");
    const a = {};
    await BDTest.forEach((t) => {
        const x = [...Array(t.n).keys()].map((i) => (sh.getCell(i + t.row, t.col).value));
        const y = [...Array(t.n).keys()].map((i) => (sh.getCell(i + t.row, t.col + 1).value));
        a[t.key] = { x, y };
        // t.setDataFunction({x, y});
    });
    return(a);
}

async function getDataTamizaje(sh) {
    await sh.loadCells("H1:I171");
    const loadInfo = [
        { pregunta: 1, n: 2, row: 3, col: 7 }, { pregunta: 2, n: 2, row: 8, col: 7 }, { pregunta: 3, n: 2, row: 13, col: 7 },
        { pregunta: 4, n: 2, row: 18, col: 7 }, { pregunta: 5, n: 2, row: 23, col: 7 }, { pregunta: 6, n: 2, row: 28, col: 7 },
        { pregunta: 7, n: 2, row: 33, col: 7 }, { pregunta: 8, n: 2, row: 38, col: 7 }, { pregunta: 9, n: 2, row: 43, col: 7 },
        { pregunta: 10, n: 2, row: 48, col: 7 }, { pregunta: 11, n: 2, row: 53, col: 7 }, { pregunta: 12, n: 2, row: 58, col: 7 },
        { pregunta: 13, n: 2, row: 63, col: 7 }, { pregunta: 14, n: 2, row: 68, col: 7 }, { pregunta: 15, n: 2, row: 73, col: 7 },
        { pregunta: 16, n: 2, row: 78, col: 7 }, { pregunta: 17, n: 2, row: 83, col: 7 }, { pregunta: 18, n: 2, row: 88, col: 7 },
        { pregunta: 19, n: 2, row: 98, col: 7 }, { pregunta: 20, n: 2, row: 97, col: 7 }, { pregunta: 21, n: 2, row: 103, col: 7 },
        { pregunta: 22, n: 2, row: 108, col: 7 }, { pregunta: 23, n: 2, row: 113, col: 7 }, { pregunta: 24, n: 2, row: 118, col: 7 },
        { pregunta: 25, n: 2, row: 123, col: 7 }, { pregunta: 26, n: 2, row: 128, col: 7 }, { pregunta: 27, n: 2, row: 133, col: 7 },
        { pregunta: 28, n: 2, row: 138, col: 7 }
    ]
    const DTamizaje = {};
    loadInfo.forEach(function(tam) {
        const x = [...Array(tam.n).keys()].map((i) => (sh.getCell(i + tam.row, tam.col).value))
        const y = [...Array(tam.n).keys()].map((i) => (sh.getCell(i + tam.row, tam.col + 1).value))
        DTamizaje[tam.pregunta] = { x, y };
    })

    const l = [...Array(28).keys()].map((i) => (sh.getCell(i + 143, 7).value))
    const x1 = [...Array(28).keys()].map((i) => (sh.getCell(i + 143, 8).value))
    const x2 = [...Array(28).keys()].map((i) => (1-sh.getCell(i + 143, 8).value))

    return({ dataTamizaje: { preguntas: DTamizaje, resumen: { l, x1, x2} } });
}

async function getDataUsca(sh) {
    await sh.loadCells("Q129");
    const meanUsca = sh.getCellByA1('Q129').value;
    return({ dataUsca: { meanUsca }});
}

async function getDataSRQ(sh) {
    await sh.loadCells("Q53:W71");
    const loadInfo = [
        { srq: "Salud Mental", n: 2, row: 54, col: 17 },
        { srq: "Psicosis", n: 2, row: 59, col: 17 },
        { srq: "Trastorno Compulsivo", n: 2, row: 64, col: 17 },
        { srq: "Alcoholismo", n: 2, row: 69, col: 17 },
    ]

    const DSRQ = {};
    loadInfo.forEach(function(t) {
        const x = [...Array(t.n).keys()].map((i) => (sh.getCell(i + t.row, t.col).value))
        const y = [...Array(t.n).keys()].map((i) => (sh.getCell(i + t.row, t.col + 1).value))
        DSRQ[t.srq] = { x, y };
    })

    return({ dataSRQ: DSRQ });
}

async function getDataRiesgoSocial(sh) {
    await sh.loadCells("Q92:S114");
    const loadInfo = [
        { rs: "Apoyo emocional", n: 2, row: 92, col: 17 },
        { rs: "Apoyo instrumental", n: 2, row: 97, col: 17 },
        { rs: "Apoyo interacción positiva", n: 2, row: 102, col: 17 },
        { rs: "Apoyo afectivo", n: 2, row: 107, col: 17 },
        { rs: "Indice global", n: 2, row: 112, col: 17 },
    ]

    const DRiesgoSocial = {};
    loadInfo.forEach(function(t) {
        const x = [...Array(t.n).keys()].map((i) => (sh.getCell(i + t.row, t.col).value))
        const y = [...Array(t.n).keys()].map((i) => (sh.getCell(i + t.row, t.col + 1).value))
        DRiesgoSocial[t.rs] = { x, y };
    })

    return({ dataRiesgoSocial: DRiesgoSocial});
}

async function getDataAssist(sh) {
    await sh.loadCells("Z1:AA60");
    const loadInfo = [
        { sustancia: "Tabaco", n: 3, row: 3, col: 25 },
        { sustancia: "Alcohol", n: 3, row: 9, col: 25 },
        { sustancia: "Cannabis", n: 3, row: 15, col: 25 },
        { sustancia: "Cocaína", n: 3, row: 21, col: 25 },
        { sustancia: "Anfetamina", n: 3, row: 27, col: 25 },
        { sustancia: "Inhalantes", n: 3, row: 33, col: 25 },
        { sustancia: "Tranquilizantes", n: 3, row: 39, col: 25 },
        { sustancia: "Alucionógenos", n: 3, row: 45, col: 25 },
        { sustancia: "Opiaceos", n: 3, row: 51, col: 25 },
        { sustancia: "Otros", n: 3, row: 57, col: 25 },
    ]

    const DAss = {};
    loadInfo.forEach(function(li) {
        const x = [...Array(li.n).keys()].map((i) => (sh.getCell(i + li.row, li.col).value))
        const y = [...Array(li.n).keys()].map((i) => (sh.getCell(i + li.row, li.col + 1).value))
        DAss[li.sustancia] = { x, y };
    });

    const x_vi = [...Array(2).keys()].map((i) => (sh.getCell(i + 63, 25).value))
    const y_vi = [...Array(2).keys()].map((i) => (sh.getCell(i + 63, 26).value))

    return({ dataAssist: { dataSustancias: DAss, dataViaInyectada: { x: x_vi, y: y_vi } } });
}

async function getDataDepartamentos(sh) {
    await sh.loadCells("B31:D63");
    const label = [...Array(33).keys()].map((i) => (sh.getCell(i + 30, 1).value));
    const x = [...Array(33).keys()].map((i) => (sh.getCell(i + 30, 3).value));
    const max = Math.max(...x)
    const DEPARTAMENTOS = [
        "AMAZONAS", "ANTIOQUIA", "ARAUCA", "ARCHIPIELAGO DE SAN ANDRES PROVIDENCIA Y SANTA CATALINA", "ATLANTICO",
        "SANTAFE DE BOGOTA D.C", "BOLIVAR", "BOYACA", "CALDAS", "CAQUETA", "CASANARE", "CAUCA", "CESAR", "CHOCO",
        "CORDOBA", "CUNDINAMARCA", "GUAINIA", "GUAVIARE", "HUILA", "LA GUAJIRA", "MAGDALENA", "META", "NARIÑO",
        "NORTE DE SANTANDER", "PUTUMAYO", "QUINDIO", "RISARALDA", "SANTANDER", "SUCRE", "TOLIMA", "VALLE DEL CAUCA",
        "VAUPES", "VICHADA"
    ]
    const DEPCOLORS = {};
    DEPARTAMENTOS.forEach((d, i) => (DEPCOLORS[d] = {color: x[i] / max, label: label[i], frecuencia: x[i]}));
    return({ dataDepartamentos: DEPCOLORS });

}

async function getContestadas(sh) {
    await sh.loadCells("AD2:AF29");
    const DNContestadas = {};

    [...Array(27).keys()].forEach(function(i) {
        const label = sh.getCell(i + 1, 29).value;
        const noContestadas = sh.getCell(i + 1, 30).value;
        const totalContestadas = sh.getCell(i + 1, 31).value;
        const contestadas = totalContestadas - noContestadas;
        DNContestadas[label] = {contestadas, noContestadas, totalContestadas};
    });
    return({ dataContestadas: DNContestadas });
}

const ____ = (l) => AES.decrypt(l, process.env.REACT_APP_SHEET_ID).toString(enc);
async function loadGoogleSpreadsheet() {
    const credenciales = require(process.env.REACT_APP_DIR);
    const miDocumento = new GoogleSpreadsheet(process.env.REACT_APP_SHEET_ID);
    await miDocumento.useServiceAccountAuth({
        client_email: ____(credenciales.ycye),
        private_key: ____(credenciales.xpxk),
    });
    await miDocumento.loadInfo();
    const miHoja = miDocumento.sheetsByIndex[0];

    const dataTest = [
        { range: "C4:D9", n: 6, row: 3, col: 2, key: "dataEdad" },
        { range: "C13:D15", n: 2, row: 12, col: 2, key: "dataGenero" },
        { range: "C18:D27", n: 10, row: 17, col: 2, key: "dataEscolaridad" },
        // {range: "C31:D63", n: 33, row: 30, col: 2, key: "dataDepartamentos"},
        { range: "C67:D68", n: 2, row: 66, col: 2, key: "dataCuidador" },
        { range: "C72:D73", n: 2, row: 71, col: 2, key: "dataGrupoEtnico" },
        { range: "C77:D78", n: 2, row: 76, col: 2, key: "dataDiscapacidad" },
        { range: "C82:D89", n: 8, row: 81, col: 2, key: "dataDiscapacidades" },
        { range: "C93:D96", n: 4, row: 92, col: 2, key: "dataRegimen" },
        { range: "C100:D101", n: 2, row: 99, col: 2, key: "dataGrupoEspecial" },
        { range: "C105:D111", n: 7, row: 104, col: 2, key: "dataEspecialidadMedico" },
        { range: "C115:D124", n: 10, row: 114, col: 2, key: "dataPrograma" },
        { range: "C4:D5", n: 2, row: 3, col: 12, key: "dataMMS" },
        { range: "C9:D13", n: 5, row: 8, col: 12, key: "dataBarthel" },
        { range: "C17:D21", n: 5, row: 16, col: 12, key: "dataLawtonBrody" },
        { range: "C25:D27", n: 3, row: 24, col: 12, key: "dataLindaFried" },
        { range: "C31:D33", n: 3, row: 30, col: 12, key: "dataMNA" },
        { range: "C37:D39", n: 3, row: 36, col: 12, key: "dataFramingham" },
        { range: "C43:D47", n: 5, row: 42, col: 12, key: "dataFindrisk" },
        { range: "C51:D55", n: 5, row: 50, col: 12, key: "dataAMRB" },
        { range: "C59:D62", n: 4, row: 58, col: 12, key: "dataApgarFamiliar" },
        { range: "H4:I5", n: 2, row: 3, col: 17, key: "dataPumaScore" },
        { range: "H9:I17", n: 9, row: 8, col: 17, key: "dataRiesgoACV" },
        { range: "H21:I22", n: 2, row: 20, col: 17, key: "dataHasbled" },
        // {range: "", n: 2, row: , col: 7, key: "dataUsca"},
        { range: "H26:I27", n: 2, row: 25, col: 17, key: "dataGAD2" },
        { range: "H31:I34", n: 4, row: 30, col: 17, key: "dataHamilton" },
        { range: "H38:I39", n: 2, row: 37, col: 17, key: "dataWhooley" },
        { range: "H43:I45", n: 2, row: 42, col: 17, key: "dataYesavage" },
        { range: "H49:I51", n: 3, row: 48, col: 17, key: "dataHHIES" },
        // { range: "L55:M58", n: 4, row: 54, col: 21, key: "dataSRQ" },
        // {range: "", n: 2, row: , col: , key: "dataAssist"},
        { range: "H75:I78", n: 4, row: 74, col: 17, key: "dataAudit" },
        { range: "H83:I84", n: 2, row: 82, col: 17, key: "dataRiesgoEPOC" },
        { range: "H88:I89", n: 2, row: 87, col: 17, key: "dataRiesgoCaidas" },
        // { range: "L93:M97", n: 5, row: 92, col: 21, key: "dataRiesgoSocial" },
        { range: "H118:I120", n: 3, row: 117, col: 17, key: "dataZarit" },
        { range: "H124:I125", n: 2, row: 123, col: 17, key: "dataMoca" },
    ]

    const d1 = await getDataTest(miHoja, dataTest);
    const d2 = await getDataUsca(miHoja);
    const d3 = await getDataAssist(miHoja);
    const d4 = await getDataDepartamentos(miHoja);
    const d5 = await getDataTamizaje(miHoja);
    const d6 = await getDataSRQ(miHoja);
    const d7 = await getDataRiesgoSocial(miHoja)
    const d8 = await getContestadas(miHoja);

    return({ ...d1, ...d2, ...d3, ...d4, ...d5, ...d6, ...d7, ...d8 });
}

export { loadGoogleSpreadsheet }