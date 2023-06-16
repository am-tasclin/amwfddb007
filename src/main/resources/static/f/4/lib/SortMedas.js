'use strict'
/**
 * Algoritmed ©, EUPL-1.2 or later.
 * 
 */
import { confDppId, dppInteractivity } from '/f/4/lib/metalTGridDpp.js'
export default {
    props: { ppId: Number }, data() { return { count: 0 } },
    mounted() {
        const ppIdObj = dppInteractivity.fn.ppId(this.ppId)
        ppIdObj.sortMedas = { aco: this }
    }, methods: {
        confDpp() { return confDppId(this.ppId) },
        sortMedas(medas) {
            dppInteractivity.fn.sortMedas(this.ppId, medas)
        },
    }, template: `
<span class="w3-tiny"> ⬍ <span v-for="medas in confDpp().l_medas"
    @click="sortMedas(medas)"
    class="w3-hover-shadow "> {{medas}},&nbsp; 
</span> <span class="w3-hide"> {{count}} </span> </span>
`,
}