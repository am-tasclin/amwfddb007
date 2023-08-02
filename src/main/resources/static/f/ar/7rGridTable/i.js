'use strict'
/**
 * Algoritmed ©, EUPL-1.2 or later.
 * 
 */
const { createApp } = Vue
import { initLogic, tableList, } from './threeWishesForCinderellaLogic.js'
console.log(tableList,)
initLogic()

import TableAgGrid from './libGridTable/TableAgGrid.js'
createApp({
    components: { TableAgGrid, },
    methods: { tableList() { return tableList } },
    template: `
<div><TableAgGrid :tagName="tableList()[0]"/></div>&nbsp;
<div class="w3-row">
    <div class="w3-quarter">
        <TableAgGrid :tagName="tableList()[1]"/>
    </div>
    <div class="w3-threequarter">
        <TableAgGrid :tagName="tableList()[2]"/>
    </div>
</div>
`,
}).mount('#threeWishesForCinderella')
