'use strict'
const { createApp } = Vue
import { wsDbRw, dbMpView, dbMpData } from '/f/3/lib/wsDbRw.js'
import TFilesFolders from '/f/3/ff/TFF.js'

const tFilesFolders = createApp({ data() { return { count: 0 } }, })
tFilesFolders.component('t-ff', TFilesFolders)
tFilesFolders.mount('#tFF')

wsDbRw.ws.onopen = event => wsDbRw.ffl(event)
