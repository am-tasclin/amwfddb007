'use strict'
/**
 * Algoritmed ©, EUPL-1.2 or later.
 * DOM -- Data & Ontology editor & Meta-data modeler
 * aco -- Application Component Object
 * 
 * TGridDpp ── Grid DOM Page Part
 *  └─ ConfDppEd, SortMedas, MElement, SortMCData, Epl2,
 *      └─ ConfDppEdPanel    └─ AdnMenu             └─ Epl2Sql
 *          └─ SortMCData        └─ AdnEnterData    └─ Epl2Json
 */
import { confDppId, confMedasDd } from '/f/6/lib/confDomPagePart.js'
import { dppInteractivityPpId, addDppIdComponent } from '/f/6/libTGridDpp/dppInteractivity.js'

export default {
    props: { ppId: Number }, data() { return { count: 0 } },
    mounted() {
        addDppIdComponent(this.ppId, 'tGridDpp', this)
    }, methods: {
        confDpp() { return confDppId(this.ppId) },
        confMedasName(medas) { return confMedasDd[medas] },
        medasOnOffClick(medas) {
            const dpp = this.confDpp()
                , medasClosed = dpp.medasClosed || (dpp.medasClosed = [])
            console.log(medas, dpp)
            medasClosed.includes(medas)
                && medasClosed.splice(medasClosed.indexOf(medas), 1)
                || medasClosed.push(medas)
            this.count++
        }, isMedasClosed(medas) {
            return this.confDpp().medasClosed
                && this.confDpp().medasClosed.includes(medas)
        }
    },
    template: `
<div> <span class="w3-tiny am-b"> MEDAS dom page part </span> ➾
    <SortMedas :ppId="ppId"/>
    <ConfDppEd :ppId="ppId"/>
</div> <span class="w3-hide"> {{count}} </span>

<template v-for="medas in confDpp().l_medas">
    <div class="w3-container w3-topbar w3-light-grey">
        <span class="w3-tiny"> {{medas}}: </span>
        <span class="w3-hover-shadow w3-opacity am-u" @click="medasOnOffClick(medas)">
            {{confMedasName(medas)}}
        </span>
    </div>
    <template v-if="!isMedasClosed(medas)">
        {{medas}},
    </template>
</template>
`,
}