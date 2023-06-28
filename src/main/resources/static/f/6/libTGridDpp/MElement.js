'use strict'
/**
 * Algoritmed ©, EUPL-1.2 or later.
 * MCD, mcd -- Meta Content Data
 * ADN, adn -- Abstract Data Node
 * DOM      -- Data & Ontology editor & Meta data modeler
 * 
 * MElement ── MCD Element view and edit. Manage ADN data to DOM structure
 *  └─ AdnMenu
 */
import { mcd } from '/f/6/lib/MetaContentData.js'
import { addMeMap } from '/f/6/libTGridDpp/dppInteractivity.js'
import { readDppForParent } from '/f/6/lib/wsDbRw.js'
import { confDppMedas, openChildOnOff } from '/f/6/lib/confDomPagePart.js'

export const ppMedasPpl2Key = (ppId, medas, ppl2) =>
    '_' + ppId + '_' + medas + '_' + (ppl2 == 2 && 2 || 1)

export default {
    props: { adnId: Number, ppId: Number, medas: String, ppl2: Number, }, data() { return { count: 0, } },
    mounted() {
        addMeMap(this.adnId, this.mElementKey, this)
    }, computed: {
        mElementKey() { return 'mElement' + ppMedasPpl2Key(this.ppId, this.medas, this.ppl2) },
    }, methods: {
        adnClick() {
            !mcd.parentChild[this.adnId] && readDppForParent(this.adnId, () => {
                openChildOnOff(this.adnId, this.ppId, this.medas, this.ppl2)
                this.count++
            })
            mcd.parentChild[this.adnId] && (() => {
                openChildOnOff(this.adnId, this.ppId, this.medas, this.ppl2)
                this.count++
            })()
        }, vlStr() {
            return this.eMap().vl_str && marked.parseInline(this.eMap().vl_str)
            // return this.eMap().vlStr | return marked.parse(this.eMap().vlStr)
        }, eMap() { return mcd.eMap[this.adnId] || {} },
        parentChild() { return mcd.parentChild[this.adnId] },
        isOpened() {
            const pplMedas = confDppMedas(this.ppId, this.medas, this.ppl2)
            return pplMedas.openedId && pplMedas.openedId.includes(this.adnId)
        }
    }, template: `
<div class="w3-hover-shadow">
    <span class="w3-small w3-hover-shadow" @click="adnClick"> {{adnId}} &nbsp;</span>
    <span v-html="vlStr()" />
    <span class="w3-small" v-if="eMap().r_vl_str"> ::{{eMap().r_vl_str}}</span>
    <span v-if="eMap().r2_vl_str"> :{{eMap().r2_vl_str}}</span>
</div> <span class="w3-hide"> {{count}} </span>

<div v-if="isOpened()" class="w3-container w3-border-left">
    <template v-for="adnId2 in parentChild()" >
        <t-m-element :adnId="adnId2" :ppId="ppId" :medas="medas" :ppl2="ppl2" />
    </template>
</div>
`,
}
