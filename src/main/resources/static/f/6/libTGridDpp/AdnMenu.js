'use strict'
export default {
    props: { adnId: Number, ppMedasKey: String, },
    methods: {
        sortUp() {
            console.log('fipiFn.sortUpDown(-1, this.adnId)')
        },sortDown() {
            console.log('123')
        },setAdnDialogWindow(type, editType) {
            console.log(type, editType)
        }
    },
    template:`
<div class="w3-dropdown-content w3-border w3-hover-shadow" 
    style="width:18em;">
    <button class="w3-btn" @click="sortUp">⬆</button>
    <button class="w3-btn" @click="sortDown">⬇</button>
    <div class="w3-border-top">
        <button class="w3-btn am-b" @click="setAdnDialogWindow('edit','fixed')">✐</button>
        <button class="w3-btn am-b" @click="setAdnDialogWindow('edit','fly')">✎</button>
    </div>
<div>
`
}