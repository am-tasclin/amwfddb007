'use strict'
const { createApp } = Vue

const message = () => {
    const name = "Jesse"
    const age = 40
    return name + ' is ' + age + 'years old.'
}
//export default message

jsLib1.wsDbSelect = new WebSocket("ws://localhost:8007/dbSelect"
); jsLib1.wsDbSelect.onopen = event => {
    console.log(123)
    readAdns(jsLib1.tree.r)
}; jsLib1.wsDbSelect.onmessage = event => {
    const obj = JSON.parse(event.data)
    console.log(obj.adnId, obj.list[0])
    if (!dataOed01.eMap[obj.adnId]) {
        console.log(obj.adnId, obj)
        dataOed01.eMap[obj.adnId] = obj.list[0]
    }
}

const readAdns = a => a.forEach(adnId => {
    if (!d.eMap[adnId]) {
        const sql = jsLib1.replaceSql(sql_app.adn01OneNode.sql
        ).replace(':adnId', adnId)
            , jn = { adnId: adnId, sql: sql }
        jsLib1.wsDbSelect.send(JSON.stringify(jn))
    }
})

const dataOed01 = jsLib1.makeElFrom(d, 'siteTitle count')
dataOed01.tree = jsLib1.tree
dataOed01.pageVl = d.pageVl
dataOed01.eMap = d.eMap
dataOed01.leMap = Object.keys(dataOed01.eMap).length
jsLib1.i = (adnId, n) => d.eMap[adnId] && d.eMap[adnId][n]
export default dataOed01

const oed01 = createApp({
    data() { return dataOed01 }, methods: {
        closeAdnVlMenu() {
            d.pageVl.openedAdnVlMenu = null
            this.count++
        }, adnMO(adnId) {//MO:mouseover
            d.pageVl.adnIdMO = adnId
            this.count++
        }, o(adnId) { return d.eMap[adnId] }
        , i(n) { return jsLib1.i(this.adnId, n) }
    }
}); oed01.component('t-oed01-value', {
    methods: {
        i(n) { return jsLib1.i(this.adnId, n) },
    }, data() { return d.eMap[this.adnId] },
    template: "#tOed01Value", props: { adnId: Number },
}); oed01.component('t-oed01-mo', {
    methods: {
        i(n) { return jsLib1.i(this.adnId, n) },
    }, template: "#tOed01Mo", props: { adnId: Number }, data() { return dataOed01 },
}); oed01.component('t-oed01-lmenu', {
    methods: {
        closeAdnVlMenu() {
            d.pageVl.openedAdnVlMenu = null
            this.count++
        }, edAdnValue01() {
            d.pageVl.openedAdnVlMenu = this.adnId
            this.count++
        }, i(n) { return jsLib1.i(this.adnId, n) },
    }, template: "#tOed01Lmenu", props: { adnId: Number }, data() { return dataOed01 },
}); oed01.mount('#oed01')

createApp({ data() { return dataOed01 } }).mount('#headTitle')

console.log(123)

createApp({
    methods: {
        rld() {
            // readAdns(jsLib1.tree.r)
            console.log(d.eMap)
            this.count++
            if (Object.keys(dataOed01.eMap).length != dataOed01.leMap) {
                console.log(Object.keys(dataOed01.eMap).length, dataOed01.leMap)
            }
        },
        treeStr() { return jsLib1.treeStr() },
    }, data() { return dataOed01 },
}).mount('#headPage')
