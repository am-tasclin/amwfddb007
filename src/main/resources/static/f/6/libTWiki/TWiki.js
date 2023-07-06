'use strict'
/**
 * Algoritmed ©, Licence EUPL-1.2 or later.
 * 
 */
import { mcd } from '/f/6/lib/MetaContentData.js'
import { meMap, addMeMap } from '/f/6/libTGridDpp/dppInteractivity.js'

export default {
    props: { pageId: Number }, data() { return { count: 0, } },
    methods: {
        eMap(adnId) { return mcd.eMap[adnId] || {} },
    }, mounted() {
        addMeMap(this.pageId, 'tWiki', this)

    }, template: `
<h1> {{eMap(pageId).vl_str}} </h1>

<span class="w3-hide"> {{count}} </span>
`,
}
