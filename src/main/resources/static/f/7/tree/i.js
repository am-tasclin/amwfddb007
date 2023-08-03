'use strict'
/**
 * Algoritmed ©, Licence EUPL-1.2 or later.
 * 
 */
import { confTree, initDomConfLogic, uniqueIdPageRead } from
    '/f/7/libDomGrid/libDomGrid.js'
initDomConfLogic(window.location.hash.substring(1))
const uniqueIdsForDbRead = uniqueIdPageRead()

import { ws } from '/f/7/libDbRw/wsDbRw.js'
import { readAdnByIds } from '/f/7/libDbRw/libMcRDb.js'
ws.onopen = event =>
    readAdnByIds(uniqueIdsForDbRead)

const { createApp } = Vue
import MElement from
    '/f/7/libDomGrid/MElement.js'
createApp({
    components: { MElement },
    methods: {
        confTree(){return confTree()},
        u_l() { return uniqueIdsForDbRead },
    }, template: `
a1:{{u_l()}}
<div v-for="adnId in confTree()[0]">
    <MElement :adnId="adnId"/>
</div>
`,
}).mount('#treeDom')
