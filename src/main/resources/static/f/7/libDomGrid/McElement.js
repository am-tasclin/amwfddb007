'use strict'
/**
 * Algoritmed ©, Licence EUPL-1.2 or later.
 * 
 */
import { mcData, domComponent, setActuelTreeObj, actuelTreeObj, treeOpenedChildOnOff } from
    '/f/7/libDomGrid/libDomGrid.js'
import { readAdnByParentIds } from '/f/7/libDbRw/libMcRDb.js'

export default {
    props: { adnId: Number, path: String, treeRootId: Number }, data() { return { count: 0, } },
    mounted() {
        (domComponent.mcElement || (domComponent.mcElement = {}))[this.adnId] = this
        // console.log(this.path.split(','))
    }, methods: {
        eMap() { return mcData.eMap[this.adnId] || {} },
        parentChilds() { return mcData.parentChilds[this.adnId] || [] },
        vlStr() {
            return this.eMap().vl_str && marked.parseInline(this.eMap().vl_str)
        }, isSelected() {
            return actuelTreeObj() && actuelTreeObj().selectedId == this.adnId
        }, isOpened() {
            return actuelTreeObj().openedId && actuelTreeObj()
                .openedId[this.treeRootId].includes(this.adnId)
        }, click() {
            setActuelTreeObj(this.path).selectedId = this.adnId
            treeOpenedChildOnOff(this.treeRootId, this.adnId)
            !mcData.parentChilds[this.adnId] && readAdnByParentIds([this.adnId]
            ).then(() => this.count++) || this.count++
        }
    }, template: `
<div @click="click" class="w3-hover-shadow" :review="count"
        :class="{'w3-light-grey':isSelected(),'w3-white':!isSelected()}">
    <span class="w3-small"> {{adnId}} &nbsp;</span>
    <span v-html="vlStr()" />
</div>
<div class="w3-container w3-border-left" v-if="parentChilds().length && isOpened()">
    <div v-for="adnId2 in parentChilds()">
        <t-mc-element :adnId="adnId2" :path="path" :treeRootId="treeRootId" />
    </div>
</div>
`,
}

