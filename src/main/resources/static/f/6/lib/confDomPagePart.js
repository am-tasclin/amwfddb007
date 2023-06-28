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
import { addToUniqueList } from '/f/6/lib/algoritmed-commons.js'

export const confDpp = { ppId: {} }

export const confDppId = ppId => confDpp.ppId[ppId || 1]
export const confDppMedas = (ppId, medas, ppl2) => ppl2 != 2
    && confDppId(ppId).medas[medas] || confDppId(ppId).medas[medas].ppl2

export const openChildOnOff = (adnId, ppId, medas, ppl2) => {
    const cgDppMedas = confDppMedas(ppId, medas, ppl2)
    !cgDppMedas.openedId && (cgDppMedas.openedId = [])
    !cgDppMedas.openedId.includes(adnId)
        && cgDppMedas.openedId.push(adnId)
        || cgDppMedas.openedId.splice(cgDppMedas.openedId.indexOf(adnId), 1)
    console.log(confDpp)
}

export const ppMedasPpl2Key = (ppId, medas, ppl2) =>
    '_' + ppId + '_' + medas + '_' + (ppl2 || 1)
// '_' + ppId + '_' + medas + '_' + (ppl2 == 2 && 2 || 1)

export const forEachPpMedas = fn => Okeys(confDpp.ppId)
    .forEach(ppId => Okeys(confDpp.ppId[ppId].medas)
        .forEach(medas => fn(confDpp.ppId[ppId].medas[medas], ppId, medas)))

export const confDppUniqueMcdId = () => {
    const uniqueMcdId = { l: [], openedId: [] }
    Okeys(confDpp.ppId).find(ppId => confDppId(ppId).l_medas.find(medas => {
        addToUniqueList(confDppId(ppId).medas[medas].l_mcdId, uniqueMcdId.l)
        confDpp.ppId[ppId].medas[medas].ppl2
            && addToUniqueList(confDppId(ppId).medas[medas].ppl2.l_mcdId, uniqueMcdId.l)
    }))
    console.log(uniqueMcdId.l.join(','))

    Okeys(confDpp.ppId).forEach(ppId => Okeys(confDpp.ppId[ppId].medas)
        .forEach(medas => confDpp.ppId[ppId].medas[medas].openedId &&
            addToUniqueList(confDpp.ppId[ppId].medas[medas].openedId, uniqueMcdId.l)
        ))

    console.log(uniqueMcdId.l.join(','))

    Okeys(confDpp.ppId).forEach(ppId => Okeys(confDpp.ppId[ppId].medas)
        .forEach(medas => confDpp.ppId[ppId].medas[medas].openedId &&
            addToUniqueList(confDpp.ppId[ppId].medas[medas].openedId, uniqueMcdId.openedId)
        ))

    return uniqueMcdId
}

export const cdppInitPagePart = (rawPpStr, ppId) => {
    confDpp.ppId[ppId] = {}
    !rawPpStr.includes('cj=') && initFromURI(rawPpStr, ppId)
    rawPpStr.includes('cj=') && initFromJson(rawPpStr.replace('cj=', ''), ppId)
}

const initFromJson = (jsonStr, ppId) =>
    confDpp.ppId[ppId] = JSON.parse(decodeURI(jsonStr))

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
                .epl2 = { mcdId: {} }))
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
