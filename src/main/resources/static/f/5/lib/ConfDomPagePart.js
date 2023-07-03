'use strict'
/**
 * Algoritmed ©, Licence EUPL-1.2 or later.
 * MCD, mcd -- Meta Content Data
 * MEDAS, medas -- MEtal DAta Structure. Build from MCD.
 * DOM -- Data & Ontology editor & Meta data modeler
 * PP, pp -- Page Part. Block of MCD or MEDAS in Application Development Page.
 * 
 * confDpp -- Config JSON for MEDAS to initialise & include in application.
 */
import {
    reViewSortMCData2p, dppInteractivityPpId
} from '/f/5/libTGridDpp/metalTGridDpp.js'

export const confDpp = {}

export const confDppId = ppId => confDpp.ppId[ppId || 1]
export const confDppMedasEpl2 = (ppId, medas, mcdId) =>
    confDppId(ppId).medas[medas].epl2.mcdId[mcdId]

export const ppMedasKey = (ppId, medas, ppl2) => '_' + ppId + '_' + medas + '_' + (ppl2 == 2 && 2 || 1)

export const pushListUnique = (lTo, vl) => !lTo.includes(vl) && lTo.push(vl) && lTo || lTo
const addToUniqueList = (lFrom, lTo) => lFrom.reduce((lTo2, im) => pushListUnique(lTo2, im), lTo)
export const confDppUniqueMcdId = () => {
    const uniqueMcdIdList = []
    confDpp.l_ppId.find(ppId => confDppId(ppId).l_medas.find(medas => {
        addToUniqueList(confDppId(ppId).medas[medas].l_mcdId, uniqueMcdIdList)
        confDpp.ppId[ppId].medas[medas].ppl2
            && addToUniqueList(confDppId(ppId).medas[medas].ppl2.l_mcdId, uniqueMcdIdList)
    }))
    return uniqueMcdIdList
}

export const confDppMedas = (ppId, medas, ppl2) => ppl2 != 2
    && confDppId(ppId).medas[medas] || confDppId(ppId).medas[medas].ppl2

// Config for Dpp to include and use in other grid.
export const confDppMedasMcdId = (val, ppId, medas, ppl2) => {
    const valList = val.replace(/\s+/g, '').split(',').filter(im => im)
        , dppMedas = ppl2 != 2
            && confDpp.ppId[ppId].medas[medas]
            || confDpp.ppId[ppId].medas[medas].ppl2
            || (confDpp.ppId[ppId].medas[medas].ppl2 = { l_mcdId: [], mcdId: {} })
    valList.filter(mcdId => !dppMedas.mcdId[mcdId])
        .forEach(mcdId => dppMedas.mcdId[mcdId] = {})
    dppMedas.l_mcdId = valList
    reViewSortMCData2p(ppId, medas)
    dppInteractivityPpId(ppId).tGridDpp.count++
}

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
