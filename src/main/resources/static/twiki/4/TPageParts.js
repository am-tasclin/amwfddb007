'use strict'
import { fipi, fipiFn } from "/fip/1/2/fipi.js"
import { pd, wsDbC } from '/fip/1/1/l1.js'
import FhirPart from '/fip/1/2/FhirPart.js'
import PagePartCmdEdMenu from '/twiki/4/PagePartCmdEdMenu.js'
import BuildJson from '/twiki/4/BuildJson.js'

!pd.tPageParts && (pd.tPageParts = {})
!pd.session.ppClose && (pd.session.ppClose = [])

export default {
    props: { adnId: Number }, data() { return { count: 1 } },
    mounted() { pd.tPageParts[this.adnId] = this },
    components: { FhirPart, PagePartCmdEdMenu, BuildJson },
    methods: {
        pps() { return fipi.ppsFipi && fipi.ppsFipi[this.adnId] && fipi.ppsFipi[this.adnId].pps },
        ppsFipi() { return fipi.ppsFipi[this.adnId] },
        fip(fip) { return wsDbC.fip[fip] },
        sn() { return pd.session },
        ppsHref(pp) {
            fipi.ppsFipi[this.adnId].pps =
                pd.cmd.listEltoFirst2(fipi.ppsFipi[this.adnId].pps, pp)
            this.count++; pd.ppCmdEd[this.adnId].count++
        },
        ppClick(pagePart) {
            !pd.session.ppClose.includes(pagePart) && pd.session.ppClose.splice(0, 0, pagePart)
                || pd.session.ppClose.splice(pd.session.ppClose.indexOf(pagePart), 1)
            this.count++
        },
        ppIdsClick(pagePart, ppId) {
            fipi.ppsFipi[this.adnId].json[pagePart] =
                pd.cmd.listEltoFirst2(fipi.ppsFipi[this.adnId].json[pagePart], ppId)
            this.count++;
        },
    },
    template: `
<div class="w13-border-bottom w3-container">
    <span class="w3-tiny am-b"> FHIR parts </span> ➾
    <span v-for="pp in pps()"><span @click="ppsHref(pp)" title="make first"
        class="w3-hover-shadow w3-small">{{fip(pp)}}</span>,&nbsp;</span>
    <span class="w3-right"> <PagePartCmdEdMenu :ppId="adnId"/> </span>
    <template v-for="pp in pps()">
        <div class="w3-container w3-topbar w3-light-grey">
            <span class="w3-tiny"> {{pp}}: </span>
            <span class="w3-hover-shadow am-u" @click="ppClick(pp)">
                &nbsp; {{fip(pp)}} &nbsp;
            </span>
            <span class="w3-tiny w3-right">
                <span class="am-i"> {{pp}} </span> ⁙ <span class="w3-hover-shadow" 
                v-for="ppId in ppsFipi().json[pp]" @click="ppIdsClick(pp, ppId)" >
                    {{ppId}}, </span>
            </span>
        </div>
        <div :class="{'w3-hide':sn().ppClose.includes(pp)}">
            <template v-for="adnId2 in ppsFipi().json[pp]">
                <div v-if="ppsFipi().pl2[pp] && ppsFipi().pl2[pp][adnId2]" class="w3-row">
                    <div class="w3-half"><FhirPart :adnId="adnId2"/></div>
                    <div class="w3-half">
                        <button class="w3-right w3-btn w3-padding-small">
                                🗖</button>
                        <BuildJson :ppId="adnId" :pp="pp" :adnId="adnId2"/>
                    </div>
                </div>
                <FhirPart :adnId="adnId2" v-else />
            </template>
        </div>
    </template>
</div> <span class="w3-hide">{{count}}</span>
    `,
}