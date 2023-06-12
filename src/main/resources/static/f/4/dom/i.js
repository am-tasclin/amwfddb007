'use strict'
/**
 * Algoritmed ©, EUPL-1.2 or later.
 * MCD, mcd -- Meta Content Data
 * MEDAS, medas -- MEtal DAta Structure. Build from MCD.
 * DOM -- Data & Ontology editor & Meta-data modeler
 * PP, pp -- Page Part. Block of MCD or MEDAS in Application Development Page.
 * tGridDpp -- Grid DOM Page Part
 * 
 * tMedasDpp -- MEDAS DOM Page Part
 */
const { createApp } = Vue
import { mcd, confPP, metalFnConfPP } from '/f/4/lib/metal.js'
import TGridDpp from '/f/4/lib/TGridDpp.js'

metalFnConfPP.initPagePart(window.location.hash.substring(1), 1)

// symulation mcDB Data, remove by work with real DB
const symulationMcd = () => {
    // console.log(confPP, mcd)
    const mcdIdList = [], uniqueList = l => l.reduce((l2, im) =>
        !l2.includes(im) && l2.push(im) && l2, mcdIdList)
    confPP.l_ppId.find(ppId => confPP.ppId[ppId].l_medas.find(medas => {
        uniqueList(confPP.ppId[ppId].medas[medas].l_mcdId)
        confPP.ppId[ppId].medas[medas].ppl2
            && uniqueList(confPP.ppId[ppId].medas[medas].ppl2.l_mcdId)
    }))

    console.log(mcdIdList)
    mcdIdList.forEach(mcdId => mcd.eMap[mcdId] = { doc_id: mcdId, vlStr: 'vlStringValue' })

}; symulationMcd()

const tMedasDpp = createApp({ data() { return { count: 0 } }, })
tMedasDpp.component('t-grid-dpp', TGridDpp)
tMedasDpp.mount('#tMedasDpp')

const dev = {
    count: 0, devText: JSON.stringify(confPP, '', 2)
        .replace(/\s+]/g, ']')
        .replace(/\s+}/g, '}')
}
createApp({ data() { return dev }, }).mount('#dev')

