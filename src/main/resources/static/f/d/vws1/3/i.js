'use strict'
const { createApp } = Vue
d.siteTitle = 'Vue02WebSocket: (vws1/2) '

jsLib1.wsDbSelect = new WebSocket("ws://localhost:8007/dbSelect"
); jsLib1.wsDbSelect.onopen = event => {
    let m = { sqlName: 'adn01OneNode' }
    readAdns(d.init.tree.l.id, sqlFn, m)
    readAdns(d.init.tree.r.id, sqlFn, m)
    m.sqlName = 'adn01Childrens'
    readAdns(d.init.tree.l.openIds, sqlFn, m)
    readAdns(d.init.tree.r.openIds, sqlFn, m)
}; jsLib1.wsDbSelect.onmessage = event => {
    const obj = JSON.parse(event.data)
    if ('adn01Childrens' == obj.sqlName
    ) fillInParentChild(obj)
    else if ('adn01OneNode' == obj.sqlName) {
        if (!dataOed01.eMap[obj.adnId]) {
            dataOed01.eMap[obj.adnId] = obj.list[0]
        }
    }
}

const
    readAdns = (a, sqlFn, m) => a && a.forEach(adnId => !d.eMap[adnId] && jsLib1.
        wsDbSelect.send(JSON.stringify(Object.assign(m
            , { adnId: adnId, 'sql': sqlFn(adnId, m.sqlName) })))),

    sqlFn = (adnId, sqlName) => jsLib1.replaceSql(sql_app[sqlName].sql)
        .replace(':adnId', adnId),

    fillInParentChild = obj => {
        if (!d.parentChild[obj.adnId]) {
            const pc = d.parentChild[obj.adnId] = []
            obj.list.forEach(el => pc.push(el.doc_id) && (d.eMap[el.doc_id] = el))
            console.log(pc)
        }
    }

const dataOed01 = jsLib1.makeElFrom(d, 'siteTitle count')
dataOed01.init = d.init
dataOed01.openedAdnVlMenu = d.openedAdnVlMenu
dataOed01.adnIdMO = d.adnIdMO
dataOed01.eMap = d.eMap
dataOed01.parentChild = d.parentChild
dataOed01.leMap = Object.keys(dataOed01.eMap).length
jsLib1.i = (adnId, n) => d.eMap[adnId] && d.eMap[adnId][n]
export default dataOed01

const oed01 = createApp({
    data() { return dataOed01 }, methods: {
        adnMO(adnId) { this.adnIdMO = adnId }
        , o(adnId) { return d.eMap[adnId] }
        , i(n) { return jsLib1.i(this.adnId, n) }
    }
}); oed01.component('t-oed01-value', {
    methods: {
        i(n) { return jsLib1.i(this.adnId, n) },
        childOnOff(adnId, lr) {
            if (d.init.tree[lr].openIds.includes(adnId))
                d.init.tree[lr].openIds = d.init.tree[lr].openIds.filter(n => n !== adnId)
            else d.init.tree[lr].openIds.push(adnId)
        },
    }, data() { return dataOed01 },
    // }, data() { return d.eMap[this.adnId] },
    template: "#tOed01Value", props: { adnId: Number, lr: String },
}); oed01.component('t-oed01-oc', {//Oc: Open children
    methods: {
        i(n) { return jsLib1.i(this.adnId, n) }
        , adnMO(adnId) { this.adnIdMO = adnId }
        , o(adnId) { return d.eMap[adnId] }
    }, template: "#tOed01Oc", props: { parentId: Number, lr: String }, data() { return dataOed01 },
}); oed01.component('t-oed01-mo', {
    methods: {
        i(n) { return jsLib1.i(this.adnId, n) }
        , closeAdnVlMenu() { this.openedAdnVlMenu = null }
    }, template: "#tOed01Mo", props: { adnId: Number }, data() { return dataOed01 },
}); oed01.component('t-oed01-lmenu', {
    methods: {
        closeAdnVlMenu() { this.openedAdnVlMenu = null }
        , edAdnValue01() { this.openedAdnVlMenu = this.adnId }
        , i(n) { return jsLib1.i(this.adnId, n) },
    }, template: "#tOed01Lmenu", props: { adnId: Number }, data() { return dataOed01 },
}); oed01.mount('#oed01')

createApp({ data() { return dataOed01 } }).mount('#headTitle')

createApp({
    methods: {
        rld() {
            this.count++
            if (Object.keys(dataOed01.eMap).length != dataOed01.leMap) {
                console.log(Object.keys(dataOed01.eMap).length, dataOed01.leMap)
            }
        }, treeStr() { return jsLib1.treeStr() },
    }, data() { return dataOed01 },
}).mount('#headPage')
