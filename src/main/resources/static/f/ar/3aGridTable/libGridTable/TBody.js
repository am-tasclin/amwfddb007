import { getBody, getColumns, getHead, headKeysWithChild, getHeadKeyObject, getGridComponent } from './libGridTable.js'
import moment from '/webjars/moment/2.29.4/dist/moment.js'

export default {
    data() {
        return { count: 0 } 
    },
    mounted() {
        console.log('dssfffffffff')
        getGridComponent().tBody= this 
        console.log('ooooo     ',getGridComponent())
    },

    methods: {
        rClick(c) { console.log(' id -', c) },

        keys() { return getColumns() },
        body() { return getBody() },
        styleP() { return getHead() },

        headKeysWithChild() { return headKeysWithChild(getHead()) },
        h11eadKeysWithChild() { return getHead() && headKeysWithChild(getHead()) || [] },
        styleBody(c) {

            return getHeadKeyObject(c).classBody
        },

        formatingFild(cellValue, cn) {


            cellValue = getHeadKeyObject(cellValue).formatBody


            switch (cellValue.substr(0, 5)) {
                case "dat_1":
                    return moment().format('DD.MM.YY')
                    break;
                case "str_1":
                    cn = cn.substr(cellValue.substr(5, cellValue.search(',') - 5), cellValue.substr(cellValue.search(',') + 1))
                    return cn
                    break;
                default: return cn
            }
            return cn
        },
    },

    template:
        ` 
    <tbody :x = "count"    > 
     
        <tr v-for="r in body()" class="w3-hover-shadow w3-border">
           <td v-for="c in keys()" 
                @click="rClick(c)" 
                :class="styleBody(c)">
            {{formatingFild(c,r[c])}} 
        
            
            </td>
    </tbody>        
`,

}
