'use strict'
const { createApp, nextTick, ref } = Vue
    , eMap = {} // emap: doc_id:MCrDB ADN Element
    , parentChild = {} // parent:[Child ids]
    , pd = {} //pd: Page Data


pd.siteTitle = 'FPC'
pd.count = 0
pd.hashVrVl = window.location.hash.split('_')
pd.isHashVr = n => pd.hashVrVl[0].indexOf(n) == 1
// pd.isHashVr('fElId') && (pd.fElId = 1 * pd.hashVrVl[1])
pd.fElId = pd.isHashVr('fElId')? (1 * pd.hashVrVl[1]): 373071

//for development
fd.eMap = eMap
fd.parentChild = parentChild
//for development


jsLib1.wsDbSelect = new WebSocket("ws://" + window.location.host + "/dbSelect")

jsLib1.wsDbSelect.onopen = event => {
    'adn01OneNode_adn01Childrens'.split('_')
        .forEach(sqlName => readAdns([pd.fElId], sqlFn, { sqlName: sqlName }))
}

jsLib1.wsDbSelect.onmessage = event => {
    const obj = JSON.parse(event.data)
    console.log(obj)
    if ('adn01OneNode' == obj.sqlName)
        eMap[obj.list[0].doc_id] = obj.list[0]
    else 'adn01Childrens' == obj.sqlName && obj.list
        .forEach(el => (parentChild[obj.adnId] || (parentChild[obj.adnId] = [])
        ) && (eMap[el.doc_id] = el) && parentChild[obj.adnId].push(el.doc_id))
}

const
    readAdns = (a, sqlFn, m) => a && a.forEach(adnId => !d.eMap[adnId] && jsLib1.
        wsDbSelect.send(JSON.stringify(Object.assign(m
            , { adnId: adnId, 'sql': sqlFn(adnId, m.sqlName) })))),

    sqlFn = (adnId, sqlName) => jsLib1.replaceSql(sql_app[sqlName].sql)
        .replace(':adnId', adnId)

const fpc01 = createApp({
    methods: {
        i(id, n) { return eMap[id] && eMap[id][n] }
    }, data() { return pd }
})

fpc01.component('t-adn-view', {
    props: { adnId: Number },
    mounted() {
        this.count++
        console.log(this.count)
    }, methods: {
        increment() { this.count++ },
        //i: get Adn Attribute Value
        i(n) { return eMap[this.adnId] && eMap[this.adnId][n] },
        p() {return parentChild[this.adnId]}
    }, data() { return { count: 1 } },
    template: '#tAdnView',
})

fpc01.mount('#fpc01')

createApp({ data() { return pd } }).mount('#headTitle')
createApp({ data() { return pd } }).mount('#id01')
