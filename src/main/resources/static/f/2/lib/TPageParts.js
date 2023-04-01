'use strict'
import { fipi } from '/f/2/lib/fipi.js'
import FhirPart from '/f/2/lib/FhirPart.js'
export default {
    props: { ppId: Number }, data() { return { count: 1 } },
    components: { FhirPart},
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
            <span class="w3-tiny w3-right"> a1 </span>
        </div>
        <template v-for="fipId in ppFn(pp).l_fipId">
            <div class="w3-row" v-if="ppFn(pp).fipId[fipId].buildJsonType">
                <div class="w3-half">
                    <FhirPart v-else :adnId="fipId" :ppId="ppId" :fip="pp" :fipId="fipId" />
                </div>
                <div class="w3-half"> a2
                </div>
            </div>
            <FhirPart v-else :adnId="fipId" :ppId="ppId" :fip="pp" :fipId="fipId" />
        </template>
    </template>
    </div>  `,
}