'use strict'
import { fipi, fipiFn } from "/fip/1/2/fipi.js"
import { pd, wsDbC } from '/fip/1/1/l1.js'
import FhirPart from '/fip/1/2/FhirPart.js'
import PagePartCmdEdMenu from '/twiki/4/PagePartCmdEdMenu.js'
import BuildJson from '/twiki/4/BuildJson.js'

!pd.tPageParts && (pd.tPageParts = {})
!pd.session.ppClose && (pd.session.ppClose = [])

export default {
    props: { ppId: Number }, data() { return { count: 1 } },
    mounted() { pd.tPageParts[this.ppId] = this },
    components: { FhirPart, PagePartCmdEdMenu, BuildJson },
    methods: {
        pps() { return fipi.ppsFipi && fipi.ppsFipi[this.ppId] && fipi.ppsFipi[this.ppId].pps },
        ppsFipi() { return fipi.ppsFipi[this.ppId] },
        fip(fip) { return wsDbC.fip[fip] },
        sn() { return pd.session },
        ppAdnId(pp, adnId) { return fipiFn.ppAdnId(this.ppId, pp, adnId) },
        onOffChildWithPl2(pp, adnId) {
            pd.onOffChild(adnId)
            this.count++
            fipiFn.ppAdnId(this.ppId, pp, adnId).buildJson.count++
            fipiFn.ppAdnId(this.ppId, pp, adnId).ppAdnOpen =
                !fipiFn.ppAdnId(this.ppId, pp, adnId).ppAdnOpen
        },
        ppsHref(pp) {
            fipi.ppsFipi[this.ppId].pps =
                pd.cmd.listEltoFirst2(fipi.ppsFipi[this.ppId].pps, pp)
            this.count++; pd.ppCmdEd[this.ppId].count++
        },
        ppClick(pagePart) {
            !pd.session.ppClose.includes(pagePart) && pd.session.ppClose.splice(0, 0, pagePart)
                || pd.session.ppClose.splice(pd.session.ppClose.indexOf(pagePart), 1)
            this.count++
        },
        ppIdsClick(pp, ppAdnId) {
            fipi.ppsFipi[this.ppId].json[pp] =
                pd.cmd.listEltoFirst2(fipi.ppsFipi[this.ppId].json[pp], ppAdnId)
            this.count++;
        },
    },
    template: `
<div class="w13-border-bottom w3-container">
    <span class="w3-tiny am-b"> FHIR parts </span> ➾
    <span v-for="pp in pps()"><span @click="ppsHref(pp)" title="make first"
        class="w3-hover-shadow w3-small">{{fip(pp)}}</span>,&nbsp;</span>
    <span class="w3-right"> <PagePartCmdEdMenu :ppId="ppId"/> </span>
    <template v-for="pp in pps()">
        <div class="w3-container w3-topbar w3-light-grey">
            <span class="w3-tiny"> {{pp}}: </span>
            <span class="w3-hover-shadow am-u" @click="ppClick(pp)">
                &nbsp; {{fip(pp)}} &nbsp;
            </span>
            <span class="w3-tiny w3-right">
                <span class="am-i"> {{pp}} </span> ⁙ <span class="w3-hover-shadow" 
                v-for="ppAdnId in ppsFipi().json[pp]" @click="ppIdsClick(pp, ppAdnId)" >
                    {{ppAdnId}}, </span>
            </span>
        </div>
        <div :class="{'w3-hide':sn().ppClose.includes(pp)}">
            <template v-for="adnId2 in ppsFipi().json[pp]">
                <div v-if="ppsFipi().pl2[pp] && ppsFipi().pl2[pp][adnId2]" class="w3-row">
                    <div class="w3-half"><FhirPart :adnId="adnId2" :pp="pp" :ppId="ppId"/></div>
                    <div class="w3-half">
                        <button @click="onOffChildWithPl2(pp, adnId2)" class="w3-right w3-btn w3-padding-small" >
                            {{!ppAdnId(pp,adnId2).ppAdnOpen?'🗕':'🗖'}}</button>
                        <BuildJson :ppId="ppId" :pp="pp" :adnId="adnId2"/>
                    </div>
                </div>
                <FhirPart :adnId="adnId2" :pp="pp" :ppId="ppId" v-else />
            </template>
        </div>
    </template>
</div> <span class="w3-hide">{{count}}</span>
    `,
}