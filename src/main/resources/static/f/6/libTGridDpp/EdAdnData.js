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
import { getDbMessagePoolCt, dbMessagePool } from '/f/6/lib/DbMessagePool.js'

const enterVlStrData = (adnId, vl_str) => {
    const countCurrentPool = getDbMessagePoolCt().countCurrentPool
        , dbMessage = {
            sqlCmd: 'updateString', adnId: adnId, string: vl_str
            , countCurrentPool: countCurrentPool
        }
    dbMessagePool[countCurrentPool] = dbMessage
    console.log(adnId, vl_str, countCurrentPool, dbMessage, dbMessagePool)
    getDbMessagePoolCt().countCurrentPool++
}

export default {
    props: { adnId: Number, ppIdMedasPpl2Key: String },
    data() { return { count: 0, vl_str: mcd.eMap[this.adnId].vl_str } },
    mounted() {
        console.log(this.ppIdMedasPpl2Key)
    }, methods: {
        enterData() {
            console.log(this.adnId, this.vl_str != mcd.eMap[this.adnId].vl_str)
            this.vl_str != mcd.eMap[this.adnId].vl_str &&
                enterVlStrData(this.adnId, this.vl_str)
        }, closeEdit() {
            setOpenedDropDownId('finitaLaCommedia')
            Okeys(meMap[this.adnId]).filter(k => k.includes('mElement_')
                || k.includes('adnMenu_'))
                .forEach(k => meMap[this.adnId][k].count++)
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