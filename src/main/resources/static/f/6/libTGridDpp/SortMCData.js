'use strict'
/**
 * Algoritmed ©, EUPL-1.2 or later.
 * SortMCData ── 
 *  ├─ TGridDpp
 *  ├─ ConfDppEdPanel
 */
import { confDppId }
    from '/f/6/lib/confDomPagePart.js'
export default {
    props: { ppId: Number, medas: String, ppl2: Number, keysuffix: String }, data() { return { count: 0 } },
    methods: {
        confPpMedas() {
            // const ppMedas = !this.isPl2
            const ppMedas = this.ppl2 == 2
                && confDppId(this.ppId).medas[this.medas].ppl2
                || confDppId(this.ppId).medas[this.medas]
            return ppMedas
        },sortMcdIdClick(mcdId) {
            console.log(mcdId)
        }
    },
    template: `
⬍ <span v-for="mcdId in confPpMedas().l_mcdId"
    @click="sortMcdIdClick( mcdId)" class="w3-hover-shadow">
    {{mcdId}}, </span> <span class="w3-hide"> {{count}} </span>
`,
}