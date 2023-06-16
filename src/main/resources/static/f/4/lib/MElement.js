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
import { mcd, dppInteractivity } from '/f/4/lib/metalTGridDpp.js'
import AdnMenu from '/f/4/lib/AdnMenu.js'

export default {
    props: { adnId: Number, ppId: Number, medas: String, ppl2: Number, },
    data() { return { count: 0, } },
    components: { AdnMenu },
    computed: {
        ppMedasKey() {
            return '_' + this.ppId + '_' + this.medas
                + '_' + (this.ppl2 && this.ppl2 || 1)
        },
    }, mounted() {
        dppInteractivity.fn.setAdnComponent(this.adnId
            , 'mElement' + this.ppMedasKey, this)
    }, methods: {
        vlStr() {
            // return this.eMap().vlStr
            // return marked.parse(this.eMap().vlStr)
            return this.eMap().vlStr && marked.parseInline(this.eMap().vlStr)
        },
        eMap() { return mcd.eMap[this.adnId] || {} },
    }, template: `
<div class="w3-hover-shadow">
    <AdnMenu :adnId="adnId" :ppMedasKey="ppMedasKey" />
    &nbsp;
    <span class="w3-tiny" v-html="vlStr()" />
</div> <span class="w3-hide"> {{count}} </span>
`,
}
