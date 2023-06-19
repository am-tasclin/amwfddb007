'use strict'
/**
 * Algoritmed ©, EUPL-1.2 or later.
 * DOM -- Data & Ontology editor & Meta-data modeler
 * aco -- Application Component Object
 * 
 * TGridDpp ── Grid DOM Page Part
 *  └─ ConfDppEd,           MElement,   SortMCData,  SortMedas
 *      └─ ConfDppEdPanel    └─ AdnMenu
 *          └─ SortMCData        └─ AdnEnterData
 */
import ConfDppEd from '/f/4/libTGridDpp/ConfDppEd.js'
import MElement from '/f/4/libTGridDpp/MElement.js'
import SortMCData from '/f/4/libTGridDpp/SortMCData.js'
import SortMedas from '/f/4/libTGridDpp/SortMedas.js'
import { confDppId, confMedasDd, dppInteractivity } from '/f/4/libTGridDpp/metalTGridDpp.js'

export default {
    props: { ppId: Number }, data() { return { count: 0 } },
    components: { ConfDppEd, MElement, SortMCData, SortMedas },
    // components: { MElement, PagePartCmdEdMenu, SortMCData, ConfDppEd, },
    mounted() {
        const ppIdObj = dppInteractivity.fn.ppId(this.ppId)
        ppIdObj.tGridDpp = this
        /**
         ppIdObj.tGridDpp = { aco: this }
        ppIdObj.tGridDpp.confDppEd = ppIdObj.confDppEd
        delete ppIdObj.confDppEd
         Object.keys(ppIdObj).filter(im => im.includes('confDppEdPanel_'))
         .forEach(ctKey => {
             ppIdObj.tGridDpp.confDppEd[ctKey] = ppIdObj[ctKey]
             delete ppIdObj[ctKey]
            })
            */
    }, methods: {
        confDpp() { return confDppId(this.ppId) },
        confMedasName(key) { return confMedasDd[key] },
        epl2(medas, mcdId) {
            return confDppId(this.ppId).medas[medas].epl2 && confDppId(this.ppId).medas[medas].epl2.mcdId[mcdId]
        },
        isMedasClosed(medas) {
            return confDppId(this.ppId).medasClosed
                && confDppId(this.ppId).medasClosed.includes(medas)
        },
        medasOnOffClick(medas) {
            const dpp = confDppId(this.ppId)
                , medasClosed = dpp.medasClosed || (dpp.medasClosed = [])
            console.log(medas, dpp)
            medasClosed.includes(medas)
                && medasClosed.splice(medasClosed.indexOf(medas), 1)
                || medasClosed.push(medas)
            this.count++
        }
    }, template: `
<div> <span class="w3-tiny am-b"> MEDAS dom page part </span> ➾
    <SortMedas :ppId="ppId"/>
    <!-- <PagePartCmdEdMenu :ppId="ppId"/> -->
    <ConfDppEd :ppId="ppId"/>
</div> <span class="w3-hide"> {{count}} </span>

<template v-for="medas in confDpp().l_medas">
    <div class="w3-container w3-topbar w3-light-grey">
        <span class="w3-tiny"> {{medas}}: </span>
        <span class="w3-hover-shadow am-u" @click="medasOnOffClick(medas)">
            {{confMedasName(medas)}}
        </span>
        <span class="w3-tiny w3-right"> {{pp}} ⁙
            <SortMCData :ppId="ppId" :medas="medas" keysuffix="tGridDpp"/>
            <template v-if="confDpp().medas[medas].ppl2">
                |
                <SortMCData :ppId="ppId" :medas="medas" 
                    keysuffix="tGridDpp_ppl2"/>
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
    <template v-else>
    <template v-for="mcdId in confDpp().medas[medas].l_mcdId">
        <div v-if="epl2(medas, mcdId)" class="w3-row">
            <div class="w3-half">
                <MElement :adnId="mcdId"  :ppId="ppId" :medas="medas"/>
            </div>
            <div class="w3-half w3-border-bottom w3-container">
                a2 epl2
            </div>
        </div>
        <MElement v-else :adnId="mcdId"  :ppId="ppId" :medas="medas"/>
    </template>
    </template>
    </template>
</template>
`,
}
