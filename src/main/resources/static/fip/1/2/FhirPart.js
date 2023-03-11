'use strict'
import { pd } from '/fip/1/1/l1.js'
import FhirPart from '/fip/1/2/FhirPart.js'
export default {
    props: { adnId: Number },
    data() { return { count: 1, } },
    // components: { FhirPart },
    methods: {
        i(n) { return pd.i(this, n) },
        isOpenChild(adnId) { return pd.isOpenChild(adnId) },
        parentChildFn(adnId) { return pd.parentChild[adnId] || [] },
    },
    template: `
    <div class="w3-hover-shadow">
        <span class="w3-small w3-hover-shadow" @click="count++"
            >{{i('doc_id')||('-&nbsp;'+adnId+'&nbsp;‒open‒this‒')}}&nbsp;&nbsp;</span>
        {{adnId}}
        {{i('value_22')}}
    </div> <span class="w3-hide"> {{count}} </span>
    <div class="w3-container w3-border-left" v-if="isOpenChild(adnId)">
    a1
        <template v-for="adnId2 in parentChildFn(adnId)">
        a2 {{adnId2}}
            <FhirPart :adnId="adnId2"/>
        </template>
    </div>
    `
}