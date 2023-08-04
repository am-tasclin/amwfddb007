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
        parentChilds() { return mcData.parentChilds[this.adnId] || [] },
        vlStr() {
            return this.eMap().vl_str && marked.parseInline(this.eMap().vl_str)
        }, click() {
            !mcData.parentChilds[this.adnId] &&
                readAdnByParentIds([this.adnId]).then(() => {
                    this.count++
                })
        }
    }, template: `
<div @click="click" class="w3-hover-shadow" :review="count">
    <span class="w3-small"> {{adnId}} &nbsp;</span>
    <span v-html="vlStr()" />
</div>
<div class="w3-container w3-border-left" v-if="parentChilds().length">
    <div v-for="adnId2 in parentChilds()">
        <t-mc-element :adnId="adnId2"/>
    </div>
</div>
`,
}
