'use strict'
const { createApp } = Vue
import { mcd, confPP, metalFnConfPP } from '/f/4/lib/metal.js'
import TPageParts from '/f/4/lib/TPageParts.js'

metalFnConfPP.initPageParts(window.location.hash.substring(1), 1)

// symulation mcDB Data, remove by work with real DB
const symulationMcd = () => {
    console.log(confPP, mcd)
    const mcdIdList = [], uniqueList = l => l.reduce((l2, im) =>
        !l2.includes(im) && l2.push(im) && l2, mcdIdList)
    confPP.l_ppId.find(ppId => confPP.ppId[ppId].l_medas.find(medas => {
        uniqueList(confPP.ppId[ppId].medas[medas].l_mcdId)
        confPP.ppId[ppId].medas[medas].ppl2
            && uniqueList(confPP.ppId[ppId].medas[medas].ppl2.l_mcdId)
    }))

    console.log(mcdIdList)
    mcdIdList.forEach(mcdId => mcd.eMap[mcdId] = { doc_id: mcdId, vStr: 'vStringValue' })

}; symulationMcd()

const tPageParts = createApp({ data() { return { count: 0 } }, })
tPageParts.component('t-page-parts', TPageParts)
tPageParts.mount('#tPageParts')

const dev = {
    count: 0, devText: JSON.stringify(confPP, '', 2)
        .replace(/\s+]/g, ']')
        .replace(/\s+}/g, '}')
}
createApp({ data() { return dev }, }).mount('#dev')

