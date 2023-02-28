'use strict'
const { createApp, nextTick } = Vue
    , eMap = {} // emap: doc_id:MCrDB ADN Element
    , parentChild = {}
    , pd = {} //pd: Page Data
import { sql_app, l1 } from './l1.js'

fd.eMap = eMap
fd.parentChild = parentChild

pd.session = {}//sn: session
pd.session.hashVrVl = window.location.hash.split(',')

var promiseCount = 0

const runWsOpenInPromise = (sendJson, onMessageFn) => {
    const wsDbSelect = new WebSocket("ws://" + window.location.host + "/dbSelect")
    // console.log(l1.replaceSql(sql_app[sendJson.sqlName].sql).replace(':adnId', sendJson.adnId))
    wsDbSelect.onopen = event => wsDbSelect.send(JSON.stringify(
        Object.assign(sendJson
            , { sql: l1.replaceSql(sql_app[sendJson.sqlName].sql).replace(':adnId', sendJson.adnId) })))
    const onMessagePromise = new Promise((onMessageFn, reject) => wsDbSelect
        .onmessage = event => onMessageFn(event))
    onMessageFn &&
        onMessagePromise.then(onMessageFn)
    return onMessagePromise
}

pd.e = ts => eMap[ts.adnId]
pd.i = (ts, n) => pd.e(ts) && pd.e(ts)[n]
pd.sqlAdnData = event => {
    // console.log(123, event.data)
    JSON.parse(event.data).list
        .forEach(e => (eMap[e.doc_id] = e) && eMap[e.parent] &&
            (parentChild[e.parent] || (parentChild[e.parent] = [])).push(e.doc_id))
}

const fpc01 =
    createApp({
        data() {
            return {
                count: ++promiseCount,
                sn: pd.session,
            }
        }
    })

fpc01.component('t-adntree', {
    template: '#tAdntree', props: { adnId: Number },
    methods: {
        adnClick(adnId) {
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
            count: ++promiseCount,
        }
    }
})
fpc01.mount('#fpc01')

const app =
    createApp({
        mounted() {
            // const adnId = 1 * pd.session.hashVrVl[1], sqlName = 'adn01OneNode'
            // runWsOpenInPromise({ sqlName: 'adn01OneNode', adnId: this.adnId }
            // console.log('app for ->', pd.session.hashVrVl.slice(1).join(','))
            runWsOpenInPromise(
                { sqlName: 'adn01NodesIn', adnId: pd.session.hashVrVl.slice(1).join(',') }
            ).then(pd.sqlAdnData)
            // console.log('app for ->', this.adnId)
        },
        methods: {
            openChildren(adnId) {
                console.log(adnId, parentChild[adnId], `i('doc_id')`)
                if (!parentChild[adnId]) {
                    runWsOpenInPromise({ sqlName: 'adn01Childrens', adnId: this.adnId }
                    ).then(pd.sqlAdnData)
                }
                this.count++
            },
            e() { return pd.e(this) },
            i(n) { return pd.i(this, n) },
        },
        data() {
            return {
                count: ++promiseCount,
                parentChild: parentChild,
                message: 'Hello Vue!',
                adnId: 1 * pd.session.hashVrVl[1]
            }
        }
    })
app.mount('#app')


const log = document.getElementById('log')
log.insertAdjacentHTML('beforeend', '<br>' + promiseCount +
    ') Запуск testPromise (запуск синхронного кода)')

const testPromise = () => {
    const p1 = new Promise((resolve, reject) => {
        const d = Math.random() * 2000 + 1000
        const thisPromiseCount = ++promiseCount
        log.insertAdjacentHTML('beforeend'
            , '<br>' + thisPromiseCount + ') Запуск промиса (запуск асинхронного кода) ' + d + '')
        console.log(d)
        window.setTimeout(() => resolve({ n: thisPromiseCount, d: d }), d)
    })

    p1.then((val) => log.insertAdjacentHTML('beforeend'
        , '<br><br>' + val.n + ') Промис исполнен (асинхронный код завершён) ' + val.d + ''))
    return p1
}

log.insertAdjacentHTML('beforeend'
    , '=>' + promiseCount + ') Промис testPromise создан (синхронный код завершён) ')

//execute asinchron

document.getElementById("btn").addEventListener("click", testPromise)
