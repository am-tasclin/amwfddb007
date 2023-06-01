'use strict'
export default {
    props: { adnId: Number, },
    methods: {
        adnClick() {
            console.log(this.adnId)
        }, setAdnDialogWindow(type, editType) {
            console.log('123', type, editType)
        }, sortUp() {
            console.log('fipiFn.sortUpDown(-1, this.adnId)')
        }, sortDown() {
            console.log('123')
        }, deleteAdn() {
            console.log('123')
        }, insertAdnChild() {
            console.log('123')
        }, cleanEdit() {
            console.log('123')
        }, setCopy() {
            console.log('123')
        }, setCut() {
            console.log('123')
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
        </div>
        <div class="w3-border-top">
            <button class="w3-btn am-b" @click="setCopy" title="copy - копіювати">⧉</button>
            <button class="w3-btn am-b" @click="setCut" title="cut - вирізати">✀</button>
        </div>
    </div>
</span>
`,
}