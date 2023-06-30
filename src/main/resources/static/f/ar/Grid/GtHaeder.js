'use strict'
import { data } from '/f/kassa3r/Grid/appData.js'

export default {
    data() { return { p1: "", tp1: false,  } },

    methods: {
        SortP(ss) {
            if (data.Nastroyki.SortDesc.length > 0) { data.Nastroyki.SortDesc = "" } else { data.Nastroyki.SortDesc = " DESC" }
            data.Nastroyki.SortPole = ' order by ' + data.colNames[ss] + data.Nastroyki.SortDesc
            console.log(data.Nastroyki.SortPole)
        },
        SeekP1(ss){
        }
    },

    template: `
    <table class="w3-row">
    <tr>
        <td rowspan="2" @click="SortP('0')"  width=60px  class="w3-small am-b  w3-center">NN</td>
        <td rowspan="2" @click="SortP('1')"  width=150px class="w3-small am-b  w3-center">Дата</td>        
        <td colspan="3" @click="SortP('-1')" width=450px class="w3-big  am-b w3-center">FIO</td>
        <td rowspan="2" @click="SortP('5')"  width=200px class="w3-small am-b  w3-center">Хобби</td>
    </tr> 
    <tr>
        <td   id="nn7" @click="Sort(2)" width=150px class=" w3-center">Імя</td>
        <td   id="nn8" @click="Sort(3)" width=150px class=" w3-center">Отчество</td>
        <td   id="nn9" @click="Sort(4)" width=150px class=" w3-center">Призвисько</td>
    </tr> 
    </table>
    <input type="text"    v-model="p1"  class="w3-border" style="width: 60px;">
    <input type="text"   id="lname"   class="w3-border" style="width: 150px;">
    <input type="text"   id="lname"   class="w3-border" style="width: 150px;">
    <input type="text"   id="lname1"  class="w3-border" style="width: 150px;">
    <input type="text"   id="lfio"    class="w3-border" style="width: 150px;">
    <input type="text"   id="ln"      class="w3-border" style="width: 200px;">
   
 `
}
