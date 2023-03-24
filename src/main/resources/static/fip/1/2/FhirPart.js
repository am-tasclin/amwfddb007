'use strict'
import { pd } from '/fip/1/1/l1.js'
import { fipiFn } from '/fip/1/2/fipi.js'
import AdnIdMenu from '/fip/1/2/AdnIdMenu.js'
!pd.ctAdntree && (pd.ctAdntree = {})
export default {
    props: { adnId: Number, ppId: Number, fip: String, fipId: Number }, data() { return { count: 1, } },
    components: { AdnIdMenu },
    methods: {
        i(n) { return pd.i(this, n) },
        parentChild(adnId) { return pd.parentChild[adnId] || [] },
        adnClick() { pd.onOffChild(this.adnId) },
        isOpenChild() { return fipiFn.isOpenChild(this.adnId, this.ppId, this.fip, this.fipId) },
        // isOpenChild(adnId) { return pd.isOpenChild(adnId) },
    },
    mounted() {
        pd.ctAdntree[this.adnId] = this
        fipiFn.isOpenChild(this.adnId, this.ppId, this.fip, this.fipId) &&
            this.count++
    }, template: `
<div class="w3-hover-shadow"> <span class="w3-right"><AdnIdMenu :adnId="adnId"/></span>
    <span class="w3-small w3-hover-shadow"
        @click="adnClick">{{i('doc_id')||('-&nbsp;'+adnId+'&nbsp;‒open‒this‒')}}&nbsp;&nbsp;</span>
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
    `,
}
