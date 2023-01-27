'use strict'
const { createApp } = Vue

const message = () => {
    const name = "Jesse";
    const age = 40;
    return name + ' is ' + age + 'years old.';
}
export default message

const dataOed01 = jsLib1.makeEl(d, 'siteTitle count hw')
dataOed01.tree = jsLib1.tree
dataOed01.pageVl = d.pageVl

const oed01 = createApp({
    data() { return dataOed01 }, methods: {
        test(lr) {
            console.log(123, lr)
        },
    }
})

oed01.component('t-oed01-value', {
    data() { return d.eMap[this.adnId] }, methods: {
    }, template: "#tOed01Value", props: { adnId: Number },
})

oed01.component('t-oed01-lmenu', {
    data() { return d.eMap[this.adnId] }, methods: {
        edAdnValue01() {
            console.log('tt01', this.adnId, this.parent, this.isOpen)
            dataOed01.pageVl.subSepMenuName = 'name_' + this.adnId
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

//- for test-

const app1 = createApp({
    data() { return dataOed01 }, methods: {
        f02app1() {
            this.count++
            d.pageVl.y += 3
            console.log(123, 'f02app1', this.count, d)
        },
    }
}); app1.mount('#app1')

