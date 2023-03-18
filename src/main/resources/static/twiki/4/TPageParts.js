'use strict'
import { fipi } from "/fip/1/2/fipi.js"
import { pd, wsDbC } from '/fip/1/1/l1.js'
import FhirPart from '/fip/1/2/FhirPart.js'

!pd.tPageParts && (pd.tPageParts = {})
!pd.session.ppClose && (pd.session.ppClose = [])

export default {
    props: { adnId: Number }, data() { return { count: 1 } },
    mounted() { pd.tPageParts[this.adnId] = this },
    components: { FhirPart },
    methods: {
        pps() { return fipi.ppsFipi && fipi.ppsFipi[this.adnId] && fipi.ppsFipi[this.adnId].pps },
        ppsFipi() { return fipi.ppsFipi },
        fip(fip) { return wsDbC.fip[fip] },
        sn() { return pd.session },
        ppClick(pagePart) {
            console.log(pagePart, pd.session)
            !pd.session.ppClose.includes(pagePart) && pd.session.ppClose.splice(0, 0, pagePart)
                || pd.session.ppClose.splice(pd.session.ppClose.indexOf(pagePart), 1)
            this.count++
        },
    },
    template: `
<span class="w3-hide">{{count}}</span>
<div class="w3-border-bottom">
    <span class="w3-tiny am-b"> FHIR parts </span> ➾
    {{adnId}}
    <template v-for="pp in pps()">
        <div class="w3-container w3-topbar w3-light-grey">
            <span class="w3-tiny"> {{pp}}: </span>
            <span class="w3-hover-shadow am-u" @click="ppClick(pp)">
                &nbsp; {{fip(pp)}} &nbsp;
            </span>
        </div>
        <div :class="{'w3-hide':sn().ppClose.includes(pp)}">
            <template v-for="adnId2 in ppsFipi()[adnId].json[pp]">
                <FhirPart :adnId="adnId2"/>
            </template>
        </div>
    </template>
</div>
    `,
}