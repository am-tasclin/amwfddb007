'use strict'
import { pd } from '/f/2/lib/pd_wsDbC.js'
import { fipi } from '/f/2/lib/fipi.js'
export default {
    props: { adnId: Number, ppId: Number, fip: String, fipId: Number },
    data() { return { count: 0 } },
    mounted() {
        !fipi.ppId[this.ppId].pp[this.fip].fipId[this.fipId].fhirPart &&
            (fipi.ppId[this.ppId].pp[this.fip].fipId[this.fipId].fhirPart = {})
        fipi.ppId[this.ppId].pp[this.fip].fipId[this.fipId].fhirPart[this.adnId] = this
    },
    methods: {
        i(n) { return pd.i(this.adnId, n) },
    },
    template: `
    <div class="w3-hover-shadow">
        <span class="w3-small w3-hover-shadow">{{adnId}}</span>
        {{i('value_22')}}
        <span class="w3-small"> <span v-if="i('r_value_22')">::</span>{{i('r_value_22')}} </span>
    <span class="w3-tiny" v-if="i('rr_value_22')">::{{i('rr_value_22')}}</span>
    <span v-if="i('r2_value_22')">&nbsp;:&nbsp;<span class="am-i">{{i('r2_value_22')}}</span></span>
    </div> <span class="w3-hide"> {{count}} </span>
    ` ,
}