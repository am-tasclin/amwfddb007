'use strict'
import { pd } from '/fip/1/1/l1.js'
import AdnIdMenu from '/fip/1/2/AdnIdMenu.js'
export default {
    props: { adnId: Number }, data() { return { count: 1, } },
    components: { AdnIdMenu },
    methods: {
        i(n) { return pd.i(this, n) },
        isOpenChild(adnId) { return pd.isOpenChild(adnId) },
        parentChild(adnId) { return pd.parentChild[adnId] || [] },
        adnClick() {
            pd.onOffChild(this.adnId); this.count++
            Object.keys(pd.outForm[this.adnId]).reduce((n, m) => {
                pd.outForm[this.adnId][m].count++
            }, 0)
        },
    },
    mounted() { (pd.ctAdntree || (pd.ctAdntree = {}))[this.adnId] = this },
    template: `
<div class="w3-hover-shadow"> <span class="w3-right"><AdnIdMenu :adnId="adnId"/></span>
    <span class="w3-small w3-hover-shadow"
        @click="adnClick">{{i('doc_id')||('-&nbsp;'+adnId+'&nbsp;‒open‒this‒')}}&nbsp;&nbsp;</span>
    {{i('value_22')}}
    <span class="w3-small"> <span v-if="i('r_value_22')">::</span>{{i('r_value_22')}} </span>
    <span class="w3-tiny" v-if="i('rr_value_22')">::{{i('rr_value_22')}}</span>
    <span v-if="i('r2_value_22')">&nbsp;:&nbsp;<span class="am-i">{{i('r2_value_22')}}</span></span>
</div> <span class="w3-hide"> {{count}} </span>
<div class="w3-container w3-border-left" v-if="isOpenChild(adnId)">
    <template v-for="adnId2 in parentChild(adnId)">
        <t-fhir-part :adn-id="adnId2"></t-fhir-part>
    </template>
</div>
    `,
}
