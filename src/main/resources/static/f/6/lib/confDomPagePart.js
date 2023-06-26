'use strict'
/**
 * Algoritmed ©, EUPL-1.2 or later.
 * MCD, mcd -- Meta Content Data
 * MEDAS, medas -- MEtal DAta Structure. Build from MCD.
 * DOM -- Data & Ontology editor & Meta data modeler
 * PP, pp -- Page Part. Block of MCD or MEDAS in Application Development Page.
 * 
 * confDpp, cdpp -- Config JSON for MEDAS to initialise & include in application.
 */
export const confDpp = { ppId: {} }

export const confDppId = ppId => confDpp.ppId[ppId || 1]
export const confDppUniqueMcdId = () => {
    const uniqueMcdIdList = []
    Okeys(confDpp.ppId).find(ppId => confDppId(ppId).l_medas.find(medas => {
        addToUniqueList(confDppId(ppId).medas[medas].l_mcdId, uniqueMcdIdList)
        confDpp.ppId[ppId].medas[medas].ppl2
            && addToUniqueList(confDppId(ppId).medas[medas].ppl2.l_mcdId, uniqueMcdIdList)
    }))
    return uniqueMcdIdList
}
const addToUniqueList = (lFrom, lTo) => lFrom.reduce((lTo2, im) => pushListUnique(lTo2, im), lTo)
export const pushListUnique = (lTo, vl) => !lTo.includes(vl) && lTo.push(vl) && lTo || lTo

export const cdppInitPagePart = (rawPpStr, ppId) => {
    confDpp.ppId[ppId] = {}
    !rawPpStr.includes('cj=') && initFromURI(rawPpStr, ppId)
    rawPpStr.includes('cj=') && metalFnConfPP.initFromJson(rawPpStr.replace('cj=', ''), ppId)
}

const initFromURI = (rawPpStr, ppId) => {
    console.log(rawPpStr, ppId, confDpp)
    const rawPp = rawPpStr.split(';')
        , confPpId = (confDpp.ppId[ppId] = { l_medas: [], medas: {}, })

    rawPp.filter(im => im.length != 0)
        .filter(im => !im.split(',')[0].includes('_'))// is not panel2
        .reduce((o, im) => o.l_medas.push(im.split(',')[0])
            && (confPpId.medas[im.split(',')[0]] = initMedas(im.split(',').slice(1)))
            && o, confPpId)

    rawPp.filter(im => im.split(',')[0].includes('_')) // is ppl2
        .filter(im => 'ppl2' == im.split(',')[0].split('_')[1])
        .forEach(im => confPpId.medas[im.split(',')[0].split('_')[0]]
            .ppl2 = initMedas(im.split(',').slice(1)))

    rawPp.filter(im => im.split(',')[0].includes('_')) // is epl2
        .filter(im => 'epl2' == im.split(',')[0].split('_')[1])
        .forEach(im => im.split(',').slice(1).reduce((o, mcdId) =>
            (o.mcdId[mcdId] = {}) && o, confPpId.medas[im.split(',')[0].split('_')[0]]
                .epl2 = { mcdId: {} }))
}

const initMedas = idList => idList.reduce((o, mcdId) =>
    o.l_mcdId.push(mcdId) && (o.mcdId[mcdId] = {}) && o, { l_mcdId: [], mcdId: {}, })

const Okeys = Object.keys
