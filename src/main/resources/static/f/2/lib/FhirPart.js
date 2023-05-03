'use strict'
import { pd } from '/f/2/lib/pd_wsDbC.js'
import { fipi, fipiFn } from '/f/2/lib/fipi.js'
export default {
    props: { adnId: Number, ppId: Number, fip: String, fipId: Number, lrPl2: Boolean },
    data() { return { count: 0 } },
    mounted() {
        this.lrPl2 &&
            (console.log(this.lrPl2, this.adnId, this.fipId, this.fip
                // , fipi.ppId[this.ppId].pp[this.fip].fipId
                // , fipi.ppId[this.ppId].pp[this.fip].fipId[this.fipId]
                , fipi.ppId[this.ppId].pp[this.fip]
            ))

        this.lrPl2 && (
            !fipi.ppId[this.ppId].pp[this.fip].pl2.fipId[this.fipId].fhirPart &&
            (fipi.ppId[this.ppId].pp[this.fip].pl2.fipId[this.fipId].fhirPart = {})
            && (fipi.ppId[this.ppId].pp[this.fip].pl2.fipId[this.fipId].fhirPart[this.adnId] = this)
        )

        !this.lrPl2 && (
            !fipi.ppId[this.ppId].pp[this.fip].fipId[this.fipId].fhirPart &&
            (fipi.ppId[this.ppId].pp[this.fip].fipId[this.fipId].fhirPart = {})
            && (fipi.ppId[this.ppId].pp[this.fip].fipId[this.fipId].fhirPart[this.adnId] = this)
        )
    }, methods: {
        i(n) { return pd.i(this.adnId, n) },
        parentChild(adnId) { return pd.parentChild[adnId] || [] },
        adnClick() {
            console.log(this.adnId, this.lrPl2, pd.e(this.adnId))
            console.log(this.adnId, this.ppId, this.fip, this.fipId)
            fipiFn.onOffChild(this.adnId, this.ppId, this.fip, this.fipId)
        }, isOpenChild() {
            console.log(this.adnId, this.ppId, this.fip, this.fipId)
            return fipiFn.isOpenChild(this.adnId, this.ppId, this.fip, this.fipId)
        },
    }, template: `
<div class="w3-hover-shadow">
    <span class="w3-small w3-hover-shadow"
    @click="adnClick">{{adnId}}</span>
    {{i('value_22')}}
    <span class="w3-small"> <span v-if="i('r_value_22')">::</span>{{i('r_value_22')}} </span>
    <span class="w3-tiny" v-if="i('rr_value_22')">::{{i('rr_value_22')}}</span>
    <span v-if="i('r2_value_22')">&nbsp;:&nbsp;<span class="am-i">{{i('r2_value_22')}}</span></span>
</div> <span class="w3-hide"> {{count}} </span>
<div class="w3-container w3-border-left" v-if="isOpenChild()">
    <template v-for="adnId2 in parentChild(adnId)">
        <t-fhir-part :adn-id="adnId2" :pp-id="ppId" :fip="fip" :fip-id="fipId"></t-fhir-part>
    </template>
</div>
    ` ,
}
