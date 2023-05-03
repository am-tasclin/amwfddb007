'use strict'
import { pd } from '/f/3/lib/pd_wsDbC.js'
import { fipi, fipiFn } from '/f/3/lib/fipi.js'

export default {
    props: { adnId: Number, ppId: Number, pp: String, fipId: Number, lrPl2: Boolean },
    data() { return { count: 0 } },
    mounted() {
        const fhirPartPath = this.lrPl2
            && fipi.ppId[this.ppId].pp[this.pp].ppl2.fipId[this.fipId]
            || fipi.ppId[this.ppId].pp[this.pp].fipId[this.fipId]

        !fhirPartPath.fhirPart && (fhirPartPath.fhirPart = {})
        fhirPartPath.fhirPart[this.adnId] = this

        // console.log(this.ppId, this.pp, this.adnId)

    }, methods: {
        i(n) { return pd.i(this.adnId, n) },
        adnClick() {
            this.count++
        }
    }, template: `
<div class="w3-hover-shadow">
    <span class="w3-small w3-hover-shadow"
    @click="adnClick">{{adnId}}</span>
    {{i('value_22')}}
    <span class="w3-small"> <span v-if="i('r_value_22')">::</span>{{i('r_value_22')}} </span>
    <span class="w3-tiny" v-if="i('rr_value_22')">::{{i('rr_value_22')}}</span>
    <span v-if="i('r2_value_22')">&nbsp;:&nbsp;<span class="am-i">{{i('r2_value_22')}}</span></span>
</div> <span class="w3-hide"> {{count}} </span>
    `,
}
