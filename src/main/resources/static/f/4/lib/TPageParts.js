'use strict'
import { confPP} from '/f/4/lib/metal.js'

export default {
    props: { ppId: Number }, data() { return { count: 0 } },
    methods: {
        confPP() { return confPP.ppId[this.ppId && 1] },
    },
    template: `
<template v-for="pp in confPP().l_medas">
    <div class="w3-container w3-topbar w3-light-grey">
        <span class="w3-tiny"> {{pp}}: </span>
    </div>
    <div v-if="confPP().medas[pp].ppl2" class="w3-row">
        <div class="w3-half">
            a11
        </div>
        <div class="w3-half">
            a22
        </div>
    </div>
    <template v-for="mcdId in confPP().medas[pp].l_mcdId">
        <div>
            {{mcdId}}
        </div>
    </template>
</template>

    Hi
<span class="w3-tiny">
{{confPP()}}
</span>
    `,
}
