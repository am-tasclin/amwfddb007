
'use strict'
import { fipi } from '/f/3/lib/fipi.js'
import { pd } from '/f/3/lib/pd_wsDbC.js'
import TPageParts from '/f/3/lib/TPageParts.js'

export default {
    props: { wId: Number }, data() { return { count: 1 } },
    components: { TPageParts },
    mounted() {
        fipi.tWikiPart = this
    }, methods: {
        ea(adnId, att) { return pd.eMap[adnId] && pd.eMap[adnId][att] },
        parentChild(adnId) { return pd.parentChild[adnId] || [] },
        fipList() { return fipi.fipList },
    }, template: `
<template v-for="adnId in parentChild(wId)">
    <span class="w3-right w3-tiny w3-opacity"> <sup v-if="'ORDER'==ea(adnId, 'r_value_22')">
    ORDER </sup> </span>
    <template v-for="adnId2 in parentChild(adnId)">
        <div v-if="fipList().includes(ea(adnId2, 'reference'))" class="w3-container" >
            {{ea(adnId2, 'value_22')}}
			<TPageParts :ppId="adnId2"></TPageParts>
        </div>
        <p v-if="'p'==ea(adnId2, 'r_value_22')">
            {{ea(adnId2, 'value_22')}} </p>
    </template>
</template> <span class="w3-hide">{{count}}</span>
`,
}
