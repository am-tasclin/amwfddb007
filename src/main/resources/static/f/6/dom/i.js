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
import { cdppInitPagePart, confDppUniqueMcdId } from '/f/6/lib/confDomPagePart.js'
import { ws, readDppFromList } from '/f/6/lib/wsDbRw.js'

cdppInitPagePart(window.location.hash.substring(1), 1)
const uniqueMcdIdList = confDppUniqueMcdId()
console.log(uniqueMcdIdList)

ws.onopen = event => readDppFromList(uniqueMcdIdList, () => {
    console.log('end init read')
})

// init App TgridDpp
import TGridDpp from '/f/6/libTGridDpp/TGridDpp.js'
const tMedasDpp = createApp({})
tMedasDpp.component('t-grid-dpp', TGridDpp)
tMedasDpp.mount('#tMedasDpp')

//dev part
import DevConfDppIty from '/f/6/dev/lib/DevConfDppIty.js'
const appDev = createApp({})
appDev.component('t-dev-conf-dpp-ity', DevConfDppIty)
appDev.mount('#dev')
