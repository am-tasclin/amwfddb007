'use strict'
const { createApp } = Vue
import { metalData, metalFnConfPP } from '/f/4/lib/metal.js'

console.log(123)
metalFnConfPP.initPageParts(window.location.hash.substring(1), 1)

const dev = { count: 0, devText: JSON.stringify(metalData, '', 2) }
createApp({ data() { return dev }, }).mount('#dev')