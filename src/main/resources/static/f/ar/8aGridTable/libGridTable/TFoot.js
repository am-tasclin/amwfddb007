'use strict'
//import { getHead, getColumns, headKeysWithChild, getHeadKeyObject,  getBody } from './libGridTable.js'
import { executeSelectQuery } from '/f/6/lib/wsDbRw.js'
import { headKeysWithChild, gridTable, TBodyFn, getHeadKeyObject} from
    '/f/ar/8aGridTable/libGridTable/libGridTable.js'

export default {
    data() { return { count: 0, } },
    props: { tagName: String },

    mounted() {
        console.log(this.tagName, gridTable(this.tagName))
        gridTable(this.tagName).tFoot = this
    },

    methods: {
        keysf() { 
            console.log('gggggg   ',this.tagName, gridTable(this.tagName))
            return gridTable(this.tagName).bodyColumnsA },

        headKeysWithChild() { return headKeysWithChild(getHead()) },

        styleFooter(c) {
          //  console.log('style ', getHeadKeyObject(c).classFooter)
            return getHeadKeyObject(this.tagName,c).classFooter
        },

        formatingFild(c, p) {
            // p = gridTable(this.tagName).headA[c].formatFoot

             p = getHeadKeyObject(this.tagName, c).formatFoot
            switch (p) {
                case "count":
                    console.log(' hhhh ' )               
                    return 'c(' + c + ')'
                    break;
                case "max":
                    console.log(' max ', c)
                    return 'Max(' + c + ')'
                    break;
                case "min":
                    console.log(' min ', c)
                    return 'Min(' + c + ')'
                    break;
                case "sum":
                    console.log(' sum ', c)
                    return 'Sum(' + c + ')'
                    break;
                default: return ' '
            }
        }
    },
    template: `

 <tfoot :review="count" class="w3-indigo w3-border" >
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