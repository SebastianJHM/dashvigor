import { GoogleSpreadsheet } from "google-spreadsheet"
import AES from "crypto-js/aes"
import enc from 'crypto-js/enc-utf8';

async function getDataTest(sh, BDTest) {
    const a = {};
    await BDTest.forEach((t) => {
        const x = [...Array(t.n).keys()].map((i) => (sh.getCell(i + t.row, t.col).value));
        const y = [...Array(t.n).keys()].map((i) => (sh.getCell(i + t.row, t.col + 1).value));
        a[t.key] = { x, y };
    });
    return(a);
}

async function getDataTamizaje(sh) {
    const DTamizaje = {};
    [...Array(28).keys()].forEach(function(i) {
        const x = [...Array(2).keys()].map((j) => (sh.getCell(4, 7 + j).value))
        const y = [...Array(2).keys()].map((j) => (sh.getCell(i + 5, 7 + j).value))
        DTamizaje[i] = { x, y };
    })

    const l = [...Array(28).keys()].map((i) => (sh.getCell(i + 5, 6).value))
    const x1 = [...Array(28).keys()].map((i) => (sh.getCell(i + 5, 9).value))
    const x2 = [...Array(28).keys()].map((i) => (1-sh.getCell(i + 5, 9).value))

    return({ dataTamizaje: { preguntas: DTamizaje, resumen: { l, x1, x2} } });
}

async function getDataUsca(sh) {
    const meanUsca = sh.getCellByA1('P85').value;
    return({ dataUsca: { meanUsca }});
}

async function getDataSRQ(sh) {

    // Trastornos SRQ
    const loadInfo = [
        { srq: "Salud Mental", n: 2, row: 22, col: 20 },
        { srq: "Psicosis", n: 2, row: 27, col: 20 },
        { srq: "Trastorno Compulsivo", n: 2, row: 32, col: 20 },
        { srq: "Alcoholismo", n: 2, row: 37, col: 20 },
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

    // Apoyos Riesgo Social
    const loadInfo = [
        { rs: "Apoyo emocional", n: 2, row: 49, col: 20 },
        { rs: "Apoyo instrumental", n: 2, row: 54, col: 20 },
        { rs: "Apoyo interacción positiva", n: 2, row: 59, col: 20 },
        { rs: "Apoyo afectivo", n: 2, row: 64, col: 20 },
        { rs: "Indice global", n: 2, row: 69, col: 20 },
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
    const DAss = {};
    [...Array(10).keys()].forEach(function(i) {
        const sustancia = sh.getCell(4 + i, 19).value.slice(9, )
        const x = [...Array(3).keys()].map((j) => (sh.getCell(3, 20 + j).value))
        const y = [...Array(3).keys()].map((j) => (sh.getCell(4 + i, 20 + j).value))
        DAss[sustancia] = { x, y };
    })

    const x_vi = [...Array(2).keys()].map((i) => (sh.getCell(i + 17, 20).value))
    const y_vi = [...Array(2).keys()].map((i) => (sh.getCell(i + 17, 21).value))

    return({ dataAssist: { dataSustancias: DAss, dataViaInyectada: { x: x_vi, y: y_vi } } });
}

async function getDataDepartamentos(sh) {
    const label = [...Array(33).keys()].map((i) => (sh.getCell(i + 32, 1).value));
    const x = [...Array(33).keys()].map((i) => (sh.getCell(i + 32, 3).value));
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
    const DNContestadas = {};

    [...Array(27).keys()].forEach(function(i) {
        const label = sh.getCell(i + 3, 25).value;
        const noContestadas = sh.getCell(i + 3, 26).value;
        const totalContestadas = sh.getCell(i + 3, 27).value;
        const contestadas = totalContestadas - noContestadas;
        DNContestadas[label] = {contestadas, noContestadas, totalContestadas};
    });
    return({ dataContestadas: DNContestadas });
}

const ____ = (l) => AES.decrypt(l, process.env.REACT_APP_SHEET_ID).toString(enc);
async function loadData() {
    const credenciales = require(process.env.REACT_APP_DIR);
    const miDocumento = new GoogleSpreadsheet(process.env.REACT_APP_SHEET_ID);
    await miDocumento.useServiceAccountAuth({
        client_email: ____(credenciales.ycye),
        private_key: ____(credenciales.xpxk),
    });
    await miDocumento.loadInfo();
    const miHoja = miDocumento.sheetsByIndex[0];
    await miHoja.loadCells("A1:AH170");
    

    const dataTest = [
        { range: "C4:D9", n: 6, row: 5, col: 2, key: "dataEdad" },
        { range: "C13:D15", n: 2, row: 14, col: 2, key: "dataGenero" },
        { range: "C18:D27", n: 10, row: 19, col: 2, key: "dataEscolaridad" },
        // {range: "C31:D63", n: 33, row: 30, col: 2, key: "dataDepartamentos"},
        { range: "C67:D68", n: 2, row: 68, col: 2, key: "dataCuidador" },
        { range: "C72:D73", n: 2, row: 73, col: 2, key: "dataGrupoEtnico" },
        { range: "C77:D78", n: 2, row: 78, col: 2, key: "dataDiscapacidad" },
        { range: "C82:D89", n: 8, row: 83, col: 2, key: "dataDiscapacidades" },
        { range: "C93:D96", n: 4, row: 94, col: 2, key: "dataRegimen" },
        { range: "C100:D101", n: 2, row: 101, col: 2, key: "dataGrupoEspecial" },
        { range: "C105:D111", n: 7, row: 105, col: 2, key: "dataEspecialidadMedico" },
        { range: "C115:D124", n: 10, row: 116, col: 2, key: "dataPrograma" },
        { range: "C4:D5", n: 2, row: 5, col: 12, key: "dataMMS" },
        { range: "C9:D13", n: 5, row: 10, col: 12, key: "dataBarthel" },
        { range: "C17:D21", n: 5, row: 18, col: 12, key: "dataLawtonBrody" },
        { range: "C25:D27", n: 3, row: 26, col: 12, key: "dataLindaFried" },
        { range: "C31:D33", n: 3, row: 32, col: 12, key: "dataMNA" },
        { range: "C37:D39", n: 3, row: 38, col: 12, key: "dataFramingham" },
        { range: "C43:D47", n: 5, row: 44, col: 12, key: "dataFindrisk" },
        { range: "C51:D55", n: 5, row: 52, col: 12, key: "dataAMRB" },
        { range: "C59:D62", n: 4, row: 60, col: 12, key: "dataApgarFamiliar" },
        { range: "H4:I5", n: 2, row: 5, col: 16, key: "dataPumaScore" },
        { range: "H9:I17", n: 9, row: 10, col: 16, key: "dataRiesgoACV" },
        { range: "H21:I22", n: 2, row: 22, col: 16, key: "dataHasbled" },
        // {range: "", n: 2, row: , col: 7, key: "dataUsca"},
        { range: "H26:I27", n: 2, row: 27, col: 16, key: "dataGAD2" },
        { range: "H31:I34", n: 4, row: 32, col: 16, key: "dataHamilton" },
        { range: "H38:I39", n: 2, row: 39, col: 16, key: "dataWhooley" },
        { range: "H43:I45", n: 2, row: 44, col: 16, key: "dataYesavage" },
        { range: "H49:I51", n: 3, row: 50, col: 16, key: "dataHHIES" },
        // { range: "L55:M58", n: 4, row: 54, col: 21, key: "dataSRQ" },
        // {range: "", n: 2, row: , col: , key: "dataAssist"},
        { range: "H75:I78", n: 4, row: 56, col: 16, key: "dataAudit" },
        { range: "H83:I84", n: 2, row: 63, col: 16, key: "dataRiesgoEPOC" },
        { range: "H88:I89", n: 2, row: 68, col: 16, key: "dataRiesgoCaidas" },
        // { range: "L93:M97", n: 5, row: 92, col: 21, key: "dataRiesgoSocial" },
        { range: "H118:I120", n: 3, row: 73, col: 16, key: "dataZarit" },
        { range: "H124:I125", n: 2, row: 79, col: 16, key: "dataMoca" },
    ]

    const d1 = await getDataTest(miHoja, dataTest);
    const d2 = await getDataDepartamentos(miHoja);
    const d3 = await getDataUsca(miHoja);
    const d4 = await getDataTamizaje(miHoja);
    const d5 = await getDataAssist(miHoja);
    const d6 = await getDataSRQ(miHoja);
    const d7 = await getDataRiesgoSocial(miHoja)
    const d8 = await getContestadas(miHoja);

    return({ ...d1, ...d2, ...d3, ...d4, ...d5, ...d6, ...d7, ...d8 });
}

export { loadData }