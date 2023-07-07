'use strict'
import { getBody, getBodyColumns } from './libGridTable.js'

export default {
    methods: {
        keys() { return getBodyColumns() },
        body() { return getBody() },
    },
    template: `
<tbody>
    <tr v-for="r in body()" class="w3-hover-shadow">
        <td v-for="c in keys()" class="w3-border-left">
        {{r[c]}}
        </td>
    </tr>
    <tr class="w3-tiny">
        <th v-for="c in keys()">
        {{c}}
        </th>
    </tr>
    <tr>
        <td colspan="6" class="w3-border">
        test1
        {{keys()}}
        </td>
    </tr>
</tbody>
`,
}