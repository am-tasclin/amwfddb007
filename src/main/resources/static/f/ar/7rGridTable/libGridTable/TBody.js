'use strict'
/**
 * Algoritmed ©, EUPL-1.2 or later.
 * 
 */
import { gridTable } from
    '/f/ar/5rGridTable/libGridTable/libGridTable.js'
export default {
    data() { return { count: 0 } },
    props: { tagName: String },
    mounted() {
        gridTable(this.tagName).tBody = this
    }, methods: {
        keys() { return gridTable(this.tagName).bodyColumns },
        body() { return gridTable(this.tagName).tableBody },
    }, template: `
<thead class="w3-white" :review="count">
    <tr>
        <th class="w3-tiny am-b w3-border-left w3-border-bottom w3-hover-shadow"
        v-for="k in keys()">
            {{k}}
        <th>
    </tr>
</thead>
<tr>
    <td colspan=11>
    a123:
    {{tagName}}
    , l:
    {{body() && body().length}}
    </td>
</tr>
`,
}