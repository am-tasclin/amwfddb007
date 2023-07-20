'use strict'
import { getHead, getColumns } from './libGridTable.js'

export default {
    methods: {
        keysf() { return getColumns() },
        food()  { return getHead() },
        formatingFild(c, p) {
            console.log('-- ', c)
            switch (c) {
                case "count":
                    console.log(' Count ', p)
                    return 'c('+p+')'
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
                default: return '. '
            }
        }
    },
    template: `
    
    <tr class="w3-tiny">
        <th v-for="c in keysf()" :class=food()[c].classFoodAll>
            {{formatingFild(food()[c].formatFoodAll,c)}}
        </th>
    </tr>
     
`,
}