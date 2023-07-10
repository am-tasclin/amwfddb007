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

export default {
    props: { adnId: Number },
    data() { return { count: 0, vl_str: mcd.eMap[this.adnId].vl_str } },
    methods: {
        closeEdit() {
            setOpenedDropDownId('finitaLaCommedia')
            Okeys(meMap[this.adnId]).filter(k => k.includes('mElement_'))
                .forEach(k => meMap[this.adnId][k].count++)
        }
    }, template: `
<div class="w3-container">
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