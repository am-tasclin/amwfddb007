'use strict'
import { confPP } from '/f/4/lib/metal.js'
import MElement from '/f/4/lib/MElement.js'

export default {
    props: { ppId: Number }, data() { return { count: 0 } },
    components: { MElement, },
    methods: {
        confPP() { return confPP.ppId[this.ppId || 1] },
    },
    template: `
<template v-for="medas in confPP().l_medas">
    <div class="w3-container w3-topbar w3-light-grey">
        <span class="w3-tiny"> {{medas}}: </span>
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
    <template v-for="mcdId in confPP().medas[medas].l_mcdId">
        <MElement :mcdId="mcdId" :medas="medas"/>
    </template>
</template>

    Hi
<span class="w3-tiny">
{{confPP()}}
</span>
    `,
}
