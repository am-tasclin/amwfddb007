'use strict'
import { cl } from '/f/2/lib/common_lib.js'
import { cci, caceFn } from '/f/2/lib/cc/cci.js'
export default {
    props: { ccId: Number, ir: Number, ic: Number },
    data() { return { count: 0 } },
    methods: {
        n_vRC() { return caceFn.vRC(this.ccId, this.ir, this.ic) },
        openCell() {
            const thisCellId = 'cell_' + this.ccId + '_C' + this.ic + 'R' + this.ir
            const list = document.getElementsByClassName("w3-show")
            const listKey_to_close = Object.keys(list).filter(k => list[k].id.includes('cell_')
                && !list[k].id.includes(thisCellId))
            listKey_to_close.forEach(k => cl.W3ShowOnOff(list[k].id))

            cl.W3ShowOnOff(thisCellId)
            this.count++
        },
        vRC() {
            return cci.ccId[this.ccId].dMap[caceFn.vRC
                (this.ccId, this.ir, this.ic)] && cci.ccId[this.ccId]
                    .dMap[caceFn.vRC(this.ccId, this.ir, this.ic)].v
        },
        inputVal(event) {
            const newValue = 1 * event.target.value
                , edObj = cci.ccId[this.ccId].dMap[caceFn.vRC
                    (this.ccId, this.ir, this.ic)]
            edObj && (edObj.v = newValue)
            console.log(newValue, edObj)

            this.count++
        },
        okRemove(){
            console.log('okRemove')
            this.openCell()
        },
        okSave(){
            console.log('okSave')
        },
        isFn(){
            return true
        }
    }, template: `
<a :href="'#cell_'+ccId+'_C'+ic+'R'+ir" class="am-0u">
    <div class="w3-dropdown-click">
        <div @click="openCell" >
            {{vRC()}}&nbsp;&nbsp;
            <span v-if="n_vRC()" class="w3-small" >
                ⌖{{n_vRC()}}
            </span>
        </div>
        <div :id="'cell_'+ccId+'_C'+ic+'R'+ir" style="width:18em;"
        class="w3-dropdown-content w3-leftbar w3-container w3-hover-shadow w3-border"
        >
            <div class="w3-border-bottom">
                a1
            </div>
            <div>
                ⌖ <input :value="vRC()" @input="inputVal" style="width: 5em;">
            </div>
            <button class="w3-btn w3-padding-small w3-border" @click="okSave">Запис</button>
            <button class="w3-btn w3-padding-small w3-border" @click="openCell">Закрити</button>
            <button class="w3-btn w3-padding-small" @click="okRemove"><i class="fa-solid fa-eraser"></i></button>
            <span class="w3-tiny w3-right">
                {{'cell_'+ccId+'_C'+ic+'R'+ir}}</span>
        </div>
    </div>
</a> <span class="w3-hide"> {{count}} </span>`,
}