'use strict'
const { createApp } = Vue

const message = () => {
    const name = "Jesse";
    const age = 40;
    return name + ' is ' + age + 'years old.';
}
export default message


const dataOed01 = jsLib1.makeEl(d, 'siteTitle count')
dataOed01.tree = jsLib1.tree
dataOed01.pageVl = d.pageVl
dataOed01.eMap = d.eMap

const oed01 = createApp({
    data() { return dataOed01 }, methods: {
        closeAdnVlMenu() {
            d.pageVl.openedAdnVlMenu = null
            this.count++
        }, adnMO(adnId) {
            console.log(adnId)
            d.pageVl.adnIdMO = adnId
            this.count++
        }
    }
})

oed01.component('t-oed01-value', {
    data() { return d.eMap[this.adnId] },
    template: "#tOed01Value", props: { adnId: Number },
})
oed01.component('t-oed01-lmenu', {
    data() { return dataOed01 }, methods: {
        i(n) { return d.eMap[this.adnId] && d.eMap[this.adnId][n] },
        closeAdnVlMenu() {
            d.pageVl.openedAdnVlMenu = null
            this.count++
        }, edAdnValue01() {
            console.log('tt01', this.adnId, this.parent, this.isOpen)
            d.pageVl.openedAdnVlMenu = this.adnId
            this.count++
        }
    }, template: "#tOed01Lmenu", props: { adnId: Number },
})

oed01.mount('#oed01')

createApp({ data() { return dataOed01 } }).mount('#headTitle')
createApp({
    data() { return dataOed01 }, methods: {
        rld() { this.count++ },
    }
}).mount('#headPage')
