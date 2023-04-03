'use strict'
export const
    fipi = {},
    fipi2 = {},
    fipiFn = {}

fipiFn.initPageParts = (rawFipiStr, ppId) => {

    // console.log(rawFipiStr, ppId, fipi)
    !rawFipiStr.includes('itjn=') &&
        fipiFn.initFromURI(rawFipiStr, ppId)

    rawFipiStr.includes('itjn=') &&
        fipiFn.initFromJson(rawFipiStr.replace('itjn=', ''), ppId)
}

fipiFn.initFromJson = (jsonStr, ppId) => {
    const json = JSON.parse(decodeURI(jsonStr))
    !fipi.l_ppId && (fipi.l_ppId = [])
    !fipi.l_ppId[json.ppId] && fipi.l_ppId.splice(0, 0, json.ppId)

    !fipi.ppId && json.ppId && (fipi.ppId = {}) && (fipi.ppId[json.ppId] = json)
        && delete json.ppId
}

fipiFn.initFromURI = (rawFipiStr, ppId) => {

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
}

fipi2.FhirInfoPageId = 376617 // [376617] am001fip/CodeSystem/FhirInfoPage title::

// for SQL IN
fipiFn.getAllAdnIds = () => fipi.l_ppId && fipi.l_ppId.reduce((idList, ppId) => fipi.ppId[ppId]
    .l_pp.filter(pp => fipi.ppId[ppId].pp[pp].l_fipId.filter(
        fipId => !idList.includes(fipId) &&
            idList.splice(0, 0, fipId))) && idList, [])

fipiFn.onOffChild = (adnId, ppId, fip, fipId) => {
    const openedObj = fipi.ppId[ppId].pp[fip].fipId[fipId]
    const openedList = (openedObj.opened || (openedObj.opened = []))
    openedList.includes(adnId)
        && openedList.splice(openedList.indexOf(adnId), 1)
        || openedList.push(adnId)

    openedObj.fhirPart[adnId].count++
    openedObj.buildJson.count++

}

fipiFn.isOpenChild = (adnId, ppId, fip, fipId) => fipi.ppId[ppId].pp[fip].fipId
    && fipi.ppId[ppId].pp[fip].fipId[fipId].opened
    && fipi.ppId[ppId].pp[fip].fipId[fipId].opened.includes(adnId)