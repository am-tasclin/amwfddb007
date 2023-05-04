'use strict'
import { pd } from '/f/3/lib/pd_wsDbC.js'
import { fipi, fipiFn } from '/f/3/lib/fipi.js'
import AdnMenu from '/f/3/lib/AdnMenu.js'


export default {
    props: { adnId: Number, ppId: Number, pp: String, fipId: Number, lrPl2: Boolean },
    data() { return { count: 0 } },
    components: { AdnMenu },
    mounted() {
        const fhirPartPath = this.lrPl2
            && fipi.ppId[this.ppId].pp[this.pp].ppl2.fipId[this.fipId]
            || fipi.ppId[this.ppId].pp[this.pp].fipId[this.fipId]

        !fhirPartPath.fhirPart && (fhirPartPath.fhirPart = {})
        fhirPartPath.fhirPart[this.adnId] = this

    }, methods: {
        i(n) { return pd.i(this.adnId, n) },
        parentChild(adnId) { return pd.parentChild[adnId] || [] },
        adnClick() {
            console.log(this.adnId, this.ppId, this.pp, this.fipId, this.lrPl2)
            fipiFn.onOffChild(this.adnId, this.ppId, this.pp, this.fipId, this.lrPl2)
            // this.count++
        }, isOpenChild() {
            return fipiFn.isOpenChild(this.adnId, this.ppId, this.pp, this.fipId, this.lrPl2)
        },
    }, template: `
<div class="w3-hover-shadow">
    <span class="w3-small  w3-dropdown-hover w3-white">
        <span class="w3-hover-shadow" @click="adnClick"> {{adnId}} </span>
        <AdnMenu :adnId="adnId" />
    </span>
    {{i('value_22')}}
    <span class="w3-small"> <span v-if="i('r_value_22')">::</span>{{i('r_value_22')}} </span>
    <span class="w3-tiny" v-if="i('rr_value_22')">::{{i('rr_value_22')}}</span>
    <span v-if="i('r2_value_22')">&nbsp;:&nbsp;<span class="am-i">{{i('r2_value_22')}}</span></span>
</div> <span class="w3-hide"> {{count}} </span>
<div class="w3-container w3-border-left" v-if="isOpenChild()">
    <template v-for="adnId2 in parentChild(adnId)">
        <t-fhir-part :adn-id="adnId2" :pp-id="ppId" :pp="pp" :fip-id="fipId" :lr-pl2="lrPl2"></t-fhir-part>
    </template>
</div>
    `,
}

fipiFn.isOpenChild = (adnId, ppId, pp, fipId, lrPl2) => {
    const openedPpObj = lrPl2 &&
        fipi.ppId[ppId].pp[pp].ppl2 || fipi.ppId[ppId].pp[pp]
    return openedPpObj
        && openedPpObj.fipId
        && openedPpObj.fipId[fipId]
        && openedPpObj.fipId[fipId].opened
        && openedPpObj.fipId[fipId].opened.includes(adnId)
}

fipiFn.onOffChild = (adnId, ppId, pp, fipId, lrPl2) => {
    const openedPpObj = lrPl2 &&
        fipi.ppId[ppId].pp[pp].ppl2 || fipi.ppId[ppId].pp[pp]
    console.log(openedPpObj)
    const openedObj = openedPpObj.fipId[fipId]
    const openedList = (openedObj.opened || (openedObj.opened = []))
    openedList.includes(adnId)
        && openedList.splice(openedList.indexOf(adnId), 1)
        || openedList.push(adnId)

    openedObj.fhirPart[adnId].count++

    openedObj.buildJson &&
        openedObj.buildJson.count++
}
