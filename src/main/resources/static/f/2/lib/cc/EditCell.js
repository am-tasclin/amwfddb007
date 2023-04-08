'use strict'
import { cl } from '/f/2/lib/common_lib.js'
import { cci, caceFn } from '/f/2/lib/cc/cci.js'
export default {
    props: { ccId: Number, ir: Number, ic: Number },
    data() { return { count: 0 } },
    methods: {
        vRC() { return caceFn.vRCObj(this.ccId, this.ir, this.ic) },
        n_vRC() { return caceFn.vRC(this.ccId, this.ir, this.ic) },
        fName() { return this.vRC().fn && caceFn.fName(this.vRC()) },
        openCell() {
            caceFn.vRCObj(this.ccId, this.ir, this.ic).fn &&
                (this.openEditFn = true)
            const thisCellId = 'cell_' + this.ccId + '_C' + this.ic + 'R' + this.ir
            const list = document.getElementsByClassName("w3-show")
            const listKey_to_close = Object.keys(list).filter(k => list[k].id.includes('cell_')
                && !list[k].id.includes(thisCellId))
            listKey_to_close.forEach(k => cl.W3ShowOnOff(list[k].id))

            cl.W3ShowOnOff(thisCellId)
            this.count++
        }, inputVal(event) {
            const newValue = 1 * event.target.value
                , edObj = cci.ccId[this.ccId].dMap[caceFn.vRC
                    (this.ccId, this.ir, this.ic)]
            edObj && (edObj.v = newValue)
            console.log(newValue, edObj)

            this.count++
        }, okRemove() {
            console.log('okRemove')
            this.openCell()
        }, okCalc() {
            const dn = caceFn.vRC(this.ccId, this.ir, this.ic)
            console.log('okCalc', this.ir, this.ic, dn)
            // caceFn.calcCells(cci.ccId[this.ccId])
            cci.ccId[this.ccId].dMap[dn].fn &&
                caceFn.calcFn(cci.ccId[this.ccId], dn)
            caceFn.calcFnThisDate(cci.ccId[this.ccId], dn)
            this.openCell()
            cci.ccId[this.ccId].dataForCalc.count++
            console.log(cci.ccId[this.ccId])
            this.count++
        }, fnOnOff() {
            this.openEditFn = !this.openEditFn
            this.count++
        }, fnList() { return caceFn.fnList.split('_') }
    }, template: `
<a :href="'#cell_'+ccId+'_C'+ic+'R'+ir" class="am-0u">
    <div class="w3-dropdown-click">
        <div @click="openCell" >
            {{vRC() && vRC().v}}&nbsp;&nbsp;
            <span v-if="n_vRC()" class="w3-small" >
                ⌖{{n_vRC()}} </span> </div>
        <div :id="'cell_'+ccId+'_C'+ic+'R'+ir" style="width:18em;"
        class="w3-dropdown-content w3-leftbar w3-container w3-hover-shadow w3-border">
            <div v-if="openEditFn || (vRC()&&vRC().fn)" class="w3-border-bottom"
                    style="margin-bottom: 1em;">
                <span class="w3-dropdown-hover"> 𝑓:{{fName()}}:
                    <div class="w3-dropdown-content w3-border w3-container" style="left: -2em; width: 15em;" >
                        <span class="w3-bar w3-small">𝑓: 
                            <template v-for="fnn in fnList()">
                                <button :class="{'w3-grey':fnn==fName()}"
                                class="w3-btn w3-padding-small"
                                    v-if="fnn.length>0" >
                                    {{fnn}} </button> <template> </span>
                    </div>
                </span> </div>
            <div v-if="!(vRC()&&vRC().fn) || !openEditFn">
                ⌖ <input :value="vRC()&&vRC().v" @input="inputVal" style="width: 5em;">
            </div>
            <button class="w3-btn w3-padding-small w3-border" @click="okCalc">Calc</button>
            <button class="w3-btn w3-padding-small w3-border" @click="openCell">Закрити</button>
            <button class="w3-btn w3-padding-small" @click="okRemove"><i class="fa-solid fa-eraser"></i></button>
            <button class="w3-btn w3-padding-small w3-right" @click="fnOnOff">𝑓
                <sub>()</sub></button>
            <span class="w3-tiny w3-right w3-opacity">
                use <i class="fa-regular fa-keyboard"></i> Tab ⇄ key,
                {{'cell_'+ccId+'_C'+ic+'R'+ir}}</span>
        </div>
    </div>
</a> <span class="w3-hide"> {{count}} </span>`,
}