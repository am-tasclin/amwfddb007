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
// pd.cmd.fcwRawList = () => window.location.hash.substring(1).split(';')
pd.cmd.fcwRawArray = window.location.hash.substring(1).split(';')
//pd.sn.panel.l split '|', pagePart level
fd.cmd.fcwRawArray.reduce((n, m, i) => m.includes('|')
    && (fd.sn.panel.l[m.split(',')[0]] = m.split('|')[1].split(','))
    && (fd.cmd.fcwRawArray[i] = m.split('|')[0]), '')
//pd.sn.p[…]={123:{}}; pagePart = m.split(',')[0].split('_')[1];

!window.location.hash.includes('#init_') &&
    pd.cmd.fcwRawArray.filter(k => k.includes('p_'))
        .reduce((n, m) => (pd.sn.p || (pd.sn.p = {}))
            && (pd.sn.p[m.split(',')[0].split('_')[1]] || (pd.sn.p[m.split(',')[0].split('_')[1]] = {}))
            && m.split(',').splice(1).reduce((n1, m1) => pd.sn
                .p[m.split(',')[0].split('_')[1]][m1] = {}, '')
            , 0)

window.location.hash.includes('#init_') && (pd.sn.jn =
    JSON.parse(decodeURI(window.location.hash.split('#init_')[1]))
) && Object.keys(pd.sn.jn).filter(k => k.includes('p_'))
    .reduce((n, m) => (pd.sn.p || (pd.sn.p = {}))
        && (pd.sn.p[m.split('_')[1]] || (pd.sn.p[m.split('_')[1]] = {}))
        && pd.sn.jn[m].reduce((n1, m1) => pd.sn.p[m.split('_')[1]][m1] = {}, 0)
        , 0)

console.log(pd.sn.p)

//first/rest coma split, first is KEY, id-list level
pd.cmd.fcwSessionParser = () => pd.cmd
    .fcwRawArray.reduce((n, m) => (n[m.split(',')[0]] = m.split(',').slice(1)) && n, {})

!pd.sn.jn && (
    pd.sn.jn = pd.cmd.fcwSessionParser()
)

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

createApp({
    methods: {
        initLink() { window.location.href = '#init_' + JSON.stringify(pd.sn.jn) }
    }, data() { return { count: ++pageCount, } },
}).mount('#headPage')

const fpc01 = createApp({
    data() {
        return { count: ++pageCount, ppMenuList: pd.ppMenuList }
    },
    methods: {
        sn() { return pd.sn },
        ppsHref(n) {
            // console.log(pd.cmd.fcwRawList().filter(m => !m.includes('pps')).join(';'), pd.cmd.fcwRawList())
            const h = (n + ',' + pd.sn.jn.pps.join(',').replace(n, '').replace('pps', ''))
                .replace(',,', ',')
                , h2 = ',' == h.slice(-1) && h.slice(0, -1) || h
                , h3 = pd.cmd.fcwRawArray.filter(m => !m.includes('pps')).join(';')
            //, h3 = pd.cmd.fcwRawList().filter(m => !m.includes('pps')).join(';')
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

//buildJSON: library for JSON build and convert from MetaContentDB
const buildJSON = { typeOf: {}, stringify: {} }

buildJSON.stringify.Structure = json => JSON.stringify(json, (k, v) => (
    'mc' == k && JSON.stringify(v)) || v, 2)
    .replace(/\s+}/g, '}')
    .replace(/mc":\s"{/g, 'mc":{').replace(/{\s+"mc":/g, '{"mc":')
    .replace(/}"}/g, '}}').replace(/}",/g, '},').replace(/\\"/g, '"')
    .replace(/\[\s+{/g, '[{').replace(/}\s+]/g, '}]')

buildJSON.stringify.NativeMetaContent = json => JSON.stringify(json, (k, v) => (
    ('eMap' == k || 'parentChild' == k) && JSON.stringify(v)) || v, 2)
    .replace(/\\"/g, '"')
    .replace(/},"/g, '},\n"')
    .replace(/}}"/g, '}}')
    .replace(/eMap": "{"/g, 'eMap": {\n"')
    .replace(/],"/g, '],\n"')
    .replace(/parentChild": "{/g, 'parentChild": {\n')
    .replace(/]}"/g, ']}')

buildJSON.typeOf.keyIsObjName = i => eMap[i].value_22 || eMap[i].r_value_22

pd.makeNativeMetaContent = (adnId, json) => (json.eMap[adnId] = {})
    && Object.keys(eMap[adnId]).filter(key => eMap[adnId][key])
        .forEach(key => json.eMap[adnId][key] = eMap[adnId][key])
    || parentChild[adnId] && (json.parentChild[adnId] = parentChild[adnId])
    && json.parentChild[adnId]
        .reduce((n, m) => pd.makeNativeMetaContent(m, json), 0)

buildJSON.typeOf.NativeMetaContent = (adnId, json) => {
    json.keyIsObjName = buildJSON.typeOf.keyIsObjName(adnId)
    json.typeJson = 'metContentNative01'
    const mcn = json[json.keyIsObjName] = { eMap: {}, parentChild: {} }
    pd.makeNativeMetaContent(adnId, json[json.keyIsObjName])
    return json
}

buildJSON.typeOf.Structure = (adnId, json) => {
    json.keyIsObjName = buildJSON.typeOf.keyIsObjName(adnId)
    json.typeJson = 'FHIR.Structure'
    buildJSON.typeOf.se2Parent(json[json.keyIsObjName] = {}, adnId)
    return json
}
buildJSON.typeOf.se2Parent = (jn, pId) => parentChild[pId].forEach(eId => {
    // const kName = eMap[eId].value_22 || eMap[eId].r_value_22
    const kName = buildJSON.typeOf.keyIsObjName(eId)
        , doctype = eMap[eId].doctype || eMap[eId].r_doctype

    jn[kName] = ''
    eMap[eId].doctype && (jn[kName] = eMap[eId].doctype + ' ::_dataType_')

    // console.log(123, eId, eMap[eId].doctype, doctype == 37)

    doctype == 37 && (jn[kName] = [{}])
    parentChild[eId] && doctype != 37 && (jn[kName] = {})
    let e = doctype == 37 && jn[kName][0] || jn[kName]
    parentChild[eId] && buildJSON.typeOf.se2Parent(e, eId)
})

//build mc: meta-content id block
buildJSON.mc = e => {
    const mc = { id: e.doc_id }
    e.reference && (mc.r = e.reference)
    e.reference2 && (mc.r2 = e.reference2)
    return mc
}
buildJSON.key = e => e && (e.value_22 || e.r_value_22 || e.rr_value_22)
// add and return (1)one mc
buildJSON.add1Mc = (jn, i) => eMap[i] && (
    jn[buildJSON.key(eMap[i])] = { mc: buildJSON.mc(eMap[i]) }) && jn[buildJSON.key(eMap[i])]
buildJSON.mcParent = (jn, i) => parentChild[i] && parentChild[i]
    .forEach(j => buildJSON.mcParent(buildJSON.add1Mc(jn, j), j))
buildJSON.mcFirst = (jn, i) => buildJSON.add1Mc(jn, i) && buildJSON.mcParent(jn, i)

fpc01.component('t-page-part', {
    template: '#tPagePart', props: { pagePart: String },
    data() { return { count: ++pageCount, } },
    // data() { return { count: ++pageCount, sn: pd.sn, } },
    methods: {
        sn() { return pd.sn },
        buildJSON(adnId, typeOf) {
            const json = {}

            // !typeOf.includes('add_') && !pd.sn.p[this.pagePart][adnId].typeOf
            !typeOf.includes('add_') // && !pd.sn.p[this.pagePart][adnId].typeOf
                && (pd.sn.p[this.pagePart][adnId].typeOf = typeOf)

            console.log(123, typeOf, this.count, adnId, pd.sn.p[this.pagePart]
                , typeOf.includes('add_')
            )

            pd.sn.p[this.pagePart][adnId].typeOf
                && buildJSON.typeOf[pd.sn.p[this.pagePart][adnId].typeOf]
                && buildJSON.typeOf[pd.sn.p[this.pagePart][adnId].typeOf](adnId, json)

            //add [], +/- On/Off add/remove FOR pd.sn.p[this.pagePart][adnId]
            typeOf.includes('add_') &&
                (pd.sn.p[this.pagePart][adnId].add || (pd.sn.p[this.pagePart][adnId].add = []))
                && (pd.sn.p[this.pagePart][adnId].add.includes(typeOf.split('_')[1])
                    && pd.sn.p[this.pagePart][adnId].add.splice(
                        pd.sn.p[this.pagePart][adnId].add.indexOf(typeOf.split('_')[1]), 1)
                    || pd.sn.p[this.pagePart][adnId].add.splice(0, 0, typeOf.split('_')[1])
                )

            pd.sn.p[this.pagePart][adnId].add &&
                pd.sn.p[this.pagePart][adnId].add.includes('metaContentId')
                && (json.metaContentId = {}) && (() => {
                    console.log(1231, typeOf, json, pd.sn.p[this.pagePart][adnId])
                    buildJSON.mcFirst(json.metaContentId, adnId)
                })()

            buildJSON.stringify[pd.sn.p[this.pagePart][adnId].typeOf]
                && ((pd.sn.jsonStr || (pd.sn.jsonStr = {}))[adnId] = buildJSON
                    .stringify[pd.sn.p[this.pagePart][adnId].typeOf](json))
            this.count++
        },
        isJsonPart(adnId, jsonPart) {
            return pd.sn.p[this.pagePart] && pd.sn.p[this.pagePart][adnId]
                && pd.sn.p[this.pagePart][adnId].add
                && pd.sn.p[this.pagePart][adnId].add.includes(jsonPart)
        },
        jsonStr(adnId) { return pd.sn.jsonStr && pd.sn.jsonStr[adnId] },
        isPanel(adnId) {
            return pd.isPanel(this.pagePart, adnId)
            // return pd.sn.p && pd.sn.p[this.pagePart] && pd.sn.p[this.pagePart][adnId]
        },
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
        isOpenChild(adnId) { return pd.isOpenChild(adnId) },
    },
    mounted() {
        // console.log(this.pagePart)
    },
})

pd.isOpenChild = adnId => parentChild[adnId] && parentChild[adnId].length > 0 && eMap[adnId]
    && (eMap[adnId].openChild === undefined || eMap[adnId].openChild)
pd.isPanel = (pagePart, adnId) => pd.sn.p && pd.sn.p[pagePart] && pd.sn.p[pagePart][adnId]

fpc01.component('t-adntree', {
    template: '#tAdntree', props: { adnId: Number, pagePart: String }, data() { return { count: ++pageCount, } },
    methods: {
        isPanel() {
            return pd.isPanel(this.pagePart, this.adnId)
            // return pd.sn.p && pd.sn.p[this.pagePart] && pd.sn.p[this.pagePart][this.adnId]
        },
        sn() { return pd.sn },
        adnClick(adnId) {
            !parentChild[adnId] && sendAndSetMessageFn(pd.jsonToSend('adn01Childrens', adnId)
            ).then(event => {
                pd.sqlAdnData(event)
            })
            pd.onOffChild(adnId)
            this.count++
        },
        parentChild(adnId) { return parentChild[adnId] || [] },
        isOpenChild(adnId) { return pd.isOpenChild(adnId) },
        e() { return pd.e(this) },
        i(n) { return pd.i(this, n) },
    },
})

fpc01.mount('#fpc01')

