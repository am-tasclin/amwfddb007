'use strict'
import { getHead, getColumns, headKeysWithChild, getHeadKeyObject } from './libGridTable.js'

export default {
    methods: {
        keysf() { return getColumns() },
        food() { return getHead() },
        headKeysWithChild() { return headKeysWithChild(getHead()) },
        styleFooter(c) {
            console.log('style ', getHeadKeyObject(c).classFooter)
            return getHeadKeyObject(c).classFooter
        },

        formatingFild(c, p) {
            console.log('c ', c)
            p = getHeadKeyObject(c).formatFoot
            console.log('p ', p)
            switch (p) {
                case "count":
                    console.log(' Count ', c)
                    return 'c(' + c + ')'
                    break;
                case "max":
                    console.log(' Max ', c)
                    return 'Max(' + c + ')'
                    break;
                case "min":
                    console.log(' Min ', c)
                    return 'Min(' + c + ')'
                    break;
                case "sum":
                    console.log(' Sum ', c)
                    return 'Sum(' + c + ')'
                    break;
                default: return ' '
            }
        }
    },
    template: `
    <tfoot class="w3-indigo w3-border" >
    <tr class="w3-tiny">
        <th v-for="c in keysf()" 
        :class="styleFooter(c)"
        >
           {{formatingFild(c)}}
        </th>
    </tr>
    </tfoot>
`,
}