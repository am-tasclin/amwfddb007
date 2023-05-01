'use strict'
import { fipi, fipiFn } from '/f/3/lib/fipi.js'
import FhirPart from '/f/3/lib/FhirPart.js'
import BuildJson from '/f/3/lib/BuildJson.js'
import PagePartCmdEdMenu from '/f/3/lib/PagePartCmdEdMenu.js'

export default {
    props: { ppId: Number }, data() { return { count: 0 } },
    components: { FhirPart, BuildJson, PagePartCmdEdMenu},
    methods: {
        pps() { return fipi.ppId[this.ppId].l_pp },
        fip(fip) { return fipiFn.fip[fip] },
        ppFn(pp) { return fipi.ppId[this.ppId].pp[pp] },
        ppClick(pp) {
            !fipi.ppId[this.ppId].closed && (fipi.ppId[this.ppId].closed = [])
            !fipi.ppId[this.ppId].closed.includes(pp) && fipi.ppId[this.ppId].closed.push(pp)
                || fipi.ppId[this.ppId].closed.splice(fipi.ppId[this.ppId].closed.indexOf(pp), 1)
            this.count++
            console.log(this.count)
        },
        fipIdClick(pp, fipId) {
            const oa = fipi.ppId[this.ppId].pp[pp].l_fipId
            fipi.ppId[this.ppId].pp[pp].l_fipId
                = oa.splice(oa.indexOf(fipId), 1).concat(oa)
            this.count++
        },
    },
    template: `
<div class="w13-border-bottom w3-container">
    <span class="w3-tiny am-b"> FHIR parts </span> ➾
    <span v-for="pp in pps()"><span @click="ppsHref(pp)" title="make first"
    class="w3-hover-shadow w3-small">{{fip(pp)}}</span>,&nbsp;</span>
    <span class="w3-right"> <PagePartCmdEdMenu :ppId="ppId"/> </span>
</div> <span class="w3-hide"> {{count}} </span>
<template v-for="pp in pps()">
    <div class="w3-container w3-topbar w3-light-grey">
        <span class="w3-tiny"> {{pp}}: </span>
        <span class="w3-hover-shadow am-u" @click="ppClick(pp)">
            &nbsp; {{fip(pp)}} &nbsp;
        </span>
        <span class="w3-tiny w3-right"> {{pp}} ⁙
            <span class="w3-hover-shadow" v-for="fipId in ppFn(pp).l_fipId"
            @click="fipIdClick(pp, fipId)" >
            {{fipId}}, </span> 
            <span v-if="ppFn(pp).ppl2">|
                {{ppFn(pp).ppl2.l_fipId.join(', ')}}
            </span>
            </span>
    </div>
    <div class="w3-row" v-if="ppFn(pp).ppl2">
        <div class="w3-half">
            <template v-for="fipId in ppFn(pp).l_fipId">
                <FhirPart v-else :adnId="fipId" :ppId="ppId" :pp="pp" :fipId="fipId" />
            </template>
        </div>
        <div class="w3-half">
            <template v-for="fipId in ppFn(pp).ppl2.l_fipId">
                <FhirPart :adnId="fipId" :ppId="ppId" :pp="pp" :fipId="fipId" :lrPl2=true />
            </template>
        </div>
    </div>
    <template v-else>
    <template v-for="fipId in ppFn(pp).l_fipId">
        <div class="w3-row" v-if="ppFn(pp).fipId[fipId].pl2">
            <div class="w3-half">
                <FhirPart :adnId="fipId" :ppId="ppId" :pp="pp" :fipId="fipId" />
            </div>
            <div class="w3-half">
                <button @click="onOffChildWithPl2(pp, fipId)" 
                    class="w3-right w3-btn w3-padding-small" >🗕:🗖</button>
                <BuildJson :ppId="ppId" :pp="pp" :fipId="fipId"/>
            </div>
        </div>
        <FhirPart v-else :adnId="fipId" :ppId="ppId" :pp="pp" :fipId="fipId" />
    </template>
    </template>
</template>
`,
}
