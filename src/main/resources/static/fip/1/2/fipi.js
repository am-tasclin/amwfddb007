'use strict'
// fipi: FHIR Info Page Interface
export const fipi = {}, fipiFn = {}

fipiFn.initPageParts = (rawFipiStr, fipi) => {
    fipi.fcwRawArray = rawFipiStr.split(';')
    fipi.json = fipi.fcwRawArray.filter(k => '' != k && !k.includes('pps'))
        .reduce((n, m) => (n[m.split(',')[0]] = m.split(',').slice(1)) && n, {})
    fipi.fcwRawArray.filter(k => k.includes('pps'))
        .reduce((n, m) => fipi.pps = m.split(',').slice(1), 0)
    fipi.pl2 = fipi.fcwRawArray.filter(k => 0 == k.indexOf('p_')).reduce((n, m) =>
        (n[m.split(',')[0].split('p_')[1]] = m.split(',').slice(1).reduce((n2, m2) =>
            (n2[m2] = {}) && n2, {})) && n, {})
    //pps: Page Part Sequence
    !fipi.pps
        && (fipi.pps = Object.keys(fipi.json).filter(n => !n.includes('pps')))
    return fipi
}

console.log(window.location.hash.substring(1))

fipiFn.initPageParts(window.location.hash.substring(1), fipi)

// for SQL IN
fipiFn.getAllAdnIds = () => Object.keys(fipi.json).filter(n => !n.includes('pps'))
    .reduce((n, m) => n.concat(fipi.json[m]), [])
