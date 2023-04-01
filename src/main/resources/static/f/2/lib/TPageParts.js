'use strict'
import { fipi } from '/f/2/lib/fipi.js'
export default {
    props: { ppId: Number }, data() { return { count: 1 } },
    methods: {
        pps() { return fipi.ppId[this.ppId].l_pp },
        ppFn(pp){return fipi.ppId[this.ppId].pp[pp]}
    }, template: `
    <div class="w13-border-bottom w3-container">
        <span class="w3-tiny am-b"> FHIR parts </span> ➾
        <span v-for="pp in pps()">
        {{pp}} |
        </span>
<template v-for="pp in pps()">
    <div class="w3-container w3-topbar w3-light-grey">
        <span class="w3-tiny"> {{pp}}: </span>
    </div>
    <div v-for="fipId in ppFn(pp).l_fipId">
    a1
    {{fipId}}
    </div>
</template>
    </div>  `,
}