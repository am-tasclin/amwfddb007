'use strict'
import { getFood, getFoodColumns } from './libGridTable.js'

export default {
    methods: {
        keysf() { return getFoodColumns() },
        food()  { return getFood() },
        formatingpole(c, p) {
            console.log('-- ', c)
            switch (c) {
                case "count":
                    console.log(' Count ', p)
                    return 'count('+p+')'
                    break;
                case "max":
                    console.log(' Max ', p)
                    return 'Max('+ p+')'
                    break;
                case "min":
                    console.log(' Min ', p)
                    return 'Min('+ p+')'
                    break;
                case "sum":
                    console.log(' Sum ', p)
                    return 'Sum('+p+')'
                    break;
                default: return ' '
            }
        }
    },
    template: `

    <tr class="w3-tiny">
        <th v-for="c in keysf()" :class=food()[c].classpole>
            {{formatingpole(food()[c].formatpole,c)}}
        </th>
    </tr>



`,
}