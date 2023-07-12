'use strict'
import { getFood, getFoodColumns } from './libGridTable.js'

export default {
    methods: {
        keysf() { return getFoodColumns() },
        food()  { return getFood() },
    },
    template: `

    <tr class="w3-tiny w3-green">
        <th v-for="c in keysf()">
        {{c}}
        </th>
    </tr>

`,
}