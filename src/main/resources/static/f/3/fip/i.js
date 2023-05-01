'use strict'
const { createApp } = Vue
import { fipi, fipi2, fipiFn } from '/f/3/lib/fipi.js'
import TPageParts from '/f/3/lib/TPageParts.js'

fipiFn.initPageParts(window.location.hash.substring(1), 1)

console.log(fipi)

const tPageParts = createApp({ data() { return { count: 0 } }, })
tPageParts.component('t-page-parts', TPageParts)
// tPageParts.component('t-fhir-part', FhirPart)
tPageParts.mount('#tPageParts')


createApp({ data() { return { hash: window.location.hash.substring(1) } }, })
    .mount('#headTitle')
