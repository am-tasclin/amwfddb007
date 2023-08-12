'use strict'
/**
 * Algoritmed ©, EUPL-1.2 or later.
 * 
 * TableAgGrid: Table Accounting Grid (tag)
 * 
 */
import { gridTable, } from
    '/f/ar/8aGridTable/libGridTable/libGridTable.js'

import TBody from './TBody.js'
import THead from './THead.js'
import TFoot from './TFoot.js'

export default {
    props: { tagName: String },
    components: { TBody, THead, TFoot },
    methods: {
        tableStyle() {
            return gridTable(this.tagName).tableHeightEm
                && 'height:' + gridTable(this.tagName).tableHeightEm + 'em; overflow: auto;' || ''
        }
    }, template: `
<div :style="tableStyle()">
    <table class="am-hf-sticky01">
        <caption class="w3-tiny am-i">Hi table! {{tagName}}</caption>
        <THead :tagName="tagName" />
        <TBody :tagName="tagName" />
        <TFoot :tagName="tagName"/> 
     </table>&nbsp;
</div>
`,
}