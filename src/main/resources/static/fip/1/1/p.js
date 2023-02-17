'use strict'
const { createApp, nextTick } = Vue
    , eMap = {} // emap: doc_id:MCrDB ADN Element
    , parentChild = {}
    , pd = {} //pd: Page Data
import { sql_app, l1 } from './l1.js'

fd.eMap = eMap
fd.parentChild = parentChild


var pageCount = 0

pd.sn = {}//sn: session
pd.sn.hashVrVl = window.location.hash.split(',')

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
const sendSetMessageInPromise = (sendJson, onMessageFn) => {
    wsDbSelect.send(JSON.stringify(sendJson))
    const onMessagePromise = new Promise((onMessageFn, reject) => wsDbSelect
        .onmessage = event => onMessageFn(event))
    return onMessagePromise
}

pd.e = ts => eMap[ts.adnId]
pd.i = (ts, n) => pd.e(ts) && pd.e(ts)[n]
pd.sqlAdnData = event => JSON.parse(event.data).list
    .forEach(e => (eMap[e.doc_id] = e) && eMap[e.parent] &&
        (parentChild[e.parent] || (parentChild[e.parent] = [])).push(e.doc_id))
pd.jsonToSend = (sqlName, adnId) => {
    return { sqlName: sqlName, adnId: adnId, sql: l1.replaceSql(sql_app[sqlName].sql).replace(':adnId', adnId) }
}

const fpc01 =
    createApp({
        mounted() {
            runWsOpenInPromise(
                { sqlName: 'adn01NodesIn', adnId: pd.sn.hashVrVl.slice(1).join(',') }
            ).then(event => {
                pd.sqlAdnData(event)
                sendSetMessageInPromise(pd.jsonToSend('adn01ChildrensIn', pd.sn.hashVrVl.slice(1).join(','))
                ).then(event => {
                    pd.sqlAdnData(event)
                })
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
            !parentChild[adnId] && sendSetMessageInPromise(pd.jsonToSend('adn01Childrens', adnId)
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
