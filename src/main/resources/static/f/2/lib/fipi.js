'use strict'
import { pd } from '/f/2/lib/pd_wsDbC.js'
export const
    fipi = {},// FHIR Info Page Interface
    fipi2 = {},
    fipiFn = {}

//fcw: FHIR Code Word
//fip: FHIR Info Page Parts
fipiFn.fip = {
    fEt: 'Element',
    fTy: 'Terminology',
    fDd: 'Data Dictionary',
    fPl: 'Profile',
    lr: 'Left|Right ::mc', //mc: Midnight Commander
}

fipi2.FhirInfoPageId = 376617 // [376617] am001fip/CodeSystem/FhirInfoPage title::

fipi2.initPP_AfterRead = () => fipi2.fipId.find(adnId => fipi.l_ppId.find(ppId =>
    fipi.ppId[ppId].l_pp.find(pp => fipi.ppId[ppId].pp[pp].l_fipId
        .find(fipId => Object.keys(fipi.ppId[ppId].pp[pp].fipId[fipId]
            .fhirPart).filter(fpId => fpId == adnId).find(fpId => {
                fipi.ppId[ppId].pp[pp].fipId[fipId].fhirPart[fpId].count++
                fipi.ppId[ppId].pp[pp].fipId[fipId].buildJson &&
                    fipi.ppId[ppId].pp[pp].fipId[fipId].buildJson.count++
            })))))

fipiFn.childIdConcat = (pId, cIdL) => cIdL.push(pId) && pd.parentChild[pId] &&
    pd.parentChild[pId].forEach(p2Id => fipiFn.childIdConcat(p2Id, cIdL)) || cIdL

fipiFn.initPageParts = (rawFipiStr, ppId) => {

    // console.log(rawFipiStr, ppId, fipi)
    !rawFipiStr.includes('itjn=') &&
        fipiFn.initFromURI(rawFipiStr, ppId)

    rawFipiStr.includes('itjn=') &&
        fipiFn.initFromJson(rawFipiStr.replace('itjn=', ''), ppId)
}

fipiFn.addPpIdFromJson = (ppId, jsonStr) => {
    const json = JSON.parse(pd.eMap[ppId].value_22)
    !fipi.l_ppId && (fipi.l_ppId = [])
    fipi.l_ppId.push(ppId)
    !fipi.ppId && json.ppId && (fipi.ppId = {}) && (fipi.ppId[ppId] = json)
        && delete json.ppId
}

fipiFn.initFromJson = (jsonStr, ppId) => {
    const json = JSON.parse(decodeURI(jsonStr))
    !fipi.l_ppId && (fipi.l_ppId = [])
    !fipi.l_ppId[json.ppId] && fipi.l_ppId.splice(0, 0, json.ppId)

    !fipi.ppId && json.ppId && (fipi.ppId = {}) && (fipi.ppId[json.ppId] = json)
        && delete json.ppId
}

fipiFn.initFromURI = (rawFipiStr, ppId) => {

    !fipi.l_ppId && (fipi.l_ppId = [])
    fipi.l_ppId.push(ppId)

    !fipi.ppId && (fipi.ppId = {})
    const pl2 = rawFipiStr.split(';').filter(im => 0 == im.indexOf('pl2_'))
        .reduce((o, pl2) =>
            (o[pl2.split(',')[0].split('pl2_')[1]] = pl2.split(',').slice(1)) && o, {})
    console.log(pl2)
    fipi.ppId[ppId] = rawFipiStr.split(';').filter(im => im)
        .filter(im => 0 != im.split(';')[0].indexOf('pl2_')).reduce((o, im) => {
            const pp = im.split(',')[0], fipIdList = im.split(',').slice(1)

            console.log(pp, fipIdList)

            o.l_pp.push(pp) && (o.pp[pp] = {
                l_fipId: fipIdList,
                fipId: fipIdList.reduce((o, fipId) => {
                    const pl2Obj = pl2[pp] && pl2[pp].includes(fipId) &&
                        { buildJsonType: {} } || {}
                    return (o[fipId] = pl2Obj) && o
                }, {}),
            })

            pl2[pp] && 'lr' == pp &&
                (o.pp[pp].pl2 = { l_fipId: pl2[pp], fipId: {} })
                && pl2[pp].reduce((o2, adnId) => {
                    console.log(adnId, o.pp[pp])
                    return (o2[adnId] = {}) && o2
                }, o.pp[pp].pl2.fipId)
            // && console.log(pp, o.pp[pp], fipIdList, pl2[pp])

            return o
        }, { pp: {}, l_pp: [] })

    console.log(fipi.ppId[ppId])
}

// for SQL IN
// from fipi config fipi.ppId.pp.
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

    openedObj.buildJson &&
        openedObj.buildJson.count++
}

fipiFn.isOpenChild = (adnId, ppId, fip, fipId) => fipi.ppId[ppId].pp[fip].fipId
    && fipi.ppId[ppId].pp[fip].fipId[fipId]
    && fipi.ppId[ppId].pp[fip].fipId[fipId].opened
    && fipi.ppId[ppId].pp[fip].fipId[fipId].opened.includes(adnId)
