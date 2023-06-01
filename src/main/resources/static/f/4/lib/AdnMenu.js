'use strict'
export default {
    props: { adnId: Number, },
    methods: {
        adnClick() {
            console.log(this.adnId)
        }, sortUp() {
            console.log('fipiFn.sortUpDown(-1, this.adnId)')
        }, sortDown() {
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
        <button class="w3-btn" @click="sortUp()">⬆</button>
        <button class="w3-btn" @click="sortDown()">⬇</button>
        ｜
    </div>
</span>
    `,
}