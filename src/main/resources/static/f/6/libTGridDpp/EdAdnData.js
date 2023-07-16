'use strict'
/**
 * Algoritmed ©, EUPL-1.2 or later.
 * ADN, adn -- Abstract Data Node
 * 
 * EdAdnData ── ADN data editor
 * 
 */
import { mcd } from '/f/6/lib/MetaContentData.js'
import { meMap } from '/f/6/libTGridDpp/dppInteractivity.js'
import { setOpenedDropDownId } from '/f/6/libTGridDpp/dppInteractivity.js'
import { wsUpdateString, wsInsertString } from '/f/6/lib/wsDbRw.js'

const enterVlStrData = (adnId, vl_str) => {
    const sendNewStringContent = { adnId: adnId, string: vl_str, }
    console.log(sendNewStringContent)
    !mcd.eMap[adnId].vl_str && wsInsertString(sendNewStringContent
    ).then(json => json.inserted &&
        (mcd.eMap[adnId].vl_str = json.inserted.value) &&
        reView_mElement(json.adnId)
    )
    mcd.eMap[adnId].vl_str && wsUpdateString(sendNewStringContent
    ).then(json => json.rowsUpdated == 1 &&
        (mcd.eMap[adnId].vl_str = json.vl_str) &&
        reView_mElement(json.adnId)
    )
}

const reView_mElement = adnId => Okeys(meMap[adnId])
    .filter(k => k.includes('mElement_') || k.includes('adnMenu_'))
    .forEach(k => meMap[adnId][k].count++)

export default {
    props: { adnId: Number, ppIdMedasPpl2Key: String },
    data() { return { count: 0, vl_str: mcd.eMap[this.adnId].vl_str } },
    mounted() {
        console.log(this.ppIdMedasPpl2Key, this.adnId, mcd.eMap[this.adnId])
    }, methods: {
        enterData() {
            console.log(this.adnId, this.vl_str != mcd.eMap[this.adnId].vl_str)
            this.vl_str != mcd.eMap[this.adnId].vl_str &&
                enterVlStrData(this.adnId, this.vl_str)
        }, closeEdit() {
            setOpenedDropDownId('finitaLaCommedia')
            reView_mElement(this.adnId)
        }
    }, template: `
<div class="w3-container" style="padding-bottom:2px;">
    <span class="w3-tiny">Edit & Enter Adn Content Data</span>
    <div><textarea v-model="vl_str" class="am-width-100pr" /></div>
    <button @click="enterData" class="w3-btn w3-border">send Db - відправити БД</button>
    <button @click="closeEdit" class="w3-btn w3-tiny">close - закрити 
        <span class="w3-text-blue">－✎⧉ <span>
    </button>
    <span class="w3-right w3-small w3-opacity">
    {{adnId}}
    </span>
</div> <span class="w3-hide"> {{count}} </span>
`,
}

const Okeys = Object.keys
