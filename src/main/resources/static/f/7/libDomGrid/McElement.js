'use strict'
/**
 * Algoritmed ©, Licence EUPL-1.2 or later.
 * 
 */
import { mcData, domComponent } from
    '/f/7/libDomGrid/libDomGrid.js'
import { readAdnByParentIds } from '/f/7/libDbRw/libMcRDb.js'

export default {
    props: { adnId: Number, }, data() { return { count: 0, } },
    mounted() {
        (domComponent.mcElement || (domComponent.mcElement = {}))[this.adnId] = this
    }, methods: {
        eMap() { return mcData.eMap[this.adnId] || {} },
        vlStr() {
            return this.eMap().vl_str && marked.parseInline(this.eMap().vl_str)
        }, click() {
            console.log(this.adnId)
            readAdnByParentIds([this.adnId])
        }
    }, template: `
<div @click="click" class="w3-hover-shadow" :review="count">
    {{adnId}} 
    <span v-html="vlStr()" />
</div>
`,
}

