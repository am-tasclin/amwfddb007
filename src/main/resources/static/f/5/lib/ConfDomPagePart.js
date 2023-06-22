'use strict'
/**
 * Algoritmed ©, EUPL-1.2 or later.
 * MCD, mcd -- Meta Content Data
 * MEDAS, medas -- MEtal DAta Structure. Build from MCD.
 * DOM -- Data & Ontology editor & Meta data modeler
 * PP, pp -- Page Part. Block of MCD or MEDAS in Application Development Page.
 * 
 */
export const confDpp = {}
console.log(confDpp)
export const confDppId = ppId => confDpp.ppId[ppId || 1]
export const confDppMedasEpl2 = (ppId, medas, mcdId) =>
    confDppId(ppId).medas[medas].epl2.mcdId[mcdId]

export const confDppUniqueMcdId = () => {
    const uniqueMcdIdList = [], uniqueList = l => l.reduce((l2, im) =>
        !l2.includes(im) && l2.push(im) && l2, uniqueMcdIdList)
    confDpp.l_ppId.find(ppId => confDppId(ppId).l_medas.find(medas => {
        uniqueList(confDppId(ppId).medas[medas].l_mcdId)
        confDpp.ppId[ppId].medas[medas].ppl2
            && uniqueList(confDppId(ppId).medas[medas].ppl2.l_mcdId)
    }))
    return uniqueMcdIdList
}

export const confDppMedas = (ppId, medas, isPpl2) => !isPpl2
    && confDppId(ppId).medas[medas] || confDppId(ppId).medas[medas].ppl2

// Config for Dpp to include and use in other grid.
export const confDppMedasMcdId = (val, ppId, medas, isPpl2) => {
    const valList = val.replace(/\s+/g, '').split(',').filter(im => im)
        , dppMedas = !isPpl2
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
