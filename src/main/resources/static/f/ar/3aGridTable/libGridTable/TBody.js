import { getBody, getBodyColumns, getBodyStylePole } from './libGridTable.js'
import moment from '/webjars/moment/2.29.4/dist/moment.js'

export default {
    mounted() { console.log(getBodyStylePole().id.formatpole) },

    methods: {
        RClick(c) {console.log(' id -', c)},
        keys() { return getBodyColumns() },
        body() { return getBody() },
        styleP() { return getBodyStylePole() },
        dataFormat(v, c) {

            return moment(v, getBody()[c].dataInFormat).format(getBody()[c].dataOutFormat)
        },
        contextMenu(c) {console.log(c,event.clientX+':',+event.clientY)},

        formatingFild(cellValue, cn) {
            if (!Object.keys(cn).length == 0 ) {
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
            }
                return cn
            
        },
    },

    template:
    `  
<tbody>
        <tr v-for="r in body()" class="w3-hover-shadow">
           <td v-for="c in keys()" 
           :class=styleP()[c].classpole 
           :width="styleP()[c].width" 
           @click="RClick(r.id)" 
           @contextmenu="contextMenu(r.id)"
           >
                {{formatingFild(styleP()[c].formatpole,r[c])}} 
            </td>
        </tr>
</tbody>
`,

}
