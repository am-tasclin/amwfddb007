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
// jsLib1.makeEl = (adnId, nodeList, adnNameChange) => {
jsLib1.makeEl = (adnId, nodeList) => {
    const r = {}, nl = nodeList.trim().split(' ')
    if (d.eMap[adnId]) Object.keys(adnNameChange)
        .forEach(propName => d.eMap[adnId][adnNameChange[propName]] && (
            r[propName] = d.eMap[adnId][adnNameChange[propName]]))
    return r
}
const adnNameChange = {
    p: 'parent', r: 'reference', r2: 'reference2',
    v_22: 'value_22',
    r_v_22: 'r_value_22', rr_v_22: 'rr_value_22',
    r2_v_22: 'r2_value_22',
}
oed01.component('t-oed-node01', {
    props: { adnId: Number }, data() {
        return jsLib1.makeEl(this.adnId, 'p r r2 v_22 r_v_22 rr_v_22 r2_v_22 ')
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
