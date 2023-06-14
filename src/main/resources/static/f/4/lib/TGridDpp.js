'use strict'
/**
 * Algoritmed ©, EUPL-1.2 or later.
 * DOM -- Data & Ontology editor & Meta-data modeler
 * aco -- Application Component Object
 * 
 * TGridDpp ── Grid DOM Page Part
 *  └─ ConfDppEd,           MElement,               MCDataSort
 *      └─ ConfDppEdPanel    └─ AdnMenu
 *          └─ MCDataSort        └─ AdnEnterData
 */
import { confDppId, dppInteractivity } from '/f/4/lib/metal.js'
import ConfDppEd from '/f/4/lib/ConfDppEd.js'
import MElement from '/f/4/lib/MElement.js'
import MCDataSort from '/f/4/lib/MCDataSort.js'
// import PagePartCmdEdMenu from '/f/4/lib/PagePartCmdEdMenu.js'

export default {
    props: { ppId: Number }, data() { return { count: 0 } },
    components: { ConfDppEd, MElement, MCDataSort, },
    // components: { MElement, PagePartCmdEdMenu, MCDataSort, ConfDppEd, },
    mounted() {
        const ppIdObj = dppInteractivity.fn.ppId(this.ppId)
        ppIdObj.tGridDpp = { aco: this }
        ppIdObj.tGridDpp.confDppEd = ppIdObj.confDppEd
        delete ppIdObj.confDppEd
        Object.keys(ppIdObj).filter(im => im.includes('confDppEdPanel_'))
            .forEach(ctKey => {
                ppIdObj.tGridDpp.confDppEd[ctKey] = ppIdObj[ctKey]
                delete ppIdObj[ctKey]
            })
        console.log(ppIdObj, dppInteractivity.appComponents.meMap)
        console.log(dppInteractivity.appComponents.mcDataSort)
    }, methods: {
        confDpp() { return confDppId(this.ppId) },
    }, template: `
<div> <span class="w3-tiny am-b"> MEDAS dom page part </span> ➾
    <span v-for="medas in confDpp().l_medas"> {{medas}},&nbsp; </span>
    <!-- <PagePartCmdEdMenu :ppId="ppId"/> -->
    <ConfDppEd :ppId="ppId"/>
</div> <span class="w3-hide"> {{count}} </span>

<template v-for="medas in confDpp().l_medas">
    <div class="w3-container w3-topbar w3-light-grey">
        <span class="w3-tiny"> {{medas}}: </span>
        <span class="w3-tiny w3-right"> {{pp}} ⁙
            <MCDataSort :ppId="ppId" :medas="medas" keysuffix="tGridDpp"/>
            <template v-if="confDpp().medas[medas].ppl2">
                |
                <MCDataSort :ppId="ppId" :medas="medas" 
                    keysuffix="tGridDpp_ppl2"/>
            </template>
        </span>
    </div>
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
        <MElement :adnId="mcdId"  :ppId="ppId" :medas="medas"/>
    </template>
    </template>
</template>
`,
}
