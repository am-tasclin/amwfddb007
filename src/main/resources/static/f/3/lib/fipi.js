'use strict'
import { pd } from '/f/3/lib/pd_wsDbC.js'
export const
    fipi = {},// FHIR Info Page Interface
    fipi2 = {},
    fipiFn = {}

// for SQL IN
// from fipi config fipi.ppId.pp.
fipiFn.getAllAdnIds = () => fipi.l_ppId && fipi.l_ppId.reduce((idList, ppId) => fipi.ppId[ppId]
    .l_pp.filter(pp => fipi.ppId[ppId].pp[pp].l_fipId.filter(
        fipId => !idList.includes(fipId) &&
            idList.splice(0, 0, fipId))) && idList, [])

fipiFn.initPPBlock = () => {
    const fipiList = Object.keys(pd.eMap)
        .filter(adnId => pd.eMap[pd.eMap[adnId].reference])
        .filter(adnId => adnId != fipi2.FhirInfoPageJsonId)

    fipiList.filter(adnId => pd.eMap[adnId].reference != fipi2.FhirInfoPageJsonId)
        .forEach(adnId => fipiFn.initFromURI(pd.eMap[adnId].value_22, adnId))
}

fipiFn.initPageParts = (rawFipiStr, ppId) => {
    // console.log(rawFipiStr, ppId)

    !rawFipiStr.includes('itjn=')
    !rawFipiStr.includes('cj=')
        && fipiFn.initFromURI(rawFipiStr, ppId)

    rawFipiStr.includes('cj=') &&
        fipiFn.initFromJson(rawFipiStr.replace('cj=', ''), ppId)
}

fipiFn.initFromJson = (jsonStr, ppId) => {
    const json = JSON.parse(decodeURI(jsonStr))
    console.log(json.forPpId)
    !fipi.l_ppId && (fipi.l_ppId = [])
    !fipi.l_ppId[json.forPpId] && fipi.l_ppId.splice(0, 0, json.forPpId)

    !fipi.ppId && json.forPpId && (fipi.ppId = {})
        && (fipi.ppId[json.forPpId] = json)
        && delete json.forPpId
}


fipiFn.initFromURI = (rawFipiStr, ppId) => {
    !fipi.l_ppId && (fipi.l_ppId = []); fipi.l_ppId.push(ppId)
    !fipi.ppId && (fipi.ppId = {})

    const rawFipi = rawFipiStr.split(';')
        , pl2 = rawFipi.filter(im => im.includes('_')).reduce((o, im) => {
            const a2 = im.split(',')[0].split('_'), fipIdList = im.split(',').slice(1)
            o[a2[0]] = {}
            o[a2[0]][a2[1]] = { l_fipId: fipIdList }
            o[a2[0]][a2[1]].fipId = fipIdList.reduce((o, im) => (o[im] = {}) && o, {})
            return o
        }, {})

    fipi.ppId[ppId] = rawFipi.filter(im => im && !im.includes('_')).reduce((o, im) => {
        const pp = im.split(',')[0], fipIdList = im.split(',').slice(1)
        o.l_pp.push(pp)
        o.pp[pp] = { l_fipId: fipIdList }
        o.pp[pp].fipId = fipIdList.reduce((o2, im2) => (o2[im2] = {}) && o2, {})
        Object.assign(o.pp[pp], pl2[pp])
        return o
    }, { pp: {}, l_pp: [] })

    // console.log(ppId, fipi.ppId[ppId])
}

fipiFn.fip = {
    fEt: 'Element',
    fTy: 'Terminology',
    fDd: 'Data Dictionary',
    fPl: 'Profile',
    lr: 'Left|Right ::mc', //mc: Midnight Commander
}

fipi2.FhirInfoPageId = 376617 // [376617] am001fip/CodeSystem/FhirInfoPage title::
fipi2.FhirInfoPageJsonId = 376631 // [376631] json FIP: (r:376618) 

fipi2.viewAdnAfterRead = () => {
    // console.log(fipi)
    fipi.l_ppId.find(ppId => fipi.ppId[ppId].l_pp.find(pp => {
        fipi.ppId[ppId].pp[pp].l_fipId.find(adnId =>
            fipi.ppId[ppId].pp[pp].fipId[adnId].fhirPart[adnId].count++)
        fipi.ppId[ppId].pp[pp].ppl2 &&
            fipi.ppId[ppId].pp[pp].ppl2.l_fipId.find(adnId =>
                fipi.ppId[ppId].pp[pp].ppl2.fipId[adnId].fhirPart[adnId].count++)
    }))
}

fipiFn.childIdConcat = (pId, cIdL) => cIdL.push(pId) && pd.parentChild[pId] &&
    pd.parentChild[pId].forEach(p2Id => fipiFn.childIdConcat(p2Id, cIdL)) || cIdL

fipiFn.pps = ppId => fipi.ppId && fipi.ppId[ppId]
    && fipi.ppId[ppId].l_pp || []


fipiFn.headTitle = () => window.location.hash.includes('#cj=')
    && (window.location.hash.substring(1).length + 'configJson')
    || window.location.hash.substring(1)

fipiFn.headTitleApp = createApp =>
    createApp({ data() { return { hash: fipiFn.headTitle() } }, })
        .mount('#headTitle')
