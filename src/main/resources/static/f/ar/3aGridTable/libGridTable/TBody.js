import { getBody, getBodyColumns, getbodyStylePole } from './libGridTable.js'


export default {
    mounted() { console.log(' ---- ', getbodyStylePole()) },

    methods: {
        keys() { return getBodyColumns() },
        body() { return getBody() },
        stylepole() { return getbodyStylePole() },

        formatingpole(cellValue, cn) {
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
                default:
                    return cn
            }
            return cn
        },
    },

    template:
        `
<tbody>
        <tr v-for="r in body()">
           <td v-for="c in keys()">
               {{r[c]}} 
            </td>
        </tr>
</tbody>
`,

}
