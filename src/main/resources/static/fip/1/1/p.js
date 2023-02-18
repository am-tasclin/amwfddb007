'use strict'
const { createApp, nextTick } = Vue
    , eMap = {} // emap: doc_id:MCrDB ADN Element
    , parentChild = {}
    , pd = {} //pd: Page Data
import { sql_app, l1 } from './l1.js'

fd.eMap = eMap
fd.parentChild = parentChild

pd.sn = {}//sn: session
pd.sn.hashVrVl = window.location.hash.split(',')
fd.sn = pd.sn

const wsDbSelect = new WebSocket("ws://" + window.location.host + "/dbSelect")

const runWsOpenInPromise = (sendJson, onMessageFn) => {
    // console.log(l1.replaceSql(sql_app[sendJson.sqlName].sql).replace(':adnId', sendJson.adnId))
    wsDbSelect.onopen = event => wsDbSelect.send(JSON.stringify(
        Object.assign(sendJson
            , { sql: l1.replaceSql(sql_app[sendJson.sqlName].sql).replace(':adnId', sendJson.adnId) })))
    const onMessagePromise = new Promise((onMessageFn, reject) => wsDbSelect
        .onmessage = event => onMessageFn(event))
    // onMessageFn && onMessagePromise.then(onMessageFn)
    return onMessagePromise
}

pd.e = ts => eMap[ts.adnId]
pd.i = (ts, n) => pd.e(ts) && pd.e(ts)[n]
pd.jsonToSend = (sqlName, adnId) => true
    && { sqlName: sqlName, adnId: adnId, sql: l1.replaceSql(sql_app[sqlName].sql).replace(':adnId', adnId) }

fd.jsonToSend = pd.jsonToSend

//make [[1],[1,2],[1,2,3]] from 3
pd.listDeepNum = deep => Array.from(Array(deep), (_, i) => i + 1)
    .reduce((n, m) => n.push(Array.from(Array(m), (_, i) => i + 1)) && n, [])

//make SELECT … parent IN (…) from deep
pd.listDeepSql = (a, inl) => a.reduce((n, m) => n.push(m.reduce((n1, m1) => m1 > 1
    && 'SELECT doc_id FROM doc WHERE parent IN (' + n1 + ')' || n1, inl)) && n, [])

pd.sqlAdnData = event => JSON.parse(event.data).list
    .forEach(e => (eMap[e.doc_id] = e) && eMap[e.parent] &&
        (parentChild[e.parent] || (parentChild[e.parent] = [])).push(e.doc_id)) || true

const sendAndSetMessageFn = (sendJson, onMessageFn) => {
    wsDbSelect.send(JSON.stringify(sendJson))
    const onMessagePromise = new Promise((onMessageFn, reject) => wsDbSelect
        .onmessage = event => onMessageFn(event))
    return onMessagePromise
}

const readParentDeep = listDeepSql => sendAndSetMessageFn(pd
    .jsonToSend('adn01ChildrensIn', listDeepSql[0])).then(event => {
        pd.sqlAdnData(event)
        listDeepSql.length > 1 && readParentDeep(listDeepSql.shift() && listDeepSql)
    })

fd.listDeepNum = pd.listDeepNum
fd.listDeepSql = pd.listDeepSql

var pageCount = 0

const fpc01 = createApp({
    async mounted() {
        await runWsOpenInPromise(
            { sqlName: 'adn01NodesIn', adnId: pd.sn.hashVrVl.slice(1).join(',') }
        ).then(event => {
            pd.sqlAdnData(event)
            readParentDeep(pd.listDeepSql(pd.listDeepNum(3), pd.sn.hashVrVl.slice(1).join(',')))
        })
    },
    data() {
        return {
            count: ++pageCount,
            sn: pd.sn,
        }
    }
})

fpc01.component('t-adntree', {
    template: '#tAdntree', props: { adnId: Number },
    methods: {
        adnClick(adnId) {
            !parentChild[adnId] && sendAndSetMessageFn(pd.jsonToSend('adn01Childrens', adnId)
            ).then(event => {
                pd.sqlAdnData(event)
            })
            this.count++
        },
        adnClickTODEL(adnId) {
            !parentChild[adnId] && (() => runWsOpenInPromise(
                { sqlName: 'adn01Childrens', adnId: adnId }
            ).then(pd.sqlAdnData))()
            this.count++
        },
        parentChild(adnId) { return parentChild[adnId] || [] },
        onOffChild() {
            return (parentChild[this.adnId] || []).length > 0 && eMap[this.adnId] && (eMap[this.adnId].openChild = !eMap[this.adnId].openChild)
        },
        e() { return pd.e(this) },
        i(n) { return pd.i(this, n) },
    },
    data() {
        return {
            count: ++pageCount,
        }
    }
})

fpc01.mount('#fpc01')
