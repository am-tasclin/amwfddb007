'use strict'
/**
 * Algoritmed ©, Licence EUPL-1.2 or later.
 * MCD, mcd -- Meta Content Data
 * MEDAS, medas -- MEtal DAta Structure. Build from MCD.
 * DOM -- Data & Ontology editor & Meta data modeler
 * PP, pp -- Page Part. Block of MCD or MEDAS in Application Development Page.
 * 
 * confDpp, cdpp -- Config JSON for MEDAS to initialise & include in application.
 */
import { addToUniqueList } from '/f/6/lib/algoritmed-commons.js'
// import { setOpenedDropDownId } from '/f/6/libTGridDpp/dppInteractivity.js'

export const l_domType = [376618, 376631]

export const confDpp = { ppId: {} }
export const confDppId = ppId => confDpp.ppId[ppId || 1]
export const confDppMedasEpl2 = (ppId, medas, mcdId) =>
    confDppId(ppId).medas[medas].epl2.mcdId[mcdId]
export const confDppMedas = (ppId, medas, ppl2) => ppl2 == 2
    && confDppId(ppId).medas[medas].ppl2 || confDppId(ppId).medas[medas]

export const openChildOnOff = (adnId, ppId, medas, ppl2) => {
    const cgDppMedas = confDppMedas(ppId, medas, ppl2)
    !cgDppMedas.openedId && (cgDppMedas.openedId = [])
    !cgDppMedas.openedId.includes(adnId)
        && cgDppMedas.openedId.push(adnId)
        || cgDppMedas.openedId.splice(cgDppMedas.openedId.indexOf(adnId), 1)
    console.log(confDpp)
}

export const ppIdMedasPpl2Key = (ppId, medas, ppl2) =>
    '_' + ppId + '_' + medas + '_' + (ppl2 || 1)

export const forEachPpMedas = fn => Okeys(confDpp.ppId)
    .forEach(ppId => Okeys(confDpp.ppId[ppId].medas)
        .forEach(medas => fn(confDpp.ppId[ppId].medas[medas], ppId, medas)))

export const confDppUniqueMcdId = () => {
    const uniqueMcdId = { l: [], openedId: [] }
    console.log(confDpp)

    forEachPpMedas(ppMedas => {
        addToUniqueList(ppMedas.l_mcdId, uniqueMcdId.l)
        ppMedas.ppl2 && addToUniqueList(ppMedas.ppl2.l_mcdId, uniqueMcdId.l)
    })

    console.log(uniqueMcdId.l.join(','))

    forEachPpMedas(ppMedas => [uniqueMcdId.l, uniqueMcdId.openedId].forEach(l => {
        ppMedas.openedId && addToUniqueList(ppMedas.openedId, l)
        ppMedas.ppl2 && ppMedas.ppl2.openedId && addToUniqueList(ppMedas.ppl2.openedId, l)
    }))
    uniqueMcdId.l = uniqueMcdId.l.filter(im => im)

    console.log(uniqueMcdId.l.join(','))

    return uniqueMcdId
}

export const cdppInitPagePart = (rawPpStr, ppId) => {
    confDpp.ppId[ppId] = {}
    !rawPpStr.includes('cj=') && initFromURI(rawPpStr, ppId)
    rawPpStr.includes('cj=') && initFromJson(rawPpStr.replace('cj=', ''), ppId)
}

const initFromJson = (jsonStr, ppId) => {
    const confDomPpId = confDpp.ppId[ppId] = JSON.parse(decodeURI(jsonStr))
    console.log(confDomPpId)
    // confDomPpId.ffDppEd && setOpenedDropDownId('confDppEd_')

    confDomPpId.l_medas.filter(medas => confMedasEpl2.includes(medas))
        .filter(medas => !confDomPpId.medas[medas].epl2)
        .forEach(medas => confDomPpId.medas[medas].epl2 = { mcdId: {} })

}

const initFromURI = (rawPpStr, ppId) => {
    // console.log(rawPpStr, ppId, confDpp)
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
                .epl2 = { mcdId: {}, l_mcdId: [] }))
}

const initMedas = idList => idList.reduce((o, mcdId) =>
    o.l_mcdId.push(mcdId) && (o.mcdId[mcdId] = {}) && o, { l_mcdId: [], mcdId: {}, })

const confMedas = {
    medas: {
        lr: 'Left|Right ::mc', //mc: Midnight Commander
        mcDd: 'Data Dictionary',
        mcEt: 'Element',
        mcPl: 'Profile',
    }, panel2: {
        epl2: ['mcEt', 'mcPl']
    }
}
export const confMedasDd = confMedas.medas
export const confMedasEpl2 = confMedas.panel2.epl2

const Okeys = Object.keys
