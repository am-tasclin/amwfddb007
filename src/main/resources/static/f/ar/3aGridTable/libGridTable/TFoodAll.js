'use strict'
import { getFoodAll, getFoodColumnsAll } from './libGridTable.js'

export default {
    methods: {
        keysf() { return getFoodColumnsAll() },
        food()  { return getFoodAll() },
    },
    template: `
<food>
    <tr class="w3-tiny w3-yellow">
        <th v-for="c in keysf()">
        {{c}}
        </th>
    </tr>
</food>
`,
}