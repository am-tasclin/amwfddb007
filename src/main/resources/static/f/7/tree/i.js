'use strict'
/**
 * Algoritmed ©, Licence EUPL-1.2 or later.
 * 
 * 
 */
const { createApp } = Vue
import { initDomConfLogic, uniqueIdPageRead} from '/f/7/libDomGrid/libDomGrid.js'
initDomConfLogic(window.location.hash.substring(1))
const uniqueIdsForDbRead = uniqueIdPageRead()
console.log(uniqueIdsForDbRead)

createApp({
    template: `
a1
`,
}).mount('#treeDom')