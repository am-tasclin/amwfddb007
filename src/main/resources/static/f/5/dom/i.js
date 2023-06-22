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
import { wsDbRw } from '/f/5/lib/wsDbRw.js'
import TGridDpp from '/f/5/libTGridDpp/TGridDpp.js'
import MElement from '/f/5/libTGridDpp/MElement.js'
import { mcd } from '/f/5/lib/MetaContentData.js'
import { confDpp, confDppUniqueMcdId } from '/f/5/lib/ConfDomPagePart.js'
import {
    metalFnConfPP, minSpaceJson, dppItyDevComponent, dppItyCtViewJson,
    dppInteractivity, Okeys
} from '/f/5/libTGridDpp/metalTGridDpp.js'


console.log(mcd,)

metalFnConfPP.initPagePart(window.location.hash.substring(1), 1)
const uniqueMcdIdList = confDppUniqueMcdId()
wsDbRw.ws.onopen = event => wsDbRw.readMcdId(event, uniqueMcdIdList).then(event => {
    const json = JSON.parse(event.data)
    console.log('←', json, mcd)
    console.log(dppInteractivity.appComponents.meMap)
    json.list.forEach(adn => mcd.eMap[adn.doc_id] = adn)
    json.list//.filter(adn => adn.vl_str)
    .forEach(adn => Okeys(dppInteractivity.appComponents
        .meMap[adn.doc_id])
        .forEach(im => dppInteractivity.appComponents.meMap[adn.doc_id][im].count++))
})


    // symulation mcDB Data, remove by work with real DB
    //const symulationMcd = 
    ; (() => {
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
