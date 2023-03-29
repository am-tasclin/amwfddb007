'use strict'
import { pd } from '/fip/1/1/l1.js'
// fipi: FHIR Info Page Interface
export const fipi = {}, fipiFn = {}

fipiFn.onOffChild = (adnId, ppId, fip, fipId) => {
    const openedObj = fipi.ppId[ppId].pp[fip].fipId[fipId]
    console.log(openedObj)
    const openedList = openedObj.opened
    openedList.includes(adnId)
        && openedList.splice(openedList.indexOf(adnId), 1)
        || openedList.push(adnId)
    openedObj.ctAdntree && openedObj.ctAdntree[adnId] &&
        openedObj.ctAdntree[adnId].count++
    openedObj.buildJson &&
        openedObj.buildJson.count++
}

fipiFn.onOffChild_TODELETE = (adnId, ppId, fip, fipId) => {
    const openedList = fipi.ppsFipi[ppId].opened[fip][fipId]
    openedList.includes(adnId)
        && openedList.splice(openedList.indexOf(adnId), 1)
        || openedList.push(adnId)
    console.log(openedList, openedList.includes(adnId)
        , fipiFn.isOpenChild(adnId, ppId, fip, fipId))
}

fipiFn.isOpenChild = (adnId, ppId, fip, fipId) => {
    // console.log(ppId, fip, fipId
    //     , fipi.ppId[ppId]
    //     , fipi.ppId[ppId].pp[fip]
    //     , fipi.ppId[ppId].pp[fip].fipId
    // )

    return fipi.ppId[ppId].pp[fip].fipId
        && fipi.ppId[ppId].pp[fip].fipId[fipId].opened
        && fipi.ppId[ppId].pp[fip].fipId[fipId].opened.includes(adnId)
    // const openedList = fipi.ppId[ppId].pp[fip].fipId[fipId]
    // return openedList.opened && openedList.opened.includes(adnId)
}

fipiFn.isOpenChild_TODELETE = (adnId, ppId, fip, fipId) => {
    const openedList = fipi.ppsFipi[ppId].opened &&
        fipi.ppsFipi[ppId].opened[fip] &&
        fipi.ppsFipi[ppId].opened[fip][fipId]
    return openedList && fipi.ppsFipi[ppId].opened[fip][fipId].includes(adnId)
}

fipiFn.initPageParts = (rawFipiStr, fipi) => {

    rawFipiStr.includes('itjn=') &&
        fipiFn.initFromJson(rawFipiStr.replace('itjn=', ''), fipi)
    !rawFipiStr.includes('itjn=') &&
        fipiFn.initFromURI(rawFipiStr, 1)
    // fipiFn.initFromURI(rawFipiStr, fipi)

    return fipi
}

fipiFn.initFromJson2 = fipi => {
    console.log(fipi.ppId, 123)
    fipi.ppsFipi && !fipi.ppId &&
        Object.keys(fipi.ppsFipi).reduce((o, ppId) =>
            (o.l_ppId.push(ppId)) &&
            (o.ppId[ppId] = Object.keys(fipi.ppsFipi[ppId].json).reduce((o2, pp) =>
                (o2.l_pp.push(pp)) &&
                (o2.pp[pp] = fipi.ppsFipi[ppId].json[pp].reduce((o3, fipId) =>
                    (o3.l_fipId.push(fipId)) &&
                    (o3.fipId[fipId] = {}) &&
                    (fipi.ppsFipi[ppId].pl2[pp] && fipi.ppsFipi[ppId].pl2[pp][fipId] &&
                        (o3.fipId[fipId].buildJsonType = fipi.ppsFipi[ppId].pl2[pp][fipId]
                            .buildJsonType) || true) &&
                    (fipi.ppsFipi[ppId].opened && fipi.ppsFipi[ppId].opened[pp] && fipi.ppsFipi[ppId].opened[pp][fipId] &&
                        (o3.fipId[fipId].opened = fipi.ppsFipi[ppId].opened[pp][fipId]) || true) &&
                    o3, { fipId: {}, l_fipId: [] })) &&
                o2, { pp: {}, l_pp: [] })) &&
            o, (fipi.ppId = {}) && (fipi.l_ppId = []) && fipi)
}

fipiFn.initFromJson = (jsonStr, fipi) => {
    const json = JSON.parse(decodeURI(jsonStr))
    !fipi.l_ppId && (fipi.l_ppId = [])
    !fipi.l_ppId[json.ppId] && fipi.l_ppId.splice(0, 0, json.ppId)

    !fipi.ppId && json.ppId && (fipi.ppId = {}) && (fipi.ppId[json.ppId] = json)
        && delete json.ppId
    console.log(fipi)
    fipi.opened = json.opened
    fipi.pl2 = json.pl2
    fipi.json = json.json
    fipi.json && (fipi.pps = Object.keys(fipi.json)
        .filter(n => !n.includes('pps'))
        .filter(k => !k.includes('pl2_')))
}

fipiFn.initFromURI = (rawFipiStr, ppId) => {
    // const json = rawFipiStr.split(';').filter(k => '' != k && !k.includes('pps') && !k.includes('pl2_'))
    //     .reduce((n, m) => (n[m.split(',')[0]] = m.split(',').slice(1)) && n, {})

    // console.log(json)
    // console.log(Object.keys(json).filter(n => !n.includes('pps'))
    //     .reduce((n, m) => n.concat(json[m]), []))

    !fipi.l_ppId && (fipi.l_ppId = []) && fipi.l_ppId.push(ppId)
    !fipi.ppId && (fipi.ppId = {})
    const pl2 = rawFipiStr.split(';').filter(im => 0 == im.indexOf('pl2_'))
        .reduce((o, pl2) =>
            (o[pl2.split(',')[0].split('pl2_')[1]] = pl2.split(',').slice(1)) && o, {})
    fipi.ppId[ppId] = rawFipiStr.split(';').filter(im => im)
        .filter(im => 0 != im.split(';')[0].indexOf('pl2_')).reduce((o, im) => {
            const pp = im.split(',')[0], fipIdList = im.split(',').slice(1)
            return o.l_pp.push(pp) && (o.pp[pp] = {
                fipId: fipIdList.reduce((o, fipId) => {
                    const pl2Obj = pl2[pp] && pl2[pp].includes(fipId) &&
                        { buildJsonType: {} } || {}
                    return (o[fipId] = pl2Obj) && o
                }, {}), l_fipId: fipIdList,
            }) && o
        }, { pp: {}, l_pp: [] })

    // const idList = fipi.l_ppId.reduce((idList, ppId) => fipi.ppId[ppId]
    //     .l_pp.filter(pp => fipi.ppId[ppId].pp[pp].l_fipId.filter(
    //         fipId => !idList.includes(fipId) &&
    //             idList.splice(0, 0, fipId))) && idList, [])
    // console.log(idList)

}

fipiFn.initFromURI_TODELETE = (rawFipiStr, fipi) => {
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
    return fipi
}

// console.log(window.location.hash.substring(1))
fipiFn.initPageParts(window.location.hash.substring(1), fipi)

// for SQL IN
fipiFn.getAllAdnIds = () => fipi.l_ppId && fipi.l_ppId.reduce((idList, ppId) => fipi.ppId[ppId]
    .l_pp.filter(pp => fipi.ppId[ppId].pp[pp].l_fipId.filter(
        fipId => !idList.includes(fipId) &&
            idList.splice(0, 0, fipId))) && idList, [])

// fipiFn.getAllAdnIds = () => Object.keys(fipi.json).filter(n => !n.includes('pps'))
//     .reduce((n, m) => n.concat(fipi.json[m]), [])

fipi.FhirInfoPageId = 376617 // [376617] am001fip/CodeSystem/FhirInfoPage title::

fipiFn.fipList = () => {
    const fipList = pd.parentChild[fipi.FhirInfoPageId]
    fipi.fipList = fipList.concat(fipList
        .reduce((n, m) => Object.assign(n, pd.parentChild[m]), []))
}

fipiFn.ppsFipi = (fipi) => {
    !fipi.fipList && fipiFn.fipList()
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
    return fipi
}
