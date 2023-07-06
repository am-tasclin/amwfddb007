'use strict'
/**
 * Algoritmed ©, EUPL-1.2 or later.
 * 
 */
import { confDppId, } from '/f/6/lib/confDomPagePart.js'
import { dppInteractivityPpId } from '/f/6/libTGridDpp/dppInteractivity.js'

export default {
    props: { ppId: Number }, data() { return { count: 0 } },
    methods: {
        confDpp() { return confDppId(this.ppId) },
        sortMedas(medas) {
            console.log(medas)
            const l_medas = this.confDpp().l_medas
            this.confDpp().l_medas = l_medas.splice(l_medas.indexOf(medas), 1).concat(l_medas)
            dppInteractivityPpId(this.ppId).tGridDpp.count++
            this.count++
        }
    }, template: `
<span class="w3-tiny"> ⬍ <span v-for="medas in confDpp().l_medas"
    @click="sortMedas(medas)"
    class="w3-hover-shadow "> {{medas}},&nbsp; 
</span> <span class="w3-hide"> {{count}} </span> </span>
`,
}