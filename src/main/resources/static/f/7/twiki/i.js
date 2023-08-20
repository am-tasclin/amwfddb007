'use strict'
/**
 * Algoritmed ©, Licence EUPL-1.2 or later.
 * 
 */
import { initDomConfLogic } from '/f/7/libDomGrid/libDomGrid.js'
initDomConfLogic(window.location.hash.substring(1))

const { createApp } = Vue
createApp({
    data() { return { count: 0, } },
    methods: {
    }, template: `
    <h3> Hi Edit</h3>
a12
`,
}).mount('#actuallyEdit')
