'use strict'
export default {
    props: { adnId: Number },
    methods: {
        sortUp() {
            console.log(123)
        },
        sortDown() {
            console.log(123)
        },
        sortPlus() {
            console.log(123)
        },
        sortMinus() {
            console.log(123)
        },
    }, template: `
<div class="w3-dropdown-content w3-border" style="width:16em;">
    <button class="w3-btn" @click="sortUp()">⬆</button>
    <button class="w3-btn" @click="sortDown()">⬇</button>
    |
    <button class="w3-btn am-b" @click="sortPlus()">+</button>
    <button class="w3-btn am-b" @click="sortMinus()">-</button>
    <div class="w3-border-top">
        a1
    </div>
    Hi Menu
    {{adnId}}
    a1
</div> `
}