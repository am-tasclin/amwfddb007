'use strict'
/**
 * Algoritmed ©, Licence EUPL-1.2 or later.
 * DOM -- Data & Ontology editor & Meta-data modeler
 * aco -- Application Component Object
 * 
 * TGridDpp ── Grid DOM Page Part
 *  └─ ConfDppEd, SortMedas, MElement, SortMCData, Epl2,
 *      └─ ConfDppEdPanel    └─ AdnMenu             └─ Epl2Sql
 *          └─ SortMCData        └─ AdnEnterData    └─ Epl2Json
 */
import { confDppId, confMedasDd, confDppMedasEpl2 }
    from '/f/6/lib/confDomPagePart.js'
import { addDppIdComponent } from '/f/6/libTGridDpp/dppInteractivity.js'
import ConfDppEd from '/f/6/libTGridDpp/ConfDppEd.js'
import MElement from '/f/6/libTGridDpp/MElement.js'
import SortMCData from '/f/6/libTGridDpp/SortMCData.js'
import Epl2 from '/f/6/libTGridDpp/Epl2.js'
import Epl2Sql from '/f/6/libTGridDpp/Epl2Sql.js'
import Epl2Json from '/f/6/libTGridDpp/Epl2Json.js'

export default {
    props: { ppId: Number }, data() { return { count: 0 } },
    components: {
        ConfDppEd, MElement, Epl2, Epl2Sql, Epl2Json,
        SortMCData
    }, mounted() {
        addDppIdComponent(this.ppId, 'tGridDpp', this)
    }, methods: {
        confDpp() { return confDppId(this.ppId) },
        confMedasName(medas) { return confMedasDd[medas] },
        confDppMedasEpl2(medas, mcdId) { return confDppMedasEpl2(this.ppId, medas, mcdId) },
        medasOnOffClick(medas) {
            const dpp = this.confDpp()
                , medasClosed = dpp.medasClosed || (dpp.medasClosed = [])
            medasClosed.includes(medas)
                && medasClosed.splice(medasClosed.indexOf(medas), 1)
                || medasClosed.push(medas)
            this.count++
        }, isMedasClosed(medas) {
            return this.confDpp().medasClosed
                && this.confDpp().medasClosed.includes(medas)
        }, epl2(medas, mcdId) {
            return confDppId(this.ppId).medas[medas].epl2 && confDppId(this.ppId).medas[medas].epl2.mcdId[mcdId]
        }
    }, template: `
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
        <span class="w3-tiny w3-right"> ⁙
            <SortMCData :ppId="ppId" :medas="medas" keysuffix="tGridDpp"/>
        <template v-if="confDpp().medas[medas].ppl2"> |
            <SortMCData :ppId="ppId" :medas="medas" ppl2="2" keysuffix="tGridDpp"/>
        </template>
        </span>
    </div>
    <template v-if="!isMedasClosed(medas)">
        <div v-if="confDpp().medas[medas].ppl2" class="w3-row">
            <div class="w3-half">
            <template v-for="mcdId in confDpp().medas[medas].l_mcdId">
                <MElement :adnId="mcdId" :ppId="ppId" :medas="medas"/>
            </template>
            </div>
            <div class="w3-half">
                <template v-for="mcdId in confDpp().medas[medas].ppl2.l_mcdId">
                    <MElement :adnId="mcdId" :ppId="ppId" :medas="medas" ppl2="2"/>
                </template>
            </div>
        </div>
        <template v-else v-for="mcdId in confDpp().medas[medas].l_mcdId">
            <div v-if="epl2(medas, mcdId)" class="w3-row">
                <div class="w3-half">
                    <MElement :adnId="mcdId" :ppId="ppId" :medas="medas"/>
                </div>
                <div class="w3-half">
                    <Epl2 :ppId="ppId" :medas="medas" :mcdId="mcdId" />
                    <Epl2Sql v-if="'Sql'==confDppMedasEpl2(medas, mcdId).panelType"/>
                    <Epl2Json v-else />
                </div>
            </div>
            <MElement v-else :adnId="mcdId" :ppId="ppId" :medas="medas"/>
        </template>
    </template>
</template>
`,
}