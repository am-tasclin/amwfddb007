'use strict'
/**
 * Algoritmed ©, EUPL-1.2 or later.
 * 
 */
import { confDppId } from '/f/5/lib/ConfDomPagePart.js'
import {
    dppInteractivityPpId, dppInteractivity
} from '/f/5/libTGridDpp/metalTGridDpp.js'
export default {
    props: { ppId: Number }, data() { return { count: 0 } },
    mounted() { dppInteractivityPpId(this.ppId).sortMedas = this },
    methods: {
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