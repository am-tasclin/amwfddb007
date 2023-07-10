'use strict'
import EdAdnData from '/f/6/libTGridDpp/EdAdnData.js'
import {
    meMap, setOpenedDropDownId, getOpenedDropDownId, dppInteractivityPpId,
    closeEdAdnDialog
}
    from '/f/6/libTGridDpp/dppInteractivity.js'
import { adnPpIdMedasPpl2Key, mElementKey } from '/f/6/libTGridDpp/MElement.js'

export default {
    props: { adnId: Number, ppIdMedasPpl2Key: String, }, data() { return { count: 0 } },
    components: { EdAdnData },
    mounted() {
        // console.log(this.ppIdMedasPpl2Key, this.adnId)
    }, methods: {
        sortUp() {
            console.log('fipiFn.sortUpDown(-1, this.adnId)')
        }, sortDown() {
            console.log('123', this.ppIdMedasPpl2Key)
        }, setAdnDialogWindow(editType) {
            'confDppEd_' == getOpenedDropDownId() &&
                dppInteractivityPpId(this.ppIdMedasPpl2Key.split('_')[1])['confDppEd'].count++
            getOpenedDropDownId() && getOpenedDropDownId().includes('edAdn_') &&
                closeEdAdnDialog(getOpenedDropDownId().split('_')[2])

            setOpenedDropDownId(editType + adnPpIdMedasPpl2Key(this.adnId, this.ppIdMedasPpl2Key))

            // editType.includes('_fly') && 
            this.count++
            editType.includes('_fix') && meMap[this.adnId][mElementKey(this.ppIdMedasPpl2Key)].count++
        }, isFlyAdnDialogWindow() {
            return ('edAdn_fly' + adnPpIdMedasPpl2Key(this.adnId, this.ppIdMedasPpl2Key)) == getOpenedDropDownId()
        },
    }, template: `
<div class="w3-dropdown-content w3-border w3-hover-shadow" 
    style="width:18em;">
    <button class="w3-btn" @click="sortUp">⬆</button>
    <button class="w3-btn" @click="sortDown">⬇</button>
    <div class="w3-border-top">
        <button class="w3-btn am-b" @click="setAdnDialogWindow('edAdn_fix')">✐</button>
        <button class="w3-btn am-b" @click="setAdnDialogWindow('edAdn_fly')">✎</button>
        <div class="w3-dropdown-content w3-card-4 w3-leftbar" v-if="isFlyAdnDialogWindow()" >
            a1
            <EdAdnData :adnId="adnId"/>
            a22
        </div>
    </div>
<div> <span class="w3-hide">{{count}}</span>
`,
}
const Okeys = Object.keys
