'use strict'
/**
 * Algoritmed ©, EUPL-1.2 or later.
 * 
 */
import { gridTable } from
    '/f/ar/5rGridTable/libGridTable/libGridTable.js'
export default{
    data() { return { count: 0, } },
    props: { tagName: String },
    methods:{
        keys() { return gridTable(this.tagName).bodyColumns },
    },
    template:`
<tr>
    <th class="w3-tiny w3-border-top" colspan=12>
    a1
    {{keys()}}
    </th>
</tr>
<tr>
    <th v-for="c in keys()">
    {{c}}
    </th>
</tr>
`
}