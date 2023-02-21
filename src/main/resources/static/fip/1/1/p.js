'use strict'
const { createApp, nextTick } = Vue
    , eMap = {} // emap: doc_id:MCrDB ADN Element
    , parentChild = {}
    , pd = {} //pd: Page Data
import { sql_app, l1 } from './l1.js'

fd.eMap = eMap
fd.parentChild = parentChild

pd.sn = {}//sn: session
pd.sn.panel = { l: {}, f: {} }
fd.sn = pd.sn

pd.cmd = {}//cmd: command
fd.cmd = pd.cmd
pd.cmd.fcwRawList = () => window.location.hash.substring(1).split(';')
pd.cmd.fcwRawArray = pd.cmd.fcwRawList()
fd.cmd.fcwRawArray.reduce((n, m, i) => m.includes('|')
    && (fd.sn.panel.l[m.split(',')[0]] = m.split('|')[1].split(','))
    && (fd.cmd.fcwRawArray[i] = m.split('|')[0]), '')

pd.cmd.fcwSessionParser = () => pd.cmd
    .fcwRawArray.reduce((n, m) => (n[m.split(',')[0]] = m.split(',').slice(1)) && n, {})

pd.sn.jn = pd.cmd.fcwSessionParser()
console.log(pd.sn)

//pps: Page Part Sequence
!pd.sn.jn.pps
    && (pd.sn.jn.pps = Object.keys(pd.sn.jn).filter(n => !n.includes('pps')))

//fcw: FHIR Code Word
pd.sn.fcw = {
    fEt: 'Element',
    fTy: 'Terminology',
    fDd: 'Data Dictionary',
    fPl: 'Profile',
    lr: 'Left|Right ::mc', //mc: Midnight Commander
}

const wsDbSelect = new WebSocket("ws://" + window.location.host + "/dbSelect")

const runWsOpenInPromise = (sendJson, onMessageFn) => {
    wsDbSelect.onopen = event => wsDbSelect.send(JSON.stringify(Object.assign(sendJson, {
        sql: l1.replaceSql(sql_app[sendJson.sqlName].sql).replace(':adnId', sendJson.adnId)
    })))
    const onMessagePromise = new Promise((onMessageFn, reject) => wsDbSelect
        .onmessage = event => onMessageFn(event))
    // onMessageFn && onMessagePromise.then(onMessageFn)
    return onMessagePromise
}

pd.e = ts => eMap[ts.adnId]
pd.i = (ts, n) => pd.e(ts) && pd.e(ts)[n]
//make [[1],[1,2],[1,2,3]] from 3
pd.listDeepNum = deep => Array.from(Array(deep), (_, i) => i + 1)
    .reduce((n, m) => n.push(Array.from(Array(m), (_, i) => i + 1)) && n, [])

//make SELECT … parent IN (…) from deep
pd.listDeepSql = (a, inl) => a.reduce((n, m) => n.push(m.reduce((n1, m1) => m1 > 1
    && 'SELECT doc_id FROM doc WHERE parent IN (' + n1 + ')' || n1, inl)) && n, [])

const sendAndSetMessageFn = (sendJson, onMessageFn) => {
    wsDbSelect.send(JSON.stringify(sendJson))
    const onMessagePromise = new Promise((onMessageFn, reject) => wsDbSelect
        .onmessage = event => onMessageFn(event))
    return onMessagePromise
}

pd.jsonToSend = (sqlName, adnId) => true
    && { sqlName: sqlName, adnId: adnId, sql: l1.replaceSql(sql_app[sqlName].sql).replace(':adnId', adnId) }

fd.jsonToSend = pd.jsonToSend

pd.sqlAdnData = event => JSON.parse(event.data).list
    .forEach(e => (eMap[e.doc_id] = e) && eMap[e.parent] &&
        (parentChild[e.parent] || (parentChild[e.parent] = [])).push(e.doc_id)) || true

const readParentDeep = listDeepSql => sendAndSetMessageFn(pd
    .jsonToSend('adn01ChildrensIn', listDeepSql[0])).then(event => {
        pd.sqlAdnData(event)
        listDeepSql.length > 1 && readParentDeep(listDeepSql.shift() && listDeepSql)
    })

fd.listDeepNum = pd.listDeepNum
fd.listDeepSql = pd.listDeepSql

var pageCount = 0
pd.ppMenuList = Object.keys(pd.sn.jn).filter(n => 'pps' != n)

console.log(pd.ppMenuList)

const fpc01 = createApp({
    data() {
        return { count: ++pageCount, sn: pd.sn, ppMenuList: pd.ppMenuList }
    },
    methods: {
        ppsHref(n) {
            // console.log(pd.cmd.fcwRawList().filter(m => !m.includes('pps')).join(';'), pd.cmd.fcwRawList())
            const h = (n + ',' + pd.sn.jn.pps.join(',').replace(n, '').replace('pps', ''))
                .replace(',,', ',')
                , h2 = ',' == h.slice(-1) && h.slice(0, -1) || h
                , h3 = pd.cmd.fcwRawList().filter(m => !m.includes('pps')).join(';')
            return 'pps,' + h2 + ';' + h3

        }
    },
    mounted() {
        const allAndIds = Object.keys(pd.sn.jn).filter(n => !n.includes('pps')).reduce(
            (n, m) => n + ',' + pd.sn.jn[m].join(','), '').substring(1)
        runWsOpenInPromise(
            { sqlName: 'adn01NodesIn', adnId: allAndIds }
        ).then(event => {
            pd.sqlAdnData(event)
            readParentDeep(pd.listDeepSql(pd.listDeepNum(3), allAndIds))
        })
    },
})

pd.onOffChild = (adnId) => (parentChild[adnId] || []).length > 0 && eMap[adnId]
    && (eMap[adnId].openChild = !eMap[adnId].openChild)
pd.cmd.ppHref = () => '#' + Object.keys(fd.sn.jn).reduce((n, m) => n
    + ';' + m + ',' + fd.sn.jn[m].join(','), '').substring(1)

pd.sn.ppClose = []

fpc01.component('t-page-part', {
    template: '#tPagePart', props: { pagePart: String },
    data() { return { count: ++pageCount, } },
    // data() { return { count: ++pageCount, sn: pd.sn, } },
    methods: {
        sn() { return pd.sn },
        ppClick(pagePart) {
            !pd.sn.ppClose.includes(pagePart) && pd.sn.ppClose.splice(0, 0, pagePart)
                || pd.sn.ppClose.splice(pd.sn.ppClose.indexOf(pagePart), 1)
            this.count++
        },
        ppToFirst(pagePart, n) {
            const i = pd.sn.jn[pagePart].indexOf(n)
            console.log(pagePart, i, n, pd.sn.jn[pagePart], pd.sn.jn[pagePart].indexOf(n))
            pd.sn.jn[pagePart] = pd.sn.jn[pagePart].splice(i, 1).concat(pd.sn.jn[pagePart])
            this.count++
            window.location.href = pd.cmd.ppHref()
        },
    },
    mounted() {
        // console.log(this.pagePart)
    },
})

fpc01.component('t-adntree', {
    template: '#tAdntree', props: { adnId: Number }, data() { return { count: ++pageCount, } },
    methods: {
        adnClick(adnId) {
            !parentChild[adnId] && sendAndSetMessageFn(pd.jsonToSend('adn01Childrens', adnId)
            ).then(event => {
                pd.sqlAdnData(event)
            })
            pd.onOffChild(adnId)
            this.count++
        },
        parentChild(adnId) { return parentChild[adnId] || [] },
        isOpenChild(adnId) {
            return (parentChild[adnId] || []).length > 0 && eMap[adnId]
                && (eMap[adnId].openChild === undefined || eMap[adnId].openChild)
        },
        e() { return pd.e(this) },
        i(n) { return pd.i(this, n) },
    },
})

fpc01.mount('#fpc01')
