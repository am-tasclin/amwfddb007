'use strict'
/**
 * Algoritmed ©, Licence EUPL-1.2 or later.
 * MCD, mcd -- Meta Content Data
 * ADN, adn -- Abstract Data Node
 * DOM      -- Data & Ontology editor & Meta data modeler
 * 
 * MElement ── MCD Element view and edit. Manage ADN data to DOM structure
 *  └─ AdnMenu
 */
import AdnMenu from '/f/6/libTGridDpp/AdnMenu.js'
import EdAdnData from '/f/6/libTGridDpp/EdAdnData.js'

import { mcd } from '/f/6/lib/MetaContentData.js'
import { meMap, addMeMap } from '/f/6/libTGridDpp/dppInteractivity.js'
import { readDppForParent } from '/f/6/lib/wsDbRw.js'
import { confDppMedas, openChildOnOff, ppIdMedasPpl2Key, forEachPpMedas }
    from '/f/6/lib/confDomPagePart.js'
import { getOpenedDropDownId, } from '/f/6/libTGridDpp/dppInteractivity.js'

export const reViewMeMapOpened = () => forEachPpMedas((ppMedas, ppId, medas) => {
    ppMedas.openedId && ppMedas.openedId
        .filter(id => meMap[id] && meMap[id]['mElement' + ppIdMedasPpl2Key(ppId, medas)])
        .forEach(id => meMap[id]['mElement' + ppIdMedasPpl2Key(ppId, medas)].count++)
    ppMedas.ppl2 && ppMedas.ppl2.openedId && ppMedas.ppl2.openedId
        .filter(id => meMap[id]).forEach(id =>
            meMap[id]['mElement' + ppIdMedasPpl2Key(ppId, medas, 2)].count++)
})

export const reViewMeMap = l => l.filter(adnId => meMap[adnId])
    .forEach(adnId => Okeys(meMap[adnId])
        .forEach(key => meMap[adnId][key].count++))

const openChild_OnOff = ct => {
    openChildOnOff(ct.adnId, ct.ppId, ct.medas, ct.ppl2)
    ct.count++
}

export const adnPpIdMedasPpl2Key = (adnId, ppIdMedasPpl2Key) => '_' + adnId + ppIdMedasPpl2Key
export const mElementKey = ppIdMedasPpl2Key => 'mElement' + ppIdMedasPpl2Key

export default {
    props: { adnId: Number, ppId: Number, medas: String, ppl2: Number, }, data() { return { count: 0, } },
    components: { AdnMenu, EdAdnData, },
    mounted() {
        addMeMap(this.adnId, this.mElementKey, this)
    }, computed: {
        ppIdMedasPpl2Key() { return ppIdMedasPpl2Key(this.ppId, this.medas, this.ppl2) },
        mElementKey() { return mElementKey(this.ppIdMedasPpl2Key) },
    }, methods: {
        adnClick() {
            console.log(this.adnId, mcd.parentChild[this.adnId])
            !mcd.parentChild[this.adnId] && readDppForParent([this.adnId], () =>
                openChild_OnOff(this))
            mcd.parentChild[this.adnId] && openChild_OnOff(this)
        }, vlStr() {
            return this.eMap().vl_str && marked.parseInline(this.eMap().vl_str)
            // return this.eMap().vlStr | return marked.parse(this.eMap().vlStr)
        }, eMap() { return mcd.eMap[this.adnId] || {} },
        parentChild() { return mcd.parentChild[this.adnId] },
        isOpened() {
            const pplMedas = confDppMedas(this.ppId, this.medas, this.ppl2)
            return pplMedas.openedId && pplMedas.openedId.includes(this.adnId)
        }, isFixAdnDialogWindow() {
            // return ('edAdn_fix' + this.adnPpIdMedasPpl2Key) == getOpenedDropDownId()
            return ('edAdn_fix' + adnPpIdMedasPpl2Key(this.adnId, this.ppIdMedasPpl2Key)) == getOpenedDropDownId()

        }
    }, template: `
<div class="w3-hover-shadow">
    <span class="w3-dropdown-hover w3-white">
        <span class="w3-small w3-hover-shadow" @click="adnClick"> {{adnId}} &nbsp;</span>
        <AdnMenu :adnId="adnId" :ppIdMedasPpl2Key="ppIdMedasPpl2Key"/>
    </span>
    <span v-html="vlStr()" />
    <span class="w3-small" v-if="eMap().r_vl_str"> ::{{eMap().r_vl_str}}</span>
    <span v-if="eMap().r2_vl_str"> :{{eMap().r2_vl_str}}</span>
</div> <span class="w3-hide"> {{count}} </span>

<div class=" w3-card-4 w3-leftbar" v-if="isFixAdnDialogWindow()" >
    <EdAdnData :adnId="adnId" :ppIdMedasPpl2Key="ppIdMedasPpl2Key"/>
</div>

<div v-if="isOpened()" class="w3-container w3-border-left">
    <template v-for="adnId2 in parentChild()" >
        <t-m-element :adnId="adnId2" :ppId="ppId" :medas="medas" :ppl2="ppl2" />
    </template>
</div>
`,
}

const Okeys = Object.keys
