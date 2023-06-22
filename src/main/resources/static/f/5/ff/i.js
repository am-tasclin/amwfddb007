'use strict'
/**
 * Algoritmed ©, EUPL-1.2 or later.
 * tff -- TFilesFolders dev, demo & test
 * 
 */
const { createApp } = Vue
import TFilesFolders from '/f/5/lib/TFilesFolders.js'
import { wsDbRw } from '/f/5/lib/wsDbRw.js'

const tFilesFolders = createApp({ data() { return { count: 0 } }, })
tFilesFolders.component('t-ff', TFilesFolders)
tFilesFolders.mount('#tFF')

// wsDbRw.ffl()
wsDbRw.ws.onopen = event => wsDbRw.fileFolderList(event)
