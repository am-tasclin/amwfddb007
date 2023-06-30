'use strict'
import { data } from './DovPersonala.js'
// import { data } from '/f/kassa3r/Grid/DovPersonala.js'

const { createApp } = Vue

const app1 = createApp({
    data() { return { count: 0, p1: "" ,ssn: "" } },
    methods: {
        data() { return data },

        addString() {
            console.log("add")
        },
        read(row) {
            console.log(111, row.id)
        },
        del(row) {
            console.log(row.id + 100)
        },
        sortList(){


        },
        sortP(ss) {
            if (data.Nastroyki.SortDesc.length > 0) { data.Nastroyki.SortDesc = "" } else { data.Nastroyki.SortDesc = " DESC" }

            data.Nastroyki.SortPole = ' order by ' + ss + data.Nastroyki.SortDesc
            console.log("сортировка - ",data.Nastroyki.SortPole)
        },
        formatingpole(cellValue, cn) {
 
            switch (cellValue.substr(0, 5)) {
                case "dat_1":
                    return cn
                    break;
                case "dat_2":
                    cn = cn.substr(3, 2)
                    switch (cn) {
                        case ("01"): cn = cn + " січня "
                            break
                        case ("02"): cn = cn + " лютого "
                            break
                        case ("03"): cn = cn + " березня "
                            break
                        case ("04"): cn = cn + " квітня "
                            break
                        case ("05"): cn = cn + " травня "
                            break
                        case ("06"): cn = cn + " червня "
                            break
                        case ("07"): cn = cn + " липня "
                            break
                        case ("08"): cn = cn + " серпня "
                            break
                        case ("09"): cn = cn + " вересня "
                            break
                        case ("10"): cn = cn + " жовтня "
                            break
                        case ("11"): cn = cn + " листопада "
                            break
                        case ("12"): cn = cn + " грудня "
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

        agregatePole(cellValue,cn) {
            console.log("agr ", data.footer1[cn].footer1, cn)
            return "|"+cellValue
        }
    }
}
)


app1.mount('#app1')
