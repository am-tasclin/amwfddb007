//'use strict'
const { createApp } = Vue
    , allPagesApp = {}
console.log(123, createApp)

const oed01 = createApp({
    data() { return d },
    methods: {
        sum223: () => (2 + 2) ** 3,
        f123() {
            console.log(123)
        },
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
oed01.component('t-oed01-node-lmenu', {
    props: { adnId: Number }, data() {
        return jsLib1.makeEl(this.adnId, 'p r r2')
    },
    methods: {
        check() { this.checked = !this.checked; },
        f2233: () => {
            console.log(123, 'f2233')
        },
    }
    , template: "#tOed01NodeLmenu",
})
oed01.component('t-oed-node01', {
    props: { adnId: Number }, data() {
        return jsLib1.makeEl(this.adnId, 'p r r2 v_22 r_v_22 rr_v_22 r2_v_22')
    }, template: "#tOedNode01",
})
oed01.mount('#oed01')

oed01.config.errorHandler = (err) => {
    console.error('-oed01-',err)
}


const app1CreateConstant = {
    data: () => d,
    methods: {
        f02app1: () => {
            console.log(123, 'f02app1')
        },
    }
}
const app1 = createApp(app1CreateConstant)
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

allPagesApp.app2 = createApp({
    data: () => d,
    methods: {
        f03app2: () => {
            console.log(123, 'f03app2')
        },
    }
})
allPagesApp.app2.component('am-ct01', {
    template: `<span>Hi am-ct01 World!</span>`,
})
allPagesApp.app2.mount('#app2')

const pageApp = {
    data: () => d,
    methods: {
        sum2: () => (2 + 2) ** 3,
        increment: () => this.count++,
        f01pa: () => {
            console.log(123, 'f01pa')
        },
    }
}
allPagesApp.pageApp = createApp(pageApp)
allPagesApp.pageApp.mount('#pageApp')
