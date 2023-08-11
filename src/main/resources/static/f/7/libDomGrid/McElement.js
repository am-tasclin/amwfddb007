'use strict'
/**
 * Algoritmed ©, Licence EUPL-1.2 or later.
 * 
 */
import {
    mcData, reViewAdn, setActuelTreeObj, actuelTreeObj
    , initActuelTreeOpenedId, treeOpenedChildOnOff
} from '/f/7/libDomGrid/libDomGrid.js'
import { readAdnByParentIds } from '/f/7/libDbRw/libMcRDb.js'

export default {
    props: { adnId: Number, path: String, treeRootId: Number }, data() { return { count: 0, } },
    mounted() {
        const treeConf = actuelTreeObj();
        ((treeConf.mcElement || (treeConf.mcElement = {}))[this.treeRootId]
            || (treeConf.mcElement[this.treeRootId] = {}))[this.adnId] = this
    }, methods: {
        adn() { return mcData.eMap[this.adnId] || {} },
        parentChilds() { return mcData.parentChilds[this.adnId] || [] },
        vlStr() { return this.adn().vl_str && marked.parseInline(this.adn().vl_str) },
        isSelected() { return actuelTreeObj() && actuelTreeObj().selectedId == this.adnId },
        isOpened() {
            return initActuelTreeOpenedId(this.treeRootId).includes(this.adnId)
        }, click() {
            const oldSelectedId = actuelTreeObj().selectedId;
            (oldSelectedId == this.adnId || !oldSelectedId) &&
                treeOpenedChildOnOff(this.treeRootId, this.adnId)
            setActuelTreeObj(this.path).selectedId = this.adnId
            !mcData.parentChilds[this.adnId]
                && readAdnByParentIds([this.adnId])
                    .then(() => this.count++) || this.count++
            oldSelectedId && reViewAdn(oldSelectedId)
        }
    }, template: `
<div @click="click" class="w3-hover-shadow" :review="count"
        :class="{'w3-light-grey':isSelected(),'w3-white':!isSelected()}">
    <span class="w3-small" :class="{'w3-text-blue':isSelected()}" > 
    <span v-if="adnId==treeRootId">🗄</span>
    {{adnId}} &nbsp;</span>
    <span v-html="vlStr()" />
    <span class="w3-tiny">&nbsp;
    {{adn().r}},
    {{adn().r2}}
    <span>
</div>
<div class="w3-container w3-border-left" v-if="parentChilds().length && isOpened()">
    <div v-for="adnId2 in parentChilds()">
        <t-mc-element :adnId="adnId2" :path="path" :treeRootId="treeRootId" />
    </div>
</div>
`,
}
