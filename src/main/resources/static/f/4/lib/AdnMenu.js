'use strict'
import { ppInteractivity } from '/f/4/lib/metal.js'
import AdnEnterData from '/f/4/lib/AdnEnterData.js'

export default {
    components: { AdnEnterData },
    props: { adnId: Number, ppMedasKey: String, }, data() { return { count: 0 } },
    computed: {
        ppId() { return this.ppMedasKey.split('_')[1] },
        adnMenuKey() { return 'adnMenu_' + this.adnId + this.ppMedasKey },
    }, mounted() {
        ppInteractivity.fn.setAdnComponent(this.adnId, this.adnMenuKey, this)
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
            const dropDownOpenId = type + '_' + editType + '_' + this.adnId + this.ppMedasKey
            ppInteractivity.clickDropDownOpenId(dropDownOpenId)
            this.count++

        }, isFixedAdnDialogWindow() {
            return ('edit_fixed_' + this.adnId + this.ppMedasKey) == ppInteractivity.dropDownOpenId
        }, isFlyAdnDialogWindow() {
            return ('edit_fly_' + this.adnId + this.ppMedasKey) == ppInteractivity.dropDownOpenId
        }, cleanEdit() {
            // delete ppInteractivity.dropDownOpenId
            ppInteractivity.clickDropDownOpenId('')
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
                <AdnEnterData :adnId="adnId" :ppMedasKey="ppMedasKey" editDataKey="edit_fly_" />
            </div>
        </div>
        <div class="w3-border-top">
            <button class="w3-btn am-b" @click="setCopy" title="copy - копіювати">⧉</button>
            <button class="w3-btn am-b" @click="setCut" title="cut - вирізати">✀</button>
        </div>
    </div>
</span> <span class="w3-hide">{{count}}</span>
<div class="w3-card-4 w3-leftbar am-width-100pr" v-if="isFixedAdnDialogWindow()" >
    <AdnEnterData :adnId="adnId" :ppMedasKey="ppMedasKey" editDataKey="edit_fixed_" />
</div>
<span class="w3-small w3-text-blue" v-if="isFixedAdnDialogWindow()">✎</span>
`,
}