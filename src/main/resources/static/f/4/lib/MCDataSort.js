'use strict'
import { confPP } from '/f/4/lib/metal.js'
import { ppInteractivity } from '/f/4/lib/metal.js'

export default {
    props: { ppId: Number, medas: String, location: String }, data() { return { count: 0 } },
    mounted() {
        const ppMedas1 = ppInteractivity.fn.ppIdMedas(this.ppId, this.medas)
        !ppMedas1.mcDataSort && (ppMedas1.mcDataSort = {})
        ppMedas1.mcDataSort[this.location] = this
    }, methods: {
        confPpMedas() {
            const ppMedas1 = confPP.ppId[this.ppId || 1].medas[this.medas]
            return ppMedas1[this.location.split('_')[1]] || ppMedas1
        }, mcdIdSortClick(mcdId) {
            ppInteractivity.fn.mcdIdSortClick(this.ppId, this.medas, this.location, mcdId)
        }
    }, template: `
⬍ <span v-for="mcdId in confPpMedas().l_mcdId"
        @click="mcdIdSortClick( mcdId)" class="w3-hover-shadow">
    {{mcdId}}, </span> <span class="w3-hide"> {{count}} </span>
`,
}