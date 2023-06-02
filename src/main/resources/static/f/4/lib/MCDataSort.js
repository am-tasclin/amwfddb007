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
        mcdIdSortClick(medas, mcdId) {
            const lToSort = confPP.ppId[this.ppId].medas[medas].l_mcdId
            confPP.ppId[this.ppId].medas[medas].l_mcdId =
                lToSort.splice(lToSort.indexOf(mcdId), 1).concat(lToSort)
            ppInteractivity.fn.ppId(this.ppId).tPageParts.count++
            Object.keys(ppInteractivity.fn.ppIdMedas(this.ppId, this.medas).mcDataSort)
                .forEach(l => ppInteractivity.fn.ppIdMedas(this.ppId, this.medas).mcDataSort[l].count++)
            ppInteractivity.fn.ppId(this.ppId).ppCmd.count++
        }
    }, template: `
⬍ <span v-for="mcdId in confPP().medas[medas].l_mcdId"
        @click="mcdIdSortClick(medas, mcdId)" class="w3-hover-shadow">
    {{mcdId}}, </span> <span class="w3-hide"> {{count}} </span>
`,
}