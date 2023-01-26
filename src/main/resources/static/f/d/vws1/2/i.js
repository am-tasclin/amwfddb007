//'use strict'
const { createApp } = Vue
    , allPagesApp = {}
console.log(123, createApp)

const oed01 = createApp({
    data: () => d,
    methods: {
        sum223: () => (2 + 2) ** 3,
    }
})
oed01.component('t-oed-node01', {
    props: { adnId: Number }, data() {
        let r = {
            parent: d.eMap[this.adnId] && d.eMap[this.adnId].parent,
            value_22: d.eMap[this.adnId] && d.eMap[this.adnId].value_22,
            rr_value_22: d.eMap[this.adnId] && d.eMap[this.adnId].rr_value_22,
            r_value_22: d.eMap[this.adnId] && d.eMap[this.adnId].r_value_22,
            r2_value_22: d.eMap[this.adnId] && d.eMap[this.adnId].r2_value_22,
            r: d.eMap[this.adnId] && d.eMap[this.adnId].reference,
            r2: d.eMap[this.adnId] && d.eMap[this.adnId].reference2,
        }
        console.log(r)
        return r
    }, template: "#tOedNode01",
})
oed01.mount('#oed01')



const app1 = createApp({
    data: () => d
})
app1.component('am-tt-test', {
    props: { adnId: Number }, data() {
        return {
            calc: 2 * 3,
            adnEl: d.eMap[this.adnId],
            parent: d.eMap[this.adnId].parent,
        }
    }, template: "#ttTest",
})


app1.mount('#app1')

allPagesApp.app2 = createApp({ data: () => d })
allPagesApp.app2.component('am-ct01', {
    template: `<span>Hi am-ct01 World!</span>`,
})
allPagesApp.app2.mount('#app2')

const pageApp = {
    data: () => d,
    methods: {
        sum2: () => (2 + 2) ** 3,
        increment: () => this.count++
    }

}
allPagesApp.pageApp = createApp(pageApp)
allPagesApp.pageApp.mount('#pageApp')
