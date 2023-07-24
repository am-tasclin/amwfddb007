'use strict'
import { gridTable } from './libGridTable.js'

export default {
    data() { return { count: 0 } },
    props: { gridTableName: String },
    mounted() {
        gridTable(this.gridTableName).tBody = this
    }, methods: {
        keys() { return gridTable(this.gridTableName).bodyColumns },
        body() { return gridTable(this.gridTableName).tableBody },
    }, template: `
<thead class="w3-white">
    <tr>
        <th v-for="k in keys()" 
                class="w3-tiny am-b w3-border-left w3-border-bottom w3-hover-shadow">
            {{k}}
        <th>
    </tr>
</thead>
<tbody :review="count" >
    <tr v-for="r in body()" class="w3-hover-shadow" >
        <td v-for="c in keys()" class="w3-border-left">
            {{r[c]}}
        </td>
    </tr>
</tbody>
`,
}
