'use strict'
/**
 * Algoritmed ©, EUPL-1.2 or later.
 * 
 */
import { gridTable, TBodyFn } from
    '/f/ar/5rGridTable/libGridTable/libGridTable.js'

export default {
    data() { return { count: 0, } },
    props: { tagName: String },
    mounted() { gridTable(this.tagName).tBody = this },
    methods: {
        isSelectedRow(r) {
            return TBodyFn.isSelectedRow(this.tagName, r)
        }, selectRow(r) {
            TBodyFn.selectRow(this.tagName, r)
            this.count++
        },
        keys() { return gridTable(this.tagName).bodyColumns },
        body() { return gridTable(this.tagName).tableBody },
    }, template: `
<tbody :review="count" >
    <tr @click="selectRow(r)" v-for="r in body()" class="w3-hover-shadow" 
    :class="{'w3-light-grey':isSelectedRow(r),'w3-white':!isSelectedRow(r)}" >
        <td v-for="c in keys()" class="w3-border-left">
            {{r[c]}}
        </td>
    </tr>
</tbody>
`,
}