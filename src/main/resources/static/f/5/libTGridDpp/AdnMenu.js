'use strict'
/**
 * Algoritmed ©, EUPL-1.2 or later.
 * ADN, adn -- Abstract Data Node
 * 
 * AdnMenu ── Menu for edit the ADN node
 *  └─ AdnEnterData
 */
import AdnEnterData from '/f/5/libTGridDpp/AdnEnterData.js'
import { mcd } from '/f/5/lib/MetaContentData.js'
import { readDppForParent } from '/f/5/lib/wsDbRw.js'
import {
    dppInteractivity, setMeMapComponent, mgdAdnMenu, reViewMeMcdPpMedasPl
} from '/f/5/libTGridDpp/metalTGridDpp.js'

export default {
    components: { AdnEnterData },
    props: { adnId: Number, ppMedasKey: String, }, data() { return { count: 0 } },
    computed: {
        ppId() { return this.ppMedasKey.split('_')[1] },
        medas() { return this.ppMedasKey.split('_')[2] },
        ppl2() { return this.ppMedasKey.split('_')[3] },
        adnDppKey() { return this.adnId + this.ppMedasKey },
        adnMenuKey() { return 'adnMenu_' + this.adnDppKey },
        // adnMenuKey() { return 'adnMenu_' + this.adnId + this.ppMedasKey },
    }, mounted() {
        setMeMapComponent(this.adnId, this.adnMenuKey, this)
    }, methods: {
        adnClick() {
            !mcd.parentChild[this.adnId] &&
                readDppForParent(this.adnId, () =>
                    mgdAdnMenu.adnClick(this.adnId, this.ppId, this.medas, this.ppl2))
            mcd.parentChild[this.adnId] &&
                mgdAdnMenu.adnClick(this.adnId, this.ppId, this.medas, this.ppl2)
            reViewMeMcdPpMedasPl(this.adnId, this.ppMedasKey)
            console.log(this.ppMedasKey)
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
            dppInteractivity.clickDropDownOpenId(dropDownOpenId, this.ppId)
            this.count++
        }, isFixedAdnDialogWindow() {
            return ('edit_fixed_' + this.adnId + this.ppMedasKey) == dppInteractivity.dropDownOpenId
        }, isFlyAdnDialogWindow() {
            return ('edit_fly_' + this.adnId + this.ppMedasKey) == dppInteractivity.dropDownOpenId
        }, cleanEdit() {
            // delete dppInteractivity.dropDownOpenId
            dppInteractivity.clickDropDownOpenId('', this.ppId)
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
