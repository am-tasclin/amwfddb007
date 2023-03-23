'use strict'
import { pd } from '/fip/1/1/l1.js'
// fipi: FHIR Info Page Interface
export const fipi = {}, fipiFn = {}

fipiFn.initPageParts = (rawFipiStr, fipi) => {

    console.log(rawFipiStr.includes('itjn='))

    rawFipiStr.includes('itjn=') &&
        fipiFn.initFromJson(rawFipiStr.replace('itjn=', ''))
    !rawFipiStr.includes('itjn=') &&
        fipiFn.initFromURI(rawFipiStr)

    console.log(fipi)
    return fipi
}

fipiFn.initFromJson = jsonStr => {
    const json = JSON.parse(decodeURI(jsonStr))
    console.log(json)
    console.log(json.json)
    fipi.json = json.json
    fipi.pl2 = json.pl2
    fipi.pps = Object.keys(fipi.json)
        .filter(n => !n.includes('pps'))
        .filter(k => !k.includes('pl2_'))
}

fipiFn.initFromURI = rawFipiStr => {
    fipi.fcwRawArray = rawFipiStr.split(';')
    fipi.json = fipi.fcwRawArray.filter(k => '' != k && !k.includes('pps') && !k.includes('pl2_'))
        .reduce((n, m) => (n[m.split(',')[0]] = m.split(',').slice(1)) && n, {})
    fipi.fcwRawArray.filter(k => k.includes('pps'))
        .reduce((n, m) => fipi.pps = m.split(',').slice(1), 0)
    fipi.pl2 = fipi.fcwRawArray.filter(k => 0 == k.indexOf('pl2_')).reduce((n, m) =>
        (n[m.split(',')[0].split('pl2_')[1]] = m.split(',').slice(1).reduce((n2, m2) =>
            (n2[m2] = {}) && n2, {})) && n, {})
    //pps: Page Part Sequence
    fipi.pps = Object.keys(fipi.json)
        .filter(n => !n.includes('pps'))
        .filter(k => !k.includes('pl2_'))
}

// console.log(window.location.hash.substring(1))
fipiFn.initPageParts(window.location.hash.substring(1), fipi)

// for SQL IN
fipiFn.getAllAdnIds = () => Object.keys(fipi.json).filter(n => !n.includes('pps'))
    .reduce((n, m) => n.concat(fipi.json[m]), [])

fipi.FhirInfoPageId = 376617 // [376617] am001fip/CodeSystem/FhirInfoPage title::

fipiFn.fipList = () => {
    const fipList = pd.parentChild[fipi.FhirInfoPageId]
    fipi.fipList = fipList.concat(fipList
        .reduce((n, m) => Object.assign(n, pd.parentChild[m]), []))
}

fipiFn.ppsFipi = () => {
    console.log(fipi.fipList)
    fipi.ppsFipi = Object.keys(pd.eMap).filter(k => fipi.fipList.includes(pd.eMap[k].reference))
        .reduce((n, m) => {
            'FIP' == pd.eMap[m].r_value_22
                && (n[m] = fipiFn.initPageParts(pd.eMap[m].value_22, {}))
                || (n[m] = fipiFn.initPageParts(pd.eMap[m].r_value_22 + ',' + pd.eMap[m].value_22, {}))
            n[m].inList = Object.keys(n[m].json)
                .reduce((n2, m2) => n2.concat(n[m].json[m2]), [])
            return n
        }, {})
    fipi.inList = Object.keys(fipi.ppsFipi)
        .reduce((n, m) => n.concat(fipi.ppsFipi[m].inList), [])

    console.log(fipi)
}
