'use strict'
/**
 * Algoritmed ©, Licence EUPL-1.2 or later.
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
import { ws, readDppFromList, readOpenedParent } from '/f/6/lib/wsDbRw.js'
import { reViewMeMap, reViewMeMapOpened } from '/f/6/libTGridDpp/MElement.js'

cdppInitPagePart(window.location.hash.substring(1), 1)
const uniqueMcdId = confDppUniqueMcdId()

ws.onopen = event => uniqueMcdId.l.length &&
    readDppFromList(uniqueMcdId.l, () => {
        reViewMeMap(uniqueMcdId.l)
        readOpenedParent(uniqueMcdId.openedId, reViewMeMapOpened)
    })

// init App TgridDpp
import TGridDpp from '/f/6/libTGridDpp/TGridDpp.js'
const tMedasDpp = createApp({ template: `<TGridDpp ppId="1" />`, components: { TGridDpp }, })
import MElement from '/f/6/libTGridDpp/MElement.js'
tMedasDpp.component('t-m-element', MElement)
tMedasDpp.mount('#tMedasDpp')

import DbMessagePool from '/f/6/lib/DbMessagePool.js'
createApp({ template: `<DbMessagePool/>`, components: { DbMessagePool }, })
    .mount('#dbMessagePool')

//dev part
import DevConfDppIty from '/f/6/dev/lib/DevConfDppIty.js'
createApp({ template: `<DevConfDppIty />`, components: { DevConfDppIty }, })
    .mount('#dev')

const Okeys = Object.keys
