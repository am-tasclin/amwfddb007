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
    mounted() {
        gridTable(this.tagName).tBody = this
    }, methods: {
        isSelectedRow(r) {
            return TBodyFn.isSelectedRow(this.tagName, r)
        }, selectRow(r) {
            TBodyFn.selectRow(this.tagName, r)
            this.count++
        },
        keys() { return gridTable(this.tagName).bodyColumns },
        body() { return gridTable(this.tagName).tableBody },
        tableHeightEm() { return gridTable(this.tagName).tableHeightEm },
    }, template: `
<thead class="w3-white" :review="count">
    <tr>
        <th class="w3-tiny am-b w3-border-left w3-border-bottom w3-hover-shadow"
        v-for="k in keys()">
            {{k}}
        <th>
    </tr>
</thead>
<tbody :review="count" >
    <tr @click="selectRow(r)" v-for="r in body()" class="w3-hover-shadow" 
    :class="{'w3-light-grey':isSelectedRow(r),'w3-white':!isSelectedRow(r)}" >
        <td v-for="c in keys()" class="w3-border-left">
            {{r[c]}}
        </td>
    </tr>
</tbody>
<tfoot class="w3-white">
    <tr >
        <th class="w3-border-top" colspan=12>
            <div class="w3-right am-i w3-tiny w3-opacity" style="font-weight: normal;">
                {{tagName}}
                ‧ h:{{tableHeightEm()}}
                ‧ l:{{body() && body().length}}
            </div>
        </th>
    </tr>
<tfoot>
`,
}