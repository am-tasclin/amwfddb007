'use strict'
import { confPP } from '/f/4/lib/metal.js'
import { ppInteractivity } from '/f/4/lib/metal.js'
import MElement from '/f/4/lib/MElement.js'
import MCDataSort from '/f/4/lib/MCDataSort.js'
import PagePartCmdEdMenu from '/f/4/lib/PagePartCmdEdMenu.js'

export default {
    props: { ppId: Number }, data() { return { count: 0 } },
    components: { MElement, PagePartCmdEdMenu, MCDataSort, },
    mounted() {
        ppInteractivity.fn.ppId(this.ppId).tPageParts = this
    }, methods: {
        confPP() { return confPP.ppId[this.ppId || 1] },
    }, template: `
<div> <span class="w3-tiny am-b"> MEDAS part </span> ➾
    <span v-for="medas in confPP().l_medas"> {{medas}},&nbsp; </span>
    <span class="w3-right"> <PagePartCmdEdMenu :ppId="ppId"/> </span>
</div> <span class="w3-hide"> {{count}} </span>

<template v-for="medas in confPP().l_medas">
    <div class="w3-container w3-topbar w3-light-grey">
        <span class="w3-tiny"> {{medas}}: </span>
        <span class="w3-tiny w3-right"> {{pp}} ⁙
            <MCDataSort :ppId="ppId" :medas="medas" location="pp"/>
            <template v-if="confPP().medas[medas].ppl2">
                |
                <MCDataSort :ppId="ppId" :medas="medas" 
                    :location="medas+'_ppl2'"/>
            </template>
        </span>
    </div>
    <div v-if="confPP().medas[medas].ppl2" class="w3-row">
        <div class="w3-half">
            <template v-for="mcdId in confPP().medas[medas].l_mcdId">
                <MElement :mcdId="mcdId" :medas="medas"/>
            </template>
        </div>
        <div class="w3-half">
            <template v-for="mcdId in confPP().medas[medas].ppl2.l_mcdId">
                <MElement :mcdId="mcdId" :medas="medas"/>
            </template>
        </div>
    </div>
    <template v-else>
    <template v-for="mcdId in confPP().medas[medas].l_mcdId">
        <MElement :mcdId="mcdId" :medas="medas"/>
    </template>
    </template>
</template>
`,
}
