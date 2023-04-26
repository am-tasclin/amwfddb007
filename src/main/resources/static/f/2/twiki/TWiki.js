
'use strict'
import { fipi } from '/f/2/lib/fipi.js'
import { pd } from '/f/2/lib/pd_wsDbC.js'
export default {
    props: { wId: Number }, data() { return { count: 1 } },
    mounted() {
        fipi.tWikiPart = this
    },
    methods: {
        e(adnId) { return pd.eMap[adnId] },
        ea(adnId, att) { return pd.eMap[adnId] && pd.eMap[adnId][att] },
        parentChild(adnId) { return pd.parentChild[adnId] || [] },
        fipList() { return fipi.fipList },
    },
    template: `
<template v-for="adnId in parentChild(wId)">
    <span class="w3-right w3-tiny w3-opacity"> <sup v-if="'ORDER'==ea(adnId, 'r_value_22')">
    ORDER </sup> </span>
    <template v-for="adnId2 in parentChild(adnId)">
        <div v-if="fipList().includes(ea(adnId2, 'reference'))">
            <span class="w3-tiny am-b"> FHIR parts </span> ➾
            {{adnId2}} {{ea(adnId2, 'reference')}}
            {{fipList().includes(ea(adnId2, 'reference'))}}
        </div>
        <p v-if="'p'==ea(adnId2, 'r_value_22')">
            {{ea(adnId2, 'value_22')}} </p>
    </template>
</template> <span class="w3-hide">{{count}}</span>
`,
}