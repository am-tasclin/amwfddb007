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
export default {
    props: { adnId: Number, ppId: Number, medas: String, ppl2: Number, },
    data() { return { count: 0, } },
    methods: {
        adnClick() {
            console.log(this.adnId)
        }
    },
    template: `
<div class="w3-hover-shadow">
    <span class="w3-small w3-hover-shadow" @click="adnClick"> {{adnId}} </span>
</div> <span class="w3-hide"> {{count}} </span>
`,
}