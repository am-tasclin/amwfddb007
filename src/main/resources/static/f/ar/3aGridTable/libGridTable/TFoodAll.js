'use strict'
import { getFoodAll, getFoodColumnsAll } from './libGridTable.js'

export default {
    methods: {
        keysf() { return getFoodColumnsAll() },
        food()  { return getFoodAll() },
    },
    template: `
<food>
    <tr class="w3-tiny">
        <th v-for="c in keysf()" :class=food()[c].classpole>
        {{c}}
        </th>
    </tr>
</foog>
`,
}