'use strict'
const { createApp, ref } = Vue
d.siteTitle = 'vws02: '

jsLib1.wsDbSelect = new WebSocket("ws://localhost:8007/dbSelect"
);
jsLib1.wsDbSelect.onopen = event => {
    let m = { sqlName: 'adn01OneNode' }
    readAdns(d.init.tree.l.id, sqlFn, m)
    readAdns(d.init.tree.r.id, sqlFn, m)
    m.sqlName = 'adn01Childrens'
    readAdns(d.init.tree.l.openIds, sqlFn, m)
    readAdns(d.init.tree.r.openIds, sqlFn, m)
};
jsLib1.wsDbSelect.onmessage = event => {
    const obj = JSON.parse(event.data)
    if ('adn01Childrens' == obj.sqlName
    ) fillInParentChild(obj)
    else if ('adn01OneNode' == obj.sqlName) {
        if (!d_Oed01.eMap[obj.adnId]) {
            d_Oed01.eMap[obj.adnId] = obj.list[0]
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

const d_Oed01 = jsLib1.makeElFrom(d, 'siteTitle count')
d_Oed01.init = d.init
d_Oed01.hashTitle = jsLib1.hashTitle
d_Oed01.openedAdnVlMenu = d.openedAdnVlMenu
d_Oed01.adnIdMO = d.adnIdMO
d_Oed01.eMap = d.eMap
d_Oed01.parentChild = d.parentChild
d_Oed01.leMap = Object.keys(d_Oed01.eMap).length
jsLib1.i = (adnId, n) => d.eMap[adnId] && d.eMap[adnId][n]
export default d_Oed01

const oed01 = createApp({
    data() { return d_Oed01 }, methods: {
        adnMO(adnId) { this.adnIdMO = adnId }
        , o(adnId) { return d.eMap[adnId] }
        , i(n) { return jsLib1.i(this.adnId, n) }
    }
});
oed01.component('t-oed01-value', {
    methods: {
        i(n) { return jsLib1.i(this.adnId, n) },
        childOnOff(adnId, lr) {
            if (d.init.tree[lr].openIds.includes(adnId))
                d.init.tree[lr].openIds = d.init.tree[lr].openIds.filter(n => n !== adnId)
            else d.init.tree[lr].openIds.push(adnId)
        },
    }, data() { return d_Oed01 },
    template: "#tOed01Value", props: { adnId: Number, lr: String },
});
oed01.component('t-oed01-oc', {//Oc: Open children
    methods: {
        i(n, adnId) { return jsLib1.i(adnId || this.adnId, n) }
        , adnMO(adnId) { this.adnIdMO = adnId }
        , o(adnId) { return d.eMap[adnId] }
    }, template: "#tOed01Oc", props: { parentId: Number, lr: String }, data() { return d_Oed01 },
});

oed01.component('t-oed01-mo', {
    methods: {
        i(n) { return jsLib1.i(this.adnId, n) }
        , closeAdnVlMenu() { this.openedAdnVlMenu = null }
    }, template: "#tOed01Mo", props: { adnId: Number }, data() { return d_Oed01 },
});
oed01.component('t-oed01-edv22', {
    methods: {
        it(e) { d.eMap[this.adnId].v22 = e.target.value }
        , okSave() {
            let v22 = d.eMap[this.adnId].v22
            console.log(v22, this.adnId, 'clickEdValue22')
            delete d.eMap[this.adnId].v22
        },
    }, props: { adnId: Number }, data() {
        return d.eMap[this.adnId]
    }, template: "#tOed01Edv22"
});
oed01.component('t-oed01-lmenu', {
    methods: {
        closeAdnVlMenu() { this.openedAdnVlMenu = null }
        , edAdnValue01() { this.openedAdnVlMenu = this.adnId }
        , i(n) { return jsLib1.i(this.adnId, n) }
    }, template: "#tOed01Lmenu", props: { adnId: Number, edValue22: String }, data() {
        return d_Oed01
    },
});
oed01.mount('#oed01')

oed01.config.errorHandler = err => console.error('-oed01-', err)

createApp({ data() { return d_Oed01 } }).mount('#headTitle')

createApp({
    methods: {
        rld() {
            this.count++
            if (Object.keys(d_Oed01.eMap).length != d_Oed01.leMap) {
                console.log(Object.keys(d_Oed01.eMap).length, d_Oed01.leMap)
            }
        }, treeStr() { return jsLib1.treeStr() },
    }, data() { return d_Oed01 },
}).mount('#headPage')
