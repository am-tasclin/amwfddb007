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
 * 
 * tMedasDpp
 *  └─ TGridDpp,    MElement
 */
const { createApp } = Vue
import { ws, readMcdIdStr } from '/f/5/lib/wsDbRw.js'
import TGridDpp from '/f/5/libTGridDpp/TGridDpp.js'
import MElement from '/f/5/libTGridDpp/MElement.js'
import { mcd, addToEMap } from '/f/5/lib/MetaContentData.js'
import {
    confDpp, confDppUniqueMcdId, pushListUnique
} from '/f/5/lib/ConfDomPagePart.js'
import {
    metalFnConfPP, minSpaceJson, Okeys,
    dppItyDevComponent, dppItyCtViewJson, dppInteractivity,
} from '/f/5/libTGridDpp/metalTGridDpp.js'


metalFnConfPP.initPagePart(window.location.hash.substring(1), 1)
const uniqueMcdIdList = confDppUniqueMcdId()
console.log(uniqueMcdIdList, mcd)

ws.onopen = event => readMcdIdStr(uniqueMcdIdList).then(json => {
    console.log('← ', json, mcd)
    addToEMap(json.list)
    reView(uniqueMcdIdList)
    readR1R2(uniqueMcdIdList, 'r')
})

const readR1R2 = (uniqueMcdIdList, rName) => {
    const refIds = uniqueMcdIdList.filter(adnId => mcd.eMap[adnId][rName])
        , rList = refIds.reduce((o, adnId) => pushListUnique(o, mcd.eMap[adnId][rName]), [])
        , rvName = rName + '_vl_str'
    rList.length > 0 && readMcdIdStr(rList).then(json => {
        const eMapVlStr = json.list.reduce((o, r) => (o[r.doc_id] = r.vl_str) && o || o, {})
        // console.log('←', rName, eMapVlStr)
        refIds.forEach(adnId => mcd.eMap[adnId][rvName] = eMapVlStr[mcd.eMap[adnId][rName]])
        reView(refIds)
        'r' == rName &&
            readR1R2(uniqueMcdIdList, 'r2')
    })
    rList.length == 0 && 'r' == rName &&
        readR1R2(uniqueMcdIdList, 'r2')
}

const reView = jsonList => jsonList.forEach(adnId => {
    Okeys(dppInteractivity.appComponents
        .meMap[adnId]).forEach(im => dppInteractivity.appComponents.meMap[adnId][im].count++)
    dppInteractivity.appComponents.dev.count++
});

// symulation mcDB Data, remove by work with real DB
//const symulationMcd = 
; true && (() => {
    uniqueMcdIdList.forEach(mcdId => mcd.eMap[mcdId] = { doc_id: mcdId, vl_str: 'vlStringValue' })

    const testParentChild = [100, 1001, 1002, 1003, 1004]
    testParentChild.forEach(mcdId => mcd.eMap[mcdId] = { doc_id: mcdId, vl_str: 'vlStringValue' })
    mcd.parentChild[100] = testParentChild.shift() && testParentChild

})() //; symulationMcd()

createApp({
    data() { return { count: 0, } },
    methods: {
        devText() { return minSpaceJson(confDpp) },
        dppItyCtViewJson() { return minSpaceJson(dppItyCtViewJson()) },
    },
    mounted() { dppItyDevComponent(this) },
}).mount('#dev')

// init App TgridDpp
const tMedasDpp = createApp({ data() { return { count: 0 } }, })
tMedasDpp.component('t-grid-dpp', TGridDpp)
tMedasDpp.component('t-m-element', MElement)
tMedasDpp.mount('#tMedasDpp')

createApp({
    data() { return { hash: window.location.hash.substring(1) } },
}).mount('#headTitle')
