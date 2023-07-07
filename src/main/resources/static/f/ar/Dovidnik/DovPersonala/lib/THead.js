'use strict'
import ddPersonal from '../ddPersonal.js'
import { headKeysWithChild } from './libGridTable.js'
const Okeys = Object.keys
console.log('dd444 ', headKeysWithChild(ddPersonal.head))

export default {
    methods: {
        tableData() { return ddPersonal },
        headKeysWithChild() { return headKeysWithChild(this.tableData().head) },
        headSortClick(k) {
            // Фильтр по 1-му єтажу

            if (this.tableData().Nastroyki.SortDesc.length > 0) { this.tableData().Nastroyki.SortDesc = "" }
            else { this.tableData().Nastroyki.SortDesc = " DESC" }

            this.tableData().Nastroyki.SortPole = ' order by ' + this.tableData().head[k].filter + this.tableData().Nastroyki.SortDesc

            console.log(this.tableData().Nastroyki.SortPole)
        },
        headSortClick2(k1, k) {
            // Фильтр по 2-му єтажу
            if (this.tableData().Nastroyki.SortDesc.length > 0) { this.tableData().Nastroyki.SortDesc = "" }
            else { this.tableData().Nastroyki.SortDesc = " DESC" }

            this.tableData().Nastroyki.SortPole =
                ' order by ' + this.tableData().head[k1].child[k].filter + this.tableData().Nastroyki.SortDesc

            console.log('2  ' + this.tableData().Nastroyki.SortPole)
        },

        childCount(o) { return !o && 1 || Okeys(o).length },

        addString() {
            console.log("add")
        },
        read(row) {
            console.log(111, row.id)
        },
        del(row) {
            console.log(row.id + 100)
        },

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

        agregatePole2(cellValue, cn) {
            // console.log("agr ", this.tableData().footer2[cn].agregat, cn)
            switch (cellValue) {
                case "count(*)":
                    return "count(*)"
                    break;
                case "max":
                    return " max(" + cn + ")"
                    break;
                case "min":
                    return " min(" + cn + ")"
                    break;
                case "sum":
                    return "sum(" + cn + ")"
                    break;

                default:
                    return "-"
            }

        }


    },
    template: `
<thead v-if="headKeysWithChild().length" class="w3-small">
    <tr>
        <th v-for="(v,k) in tableData().head" class="w3-border w3-hover-shadow" 
			@click="headSortClick(k)" :style="v.style" :colspan="childCount(v.child)"
            :rowspan="headKeysWithChild().includes(k)&&1||2">
            {{v.alias}}
        </th>
        
    </tr>

    <tr v-if="headKeysWithChild().length">
        <template v-for="k1 in headKeysWithChild()">
            <th v-for="(v,k) in tableData().head[k1].child" class="w3-border w3-hover-shadow"
                :style="v.style" @click="headSortClick2(k1,k)">
                {{v.alias}}
            </th>
        </template>
    </tr>
</thead>


<thead v-else class="w3-small">
    <tr>
        <th v-for="(v,k) in tableData().head" style="width: 4em;" :style="v.style" @click="headSortClick(k)"
            class="w3-hover-shadow w3-border">
            {{v.alias}}
        </th>
    </tr>
</thead>


<div id="testGridTable2">
<table>
    <tbody>
        <!--Дані з бази-->
        <div class="w3-row w3-border w3-hover-shadow" v-for="row in tableData().table">
            <div :style="{'width': tableData().colClassStylePole[cn].width}"
                :class="tableData().colClassStylePole[cn].classpole" v-for="cn in tableData().colNames">
               {{formatingpole(tableData().colClassStylePole[cn].formatpole, row[cn]) }}
              <!--  {{row[cn] }} -->
            </div>
        </div>
        <!-- Footer 1 -->
            <div :style="{'width': tableData().footer1[cn].width}" :class="tableData().footer1[cn].classpole"
                v-for="cn in tableData().tablefooter1">
                {{agregatePole2(tableData().footer1[cn].agregat, cn)}}
            </div>
        <!-- Footer 2 --> 
            <div :style="{'width': tableData().footer2[cn].width}" :class="tableData().footer2[cn].classpole"
                v-for="cn in tableData(agregate).tablefooter2">
               {{agregatePole2(tableData().footer2[cn].agregat, cn)}} 
              <!-- {{cn}}-->
            </div>               
    </tbody>
</table>
</div>

    `
}
