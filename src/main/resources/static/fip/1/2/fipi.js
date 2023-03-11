'use strict'
// fipi: FHIR Info Page Interface
export const fipi = {}, fipiFn = {}

fipiFn.init1 = rawFipiStr => {
    fipi.fcwRawArray = rawFipiStr.split(';')
    fipi.json = fipi.fcwRawArray.filter(k => '' != k && !k.includes('pps'))
        .reduce((n, m) => (n[m.split(',')[0]] = m.split(',').slice(1)) && n, {})
    fipi.fcwRawArray.filter(k => k.includes('pps')).reduce((n
        , m) => fipi.pps = m.split(',').slice(1), 0)
    //pps: Page Part Sequence
    !fipi.pps
        && (fipi.pps = Object.keys(fipi.json).filter(n => !n.includes('pps')))
}

fipiFn.init1(window.location.hash.substring(1))

// for SQL IN
fipiFn.getAllAdnIds = () => Object.keys(fipi.json).filter(n => !n.includes('pps'))
    .reduce((n, m) => n.concat(fipi.json[m]), [])
