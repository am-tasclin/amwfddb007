'use strict'
const { createApp, ref } = Vue
    , pd = {} //pd: Page Data
pd.siteTitle = 'FPC'
pd.fElId = 373071
pd.count = 0
pd.hashVrVl = window.location.hash.split('_')
pd.isHashVr = n => pd.hashVrVl[0].indexOf(n) == 1
pd.isHashVr('fElId') && (pd.fElId = 1 * pd.hashVrVl[1])

jsLib1.wsDbSelect = new WebSocket("ws://" + window.location.host + "/dbSelect")

jsLib1.wsDbSelect.onopen = event => {
    const m = { sqlName: 'adn01OneNode' }
    readAdns([pd.fElId], sqlFn, m)
}

jsLib1.wsDbSelect.onmessage = event => {
    const obj = JSON.parse(event.data)
    console.log(obj)
}

const
    readAdns = (a, sqlFn, m) => a && a.forEach(adnId => !d.eMap[adnId] && jsLib1.
        wsDbSelect.send(JSON.stringify(Object.assign(m
            , { adnId: adnId, 'sql': sqlFn(adnId, m.sqlName) })))),

    sqlFn = (adnId, sqlName) => jsLib1.replaceSql(sql_app[sqlName].sql)
        .replace(':adnId', adnId)

createApp({ data() { return pd } }).mount('#fpc01')

createApp({ data() { return pd } }).mount('#headTitle')
createApp({ data() { return pd } }).mount('#id01')
