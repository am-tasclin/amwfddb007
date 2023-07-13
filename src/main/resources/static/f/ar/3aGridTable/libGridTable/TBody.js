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
            return moment(v, getHead()[c].dataInFormat).format(getHead()[c].dataOutFormat)
        },

        formatingpole(cellValue, cn) {
            if (!Object.keys(cn).length == 0 ) {
               switch (cellValue.substr(0, 5)) {
                    case "dat_1":
                        return cn
                        break;
                    case "dat_2":
                        cn = cn.substr(3, 2)
                        switch (cn) {
                            case ("01"): cn = cn + " січ"
                                break
                            case ("02"): cn = cn + " лют"
                                break
                            case ("03"): cn = cn + " бер"
                                break
                            case ("04"): cn = cn + " квіт"
                                break
                            case ("05"): cn = cn + " трав"
                                break
                            case ("06"): cn = cn + " чер"
                                break
                            case ("07"): cn = cn + " лип"
                                break
                            case ("08"): cn = cn + " сер"
                                break
                            case ("09"): cn = cn + " вер"
                                break
                            case ("10"): cn = cn + " жов"
                                break
                            case ("11"): cn = cn + " лист"
                                break
                            case ("12"): cn = cn + " груд"
                                break
                        }
                        return cn
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
           <td v-for="c in keys()" :class=styleP()[c].classpole @click="RClick(r.id)" >
          
               {{formatingpole(styleP()[c].formatpole,r[c])}} 
            </td>
        </tr>
</tbody>
`,

}
