'use strict'
import { ppInteractivity } from '/f/4/lib/metal.js'
import AdnEnterData from '/f/4/lib/AdnEnterData.js'

export default {
    props: { adnId: Number, ppId: Number, }, data() { return { count: 0 } },
    components: { AdnEnterData },
    mounted() {
        ppInteractivity.fn.setAdnComponent(this.adnId, 'adnMenu', this)
    }, computed:{
        
    }, methods: {
        adnClick() {
            console.log(this.adnId)
        }, sortUp() {
            console.log('fipiFn.sortUpDown(-1, this.adnId)')
        }, sortDown() {
            console.log('123')
        }, deleteAdn() {
            console.log('123')
        }, insertAdnChild() {
            console.log('123')
        }, setCopy() {
            console.log('123')
        }, setCut() {
            console.log('123')
        }, setAdnDialogWindow(type, editType) {
            const edAdnId = ppInteractivity.dropDownOpenId
                && ppInteractivity.dropDownOpenId.split('_')[2]
            console.log(edAdnId, this.ppId, ppInteractivity.dropDownOpenId
                , ppInteractivity.appComponents.ppId[this.ppId])
            ppInteractivity.clickDropDownOpenId(type + '_' + editType + '_' + this.adnId)
            this.count++
            // ppInteractivity.appComponents.ppId[this.ppId].tPageParts.count++
            edAdnId &&
                ppInteractivity.appComponents.eMap[edAdnId].adnMenu.count++
            console.log(ppInteractivity.dropDownOpenId)
        }, isFixedAdnDialogWindow() {
            return 'edit_fixed_' + this.adnId == ppInteractivity.dropDownOpenId
        }, isFlyAdnDialogWindow() {
            return 'edit_fly_' + this.adnId == ppInteractivity.dropDownOpenId
        }, cleanEdit() {
            delete ppInteractivity.dropDownOpenId
            this.count++
        }
    },
    template: `
<span class="w3-dropdown-hover w3-white">
    <span class="w3-small w3-hover-shadow" @click="adnClick"> {{adnId}} </span>
    <div class="w3-dropdown-content w3-border w3-hover-shadow" 
            style="width:18em;">
        <div class="w3-tiny"> &nbsp; r: r2: 
            <span class="w3-right"> p: 123 </span>
        </div>
        <button class="w3-btn" @click="sortUp">⬆</button>
        <button class="w3-btn" @click="sortDown">⬇</button>
        ｜
        <button class="w3-btn am-b" @click="insertAdnChild" title="addChild - додати дитину">＋</button>
        <button class="w3-btn am-b" @click="deleteAdn">－</button>
        <div class="w3-border-top">
            <button class="w3-btn am-b" @click="setAdnDialogWindow('edit','fixed')">✐</button>
            <button class="w3-btn am-b" @click="setAdnDialogWindow('edit','fly')">✎</button>
            ｜
            <button class="w3-btn am-b w3-text-blue" @click="cleanEdit">－✎⧉</button>
            <div class="w3-dropdown-content w3-card-4 w3-leftbar" v-if="isFlyAdnDialogWindow()" >
                <AdnEnterData :adnId="adnId"/>
            </div>
        </div>
        <div class="w3-border-top">
            <button class="w3-btn am-b" @click="setCopy" title="copy - копіювати">⧉</button>
            <button class="w3-btn am-b" @click="setCut" title="cut - вирізати">✀</button>
        </div>
    </div>
</span> <span class="w3-hide">{{count}}</span>
<div class="w3-card-4 w3-leftbar am-width-100pr" v-if="isFixedAdnDialogWindow()" >
    <AdnEnterData :adnId="adnId"/>
</div>
<span class="w3-small w3-text-blue" v-if="isFixedAdnDialogWindow()">✎</span>
`,
}