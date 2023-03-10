'use strict'
// fipi: FHIR Info Page Interface
export const fipi = {}, fipiFn = {}

fipiFn.init1 = rawFipiStr => {
    fipi.fcwRawArray = rawFipiStr.split(';')
    fipi.json = fipi.fcwRawArray.filter(k => '' != k)
        .reduce((n, m) => (n[m.split(',')[0]] = m.split(',').slice(1)) && n, {})
}

fipiFn.init1(window.location.hash.substring(1))
