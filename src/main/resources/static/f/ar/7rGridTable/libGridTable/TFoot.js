'use strict'
/**
 * Algoritmed ©, EUPL-1.2 or later.
 * 
 */
import { gridTable } from
    '/f/ar/5rGridTable/libGridTable/libGridTable.js'
import TSeek from './TSeek.js'

export default {
    data() { return { count: 0, } },
    props: { tagName: String },
    components: { TSeek },
    mounted() {
        gridTable(this.tagName).tFoot = this
    }, methods: {
        keys() { return gridTable(this.tagName).bodyColumns },
        tableHeightEm() { return gridTable(this.tagName).tableHeightEm },
        body() { return gridTable(this.tagName).tableBody },
    }, template: `
<tfoot class="w3-white" :review="count">
    <tr>
        <th class="w3-border-top" colspan=12>
            <div class="w3-right am-i w3-tiny w3-opacity" style="font-weight: normal;">
                {{tagName}}
                ‧ h:{{tableHeightEm()}}
                ‧ l:{{body() && body().length}}
            </div>
        </th>
    </tr>
    <TSeek :tagName="tagName"/>
<tfoot>
`,
}