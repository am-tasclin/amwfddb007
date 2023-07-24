'use strict'
import { getHead, getColumns, headKeysWithChild, getHeadKeyObject,  getBody } from './libGridTable.js'
import { executeSelectQuery } from '/f/6/lib/wsDbRw.js'


export default {
    methods: {
        keysf() { return getColumns() },
        food() { return getHead() },
        body() { return getBody() },

        headKeysWithChild() { return headKeysWithChild(getHead()) },
        styleFooter(c) {
          //  console.log('style ', getHeadKeyObject(c).classFooter)
            return getHeadKeyObject(c).classFooter
        },

        formatingFild(c, p) {
             p = getHeadKeyObject(c).formatFoot
 
            switch (p) {
                case "count":
                    console.log(' hhhh ' ,this.body())
                  


                    
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