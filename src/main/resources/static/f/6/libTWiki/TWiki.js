'use strict'
/**
 * Algoritmed ©, Licence EUPL-1.2 or later.
 * 
 */
import { mcd } from '/f/6/lib/MetaContentData.js'
import { addMeMap } from '/f/6/libTGridDpp/dppInteractivity.js'
import { l_domType } from '/f/6/lib/confDomPagePart.js'
import TGridDpp from '/f/6/libTGridDpp/TGridDpp.js'

export default {
    props: { pageId: Number }, data() { return { count: 0, } },
    components: { TGridDpp },
    methods: {
        eMap(adnId) { return mcd.eMap[adnId] || {} },
        parentChild(adnId) { return mcd.parentChild[adnId] || [] },
        l_domType() { return l_domType },
    }, mounted() {
        addMeMap(this.pageId, 'tWiki', this)
    }, template: `
<h1> {{eMap(pageId).vl_str}} </h1>

<template v-for="adnId in parentChild(pageId)">
<span class="w3-right w3-tiny w3-opacity"> <sup v-if="'ORDER'==eMap(adnId).r_vl_str">
    ORDER </sup> </span>
    <template v-for="adnId2 in parentChild(adnId)">
        <p v-if="'p'==eMap(adnId2).r_vl_str">
            {{eMap(adnId2).vl_str}} </p>
        
        <TGridDpp :ppId="eMap(adnId2).doc_id" v-else-if="l_domType().includes(eMap(adnId2).r)" />
        
        <div v-else class="w3-tiny">
            {{l_domType()}}
            {{l_domType().includes(eMap(adnId2).r)}}
            {{eMap(adnId2)}}
        </div>
    </template>
</template>


<span class="w3-hide"> {{count}} </span>
`,
}
