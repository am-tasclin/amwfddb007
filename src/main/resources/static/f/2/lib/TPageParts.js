'use strict'
import { fipi, fipiFn } from '/f/2/lib/fipi.js'
import FhirPart from '/f/2/lib/FhirPart.js'
import BuildJson from '/f/2/lib/BuildJson.js'
export default {
    props: { ppId: Number }, data() { return { count: 0 } },
    components: { FhirPart, BuildJson },
    methods: {
        pps() { return fipi.ppId[this.ppId].l_pp },
        ppFn(pp) { return fipi.ppId[this.ppId].pp[pp] },
        fipIdClick(pp, fipId) {
            console.log(fipi.ppId[this.ppId].pp[pp])
            const oa = fipi.ppId[this.ppId].pp[pp].l_fipId
            fipi.ppId[this.ppId].pp[pp].l_fipId
                = oa.splice(oa.indexOf(fipId), 1).concat(oa)
            this.count++
        },
        onOffChildWithPl2(pp, fipId) {
            console.log(this.ppId, pp, fipId,)
            fipiFn.onOffChild(fipId, this.ppId, pp, fipId)
        },
    }, template: `
    <div class="w13-border-bottom w3-container">
        <span class="w3-tiny am-b"> FHIR parts </span> ➾
        <span v-for="pp in pps()">
        {{pp}} |
        </span>
    </div> <span class="w3-hide"> {{count}} </span>
    <template v-for="pp in pps()">
        <div class="w3-container w3-topbar w3-light-grey">
            <span class="w3-tiny"> {{pp}}: </span>
            <span class="w3-tiny w3-right"> {{pp}} ⁙
                <span class="w3-hover-shadow" v-for="fipId in ppFn(pp).l_fipId"
                @click="fipIdClick(pp, fipId)" >
                {{fipId}}, </span> </span>
        </div>
        <template v-for="fipId in ppFn(pp).l_fipId">
            <div class="w3-row" v-if="ppFn(pp).fipId[fipId].buildJsonType">
                <div class="w3-half">
                    <FhirPart v-else :adnId="fipId" :ppId="ppId" :fip="pp" :fipId="fipId" />
                </div>
                <div class="w3-half">
                    <button @click="onOffChildWithPl2(pp, fipId)" 
                     class="w3-right w3-btn w3-padding-small" >🗕:🗖</button>
                    <BuildJson :ppId="ppId" :fip="pp" :fipId="fipId"/>
                </div>
            </div>
            <FhirPart v-else :adnId="fipId" :ppId="ppId" :fip="pp" :fipId="fipId" />
        </template>
    </template>
     `,
}