'use strict'
const { createApp, ref } = Vue
    , eMap = {} // emap: doc_id:MCrDB ADN Element
    , parentChild = {} // parent:[Child ids]
    , pd = {} //pd: Page Data
pd.siteTitle = 'FPC'
pd.fElId = 373071
pd.count = 0
pd.hashVrVl = window.location.hash.split('_')
pd.isHashVr = n => pd.hashVrVl[0].indexOf(n) == 1
pd.isHashVr('fElId') && (pd.fElId = 1 * pd.hashVrVl[1])

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

createApp({
    methods: {
        i(id, n) { return eMap[id] && eMap[id][n] }
    }, data() { return pd }
}).mount('#fpc01')

createApp({ data() { return pd } }).mount('#headTitle')
createApp({ data() { return pd } }).mount('#id01')
