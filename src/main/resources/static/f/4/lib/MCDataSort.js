'use strict'
import { confPP } from '/f/4/lib/metal.js'
import { ppInteractivity } from '/f/4/lib/metal.js'

export default {
    props: { ppId: Number, medas: String, location: String }, data() { return { count: 0 } },
    mounted() {
        console.log(123, this.location)
        !ppInteractivity.fn.ppIdMedas(this.ppId, this.medas).mcDataSort
            && (ppInteractivity.fn.ppIdMedas(this.ppId, this.medas).mcDataSort = {});
        ppInteractivity.fn.ppIdMedas(this.ppId, this.medas)
            .mcDataSort[this.location] = this
    }, methods: {
        confPP() { return confPP.ppId[this.ppId || 1] },
        mcdIdSortClick(mcdId) {
            ppInteractivity.fn.mcdIdSortClick(this.ppId, this.medas, mcdId)
        }
    }, template: `
⬍ <span v-for="mcdId in confPP().medas[medas].l_mcdId"
        @click="mcdIdSortClick( mcdId)" class="w3-hover-shadow">
    {{mcdId}}, </span> <span class="w3-hide"> {{count}} </span>
`,
}