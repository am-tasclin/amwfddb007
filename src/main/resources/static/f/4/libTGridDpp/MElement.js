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
import AdnMenu from '/f/4/libTGridDpp/AdnMenu.js'
import {
    dppInteractivityPpId, dropDownOpenId,
    confDppMedas, mcd, setMeMapComponent,
} from '/f/4/libTGridDpp/metalTGridDpp.js'

export default {
    props: { adnId: Number, ppId: Number, medas: String, ppl2: Number, },
    data() { return { count: 0, } },
    components: { AdnMenu },
    computed: {
        ppMedasKey() {
            return '_' + this.ppId + '_' + this.medas
                + '_' + (this.ppl2 && this.ppl2 || 1)
        },
        mEtKey() { return 'mElement_' + this.adnId + this.ppMedasKey },
    }, mounted() {
        setMeMapComponent(this.adnId, this.mEtKey, this)
    }, methods: {
        vlStr() {
            // return this.eMap().vlStr
            // return marked.parse(this.eMap().vlStr)
            return this.eMap().vl_str && marked.parseInline(this.eMap().vl_str)
        },
        eMap() { return mcd.eMap[this.adnId] || {} },
        cmClick(e) { // https://codepen.io/SimpleSoftwareIO/pen/yNwYJb
            // <div class="w3-hover-shadow" @contextmenu="cmClick">
            console.log(this, this.$nextTick, e,)
            const cmId = 'contextMenu1_' + this.ppId
            console.log(dropDownOpenId(), dppInteractivityPpId(this.ppId).ctMu1)
            e.preventDefault()
        },
        parentChild() { return mcd.parentChild[this.adnId] },
        isOpened() {
            const pplMedas = confDppMedas(this.ppId, this.medas, this.ppl2 == 2)
            return pplMedas.openedId && pplMedas.openedId.includes(this.adnId)
        }
    }, template: `
<div class="w3-hover-shadow">
    <AdnMenu :adnId="adnId" :ppMedasKey="ppMedasKey" />
    &nbsp;
    <span class="w3-tiny" v-html="vlStr()" />
</div> <span class="w3-hide"> {{count}} </span>
<div v-if="isOpened()" class="w3-container w3-border-left">
    <template v-for="adnId2 in parentChild()" >
        <t-m-element :adnId="adnId2" :ppId="ppId" :medas="medas" :ppl2="ppl2" />
    </template>
</div>
`,
}
