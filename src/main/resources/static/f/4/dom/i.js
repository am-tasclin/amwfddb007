'use strict'
const { createApp } = Vue
import { confPP, metalFnConfPP } from '/f/4/lib/metal.js'
import TPageParts from '/f/4/lib/TPageParts.js'

metalFnConfPP.initPageParts(window.location.hash.substring(1), 1)

const tPageParts = createApp({ data() { return { count: 0 } }, })
tPageParts.component('t-page-parts', TPageParts)
tPageParts.mount('#tPageParts')

const dev = {
    count: 0, devText: JSON.stringify(confPP, '', 2)
        .replace(/\s+]/g, ']')
        .replace(/\s+}/g, '}')
}
createApp({ data() { return dev }, }).mount('#dev')
