'use strict'
const { createApp } = Vue
import TFilesFolders from '/f/5/libTGridDpp/TFilesFolders.js'

console.log(123, TFilesFolders)
const tFilesFolders = createApp({ data() { return { count: 0 } }, })
tFilesFolders.component('t-ff', TFilesFolders)
tFilesFolders.mount('#tFF')
