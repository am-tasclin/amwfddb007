'use strict'
/**
 * Algoritmed ©, EUPL-1.2 or later.
 * 
 * TableAgGrid: Table Accounting Grid (tag)
 * 
 */
import TBody from './TBody.js'
export default {
    props:{tagName: String },
    components:{TBody},
    template: `
<table class="am-hf-sticky01">
    <caption class="w3-tiny am-i">Hi table! {{tagName}}</caption>
    <TBody :tagName="tagName" />
</table>&nbsp;
`,
}