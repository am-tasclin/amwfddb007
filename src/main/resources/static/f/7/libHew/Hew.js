'use strict'
/**
 * Algoritmed ©, Licence EUPL-1.2 or later.
 * 
 */
const tagIds = {
    h1: 376600,
    p: 371359,
}
const is = (tagName, hewElement) => tagIds[tagName] === hewElement.r
import {
    mcData, confHew
} from '/f/7/libDomGrid/libDomGrid.js'
export default {
    props: { hewid: Number }, data() { return { count: 0, } },
    components: {
        'H1': { template: `<h1>{{vlStr}}</h1>`, props: { vlStr: String }, },
        'P': { template: `<p>{{vlStr}}</p>`, props: { vlStr: String }, },
    }, mounted() {
        confHew().hewComponent[this.hewid] = this
    }, methods: {
        is(v) { return is(v, this.hew()) },
        hew() { return mcData.eMap[this.hewid] || {} },
        childIds() { return mcData.parentChilds[this.hewid] || [] },
    }, template: `
<H1 v-if="is('h1')" :vlStr="hew().vl_str" />
<P v-else-if="is('p')" :vlStr="hew().vl_str" />
<template v-else>
    a2:{{hewid}}.
</template>
<template v-for="hewId2 in childIds()">
    <t-hew :hewid="hewId2"></t-hew>
</template>
<span class="w3-hide">{{count}}</span>
`,
}