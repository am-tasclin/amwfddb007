'use strict'
const { createApp, nextTick } = Vue
    , eMap = {} // emap: doc_id:MCrDB ADN Element
    , parentChild = {}
    , pd = {} //pd: Page Data
import { sql_app, wsDbC } from './l1.js'
// import { sql_app, l1, wsDs } from './l1.js'

wsDbC.eMap = eMap
wsDbC.parentChild = parentChild

fd.eMap = eMap
fd.parentChild = parentChild

pd.session = {}//sn: session
pd.session.panel = { l: {}, f: {} }
fd.session = pd.session

pd.cmd = {}//cmd: command
fd.cmd = pd.cmd
// pd.cmd.fcwRawList = () => window.location.hash.substring(1).split(';')
pd.cmd.fcwRawArray = window.location.hash.substring(1).split(';')
fd.fcwRawArray = pd.cmd.fcwRawArray
//pd.session.panel.l split '|', pagePart level
fd.cmd.fcwRawArray.reduce((n, m, i) => m.includes('|')
    && (fd.session.panel.l[m.split(',')[0]] = m.split('|')[1].split(','))
    && (fd.cmd.fcwRawArray[i] = m.split('|')[0]), '')
//pd.session.p[…]={123:{}}; pagePart = m.split(',')[0].split('_')[1];

!window.location.hash.includes('#init_') &&
    pd.cmd.fcwRawArray.filter(k => k.includes('p_'))
        .reduce((n, m) => (pd.session.p || (pd.session.p = {}))
            && (pd.session.p[m.split(',')[0].split('_')[1]] || (pd.session.p[m.split(',')[0].split('_')[1]] = {}))
            && m.split(',').splice(1).reduce((n1, m1) => pd.session
                .p[m.split(',')[0].split('_')[1]][m1] = {}, '')
            , 0)

window.location.hash.includes('#init_') && (pd.session.json =
    JSON.parse(decodeURI(window.location.hash.split('#init_')[1]))
) && Object.keys(pd.session.json).filter(k => k.includes('p_'))
    .reduce((n, m) => (pd.session.p || (pd.session.p = {}))
        && (pd.session.p[m.split('_')[1]] || (pd.session.p[m.split('_')[1]] = {}))
        && pd.session.json[m].reduce((n1, m1) => pd.session.p[m.split('_')[1]][m1] = {}, 0)
        , 0)

//first/rest coma split, first is KEY, id-list level
pd.cmd.fcwSessionParser = () => pd.cmd
    .fcwRawArray.reduce((n, m) => (n[m.split(',')[0]] = m.split(',').slice(1)) && n, {})

!pd.session.json && (
    pd.session.json = pd.cmd.fcwSessionParser()
)

console.log(pd.session)

//pps: Page Part Sequence
!pd.session.json.pps
    && (pd.session.json.pps = Object.keys(pd.session.json).filter(n => !n.includes('pps')))

pd.session.fcw = wsDbC.fip

pd.e = ts => eMap[ts.adnId]
pd.i = (ts, n) => pd.e(ts) && pd.e(ts)[n]
//make [[1],[1,2],[1,2,3]] from 3
//make SELECT … parent IN (…) from deep

fd.jsonToSend = wsDbC.jsonToSend

fd.listDeepNum = wsDbC.listDeepNum
fd.listDeepSql = wsDbC.listDeepSql

var pdCount = 0
pd.ppMenuList = Object.keys(pd.session.json).filter(n => 'pps' != n)

pd.cmd.initShortLink = () => {
    pd.session.shortUrlHash = '#'
    pd.session.json.pps &&
        (pd.session.shortUrlHash += 'pps,' + pd.session.json.pps.join(',') + ';');

    (pd.session.json.pps || Object.keys(pd.session.json).filter(k => 'pps' != k && 'lr' != k && !k.includes('p_'))
    ).reduce((n, m) =>
        (pd.session.shortUrlHash += m + ',' + pd.session.json[m].join(',') + ';')
        && pd.session.json['p_' + m] &&
        (pd.session.shortUrlHash += 'p_' + m + ',' + pd.session.json['p_' + m].join(',') + ';') &&
        console.log(n, m, m.includes('p_'), pd.session.json['p_' + m]
            , pd.session.json['p_' + m].join(','))
        , '')
}

createApp({
    methods: {
        session() { return pd.session },
        initShortLink() {
            pd.cmd.initShortLink()
            this.count++
        },
        initLink() { window.location.href = '#init_' + JSON.stringify(pd.session.json) }
    }, data() { return { count: ++pdCount, } },
}).mount('#headPage')

pd.cmd.dropDownOnOff = eId => !document.getElementById(eId).className.includes('w3-show')
    && (document.getElementById(eId).className += ' w3-show')
    || (document.getElementById(eId).className =
        document.getElementById(eId).className.replace(' w3-show', ''))

const fpc01 = createApp({
    data() { return { count: ++pdCount, ppMenuList: pd.ppMenuList } },
    methods: {
        session() { return pd.session },
        clickPagePartEd() { pd.cmd.dropDownOnOff('pagePartEd') },
        inputPanelPart(event) {
            const snPath = event.target.id.split('_')
                , snJn = (pd.session.json[snPath[0] + '_' + snPath[1]]
                    || (pd.session.json[snPath[0] + '_' + snPath[1]] = []))

            snJn.includes(event.target.value) && snJn.splice(snJn.indexOf(event.target.value), 1)
                || snJn.push(event.target.value);

            (pd.session.p[snPath[1]] || (pd.session.p[snPath[1]] = {})) &&
                (pd.session.p[snPath[1]][event.target.value] && delete pd.session.p[snPath[1]][event.target.value])
                || (pd.session.p[snPath[1]][event.target.value] = {})
            this.count++
        },
        ppsHref(n) {
            const h = (n + ',' + pd.session.json.pps.join(',').replace(n, '').replace('pps', ''))
                .replace(',,', ',')
                , h2 = ',' == h.slice(-1) && h.slice(0, -1) || h
                , h3 = pd.cmd.fcwRawArray.filter(m => !m.includes('pps')).join(';')
            return 'pps,' + h2 + ';' + h3
        },
    },
    mounted() {
        let allAndIds = Object.keys(pd.session.json).filter(n => !n.includes('pps')).reduce(
            (n, m) => n + ',' + pd.session.json[m].join(','), '').substring(1)
        ',' === allAndIds.slice(-1) && (allAndIds = allAndIds.slice(0, -1))
        console.log(allAndIds, pd.session.json)
        wsDbC.runWsOpenInPromise({ sqlName: 'adn01NodesIn', adnId: allAndIds }
        ).then(event => {
            wsDbC.sqlAdnData(event)
                .forEach(adnId => pd.ctAdntree[adnId].count++)
            wsDbC.readParentDeep(wsDbC.listDeepSql(wsDbC.listDeepNum(4), allAndIds))
        })
    },
})

pd.onOffChild = adnId => (parentChild[adnId] || []).length > 0 && eMap[adnId]
    && (eMap[adnId].openChild = !eMap[adnId].openChild)
pd.cmd.ppHref = () => '#' + Object.keys(pd.session.json).reduce((n, adnId) => n
    + ';' + adnId + ',' + pd.session.json[adnId].join(','), '').substring(1)

pd.session.ppClose = []

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

//pd.sql: build and work with SQL
pd.sql = {}

fd.sql_app = sql_app

sql_app.r1Type_r2Aggregate = {
    name: 'SQL template where reference2 is aggregate data',
    shortName: 'vTable ⁙r1type:value | r2:aggregateTV',
    // sql: 'SELECT :fieldsJoin d1.* FROM doc d1 \n\
    sql: 'SELECT :fieldsJoin FROM doc d1 \n\
        :joinValues WHERE d1.parent = :adnId'
}
sql_app.r1Type_Value = {
    name: 'Template to generate SELECT in moore styles, example: reference:<<type>>, reference2:<<value>>',
    shortName: 'vTable ⁙r1type:value',
    // sql: 'SELECT :fieldsJoin d1.* FROM doc d1 \n\
    sql: 'SELECT :fieldsJoin FROM doc d1 \n\
        :joinValues WHERE d1.parent = :adnId'
}

pd.session.buildSqlList = ['r1Type_Value', 'r1Type_r2Aggregate']
pd.session.buildSqlType = 'r1Type_Value'

/** */
sql_app.build = {}
/**
 * 
 * @param {*} sqlAddObj 
 * @param {newObjKey:*, columnAdnId:<<adnId*>>, suffix:*} params - parts of new Object
 * @returns 
 */
sql_app.build.contentJoin = (sqlAddObj, params) => (
    // sqlAddObj.contentJoin[parentChild[adnId][0]] = {
    sqlAddObj[params.newObjKey] = {
        key: 'c_' + params.columnAdnId + params.suffix,
        alias: '' + eMap[eMap[eMap[params.columnAdnId].reference].parent].value_22
            + '_' + (eMap[params.columnAdnId].r_value_22 || eMap[params.columnAdnId].rr_value_22),
    })

/**
 * Montage: filedNames, LEFT_JOIN groups and end SQL SELECT v.001.
 * @param {*} adnId 
 * @param {*} sqlAdd 
 * @returns sqlAdd
 */
sql_app.build.montage001SqlAdd = (adnId, sqlAdd) => Object.keys(sqlAdd.contentJoin).reduce(
    (n, adnId) => {
        sqlAdd.sqlStr.fieldsJoin
            += sqlAdd.contentJoin[adnId].key + '.value ' + sqlAdd.contentJoin[adnId].alias + ', '
        sqlAdd.sqlStr.joinValues
            += 'LEFT JOIN string ' + sqlAdd.contentJoin[adnId].key + ' ON '
            + sqlAdd.contentJoin[adnId].key + '.string_id=d1.doc_id \n'
        sqlAdd.contentJoin[adnId].r2a && (() => {
            sqlAdd.sqlStr.fieldsJoin += sqlAdd.contentJoin[adnId].r2a.key + '.* ,'
            sqlAdd.sqlStr.joinValues
                += 'LEFT JOIN (SELECT ' + sqlAdd.contentJoin[adnId].r2a.key
                + '.value ' + sqlAdd.contentJoin[adnId].r2a.alias
                + ' , d1.doc_id ' + sqlAdd.contentJoin[adnId].r2a.alias
                + '_id \n FROM doc d1 LEFT JOIN string '
                + sqlAdd.contentJoin[adnId].r2a.key + ' \n ON ' + sqlAdd.contentJoin[adnId].r2a.key
                + '.string_id=d1.doc_id ) '
                + sqlAdd.contentJoin[adnId].r2a.key + ' \n ON ' + sqlAdd.contentJoin[adnId].r2a.key + '.'
                + sqlAdd.contentJoin[adnId].r2a.alias + '_id=d1.reference2 '
            console.log(adnId, sqlAdd)
        })()
        return true
    }, '') && (
        sqlAdd.sql
        = sql_app.r1Type_Value.sql
            .replace(':fieldsJoin', sqlAdd.sqlStr.fieldsJoin + ' d1.*')
            .replace(':joinValues', sqlAdd.sqlStr.joinValues)
            .replace(':adnId', adnId)
    ) && sqlAdd
/**
 * 
 * @param {*} adnId 
 * @param {*} sqlAdd 
 * @returns sqlAdd
 */
sql_app.build.r1Type_Value = (adnId, sqlAdd) => {

    console.log(adnId, sqlAdd, parentChild[adnId][0])
    sql_app.build.contentJoin(sqlAdd.contentJoin,
        { newObjKey: parentChild[adnId][0], columnAdnId: parentChild[adnId][0], suffix: '_r1t_v', }
    )
    sql_app.build.montage001SqlAdd(adnId, sqlAdd)
    return sqlAdd
}
/**
 * 
 * @param {*} adnId 
 * @param {*} sqlAdd 
 * @returns 
*/
sql_app.build.r1Type_r2Aggregate = (adnId, sqlAdd) => {

    console.log(adnId, sqlAdd, parentChild[adnId][0])
    sql_app.build.contentJoin(sqlAdd.contentJoin,
        { newObjKey: parentChild[adnId][0], columnAdnId: parentChild[adnId][0], suffix: '_r1t_v', }
    )
    sql_app.build.contentJoin(sqlAdd.contentJoin[parentChild[adnId][0]],
        { newObjKey: 'r2a', columnAdnId: eMap[parentChild[adnId][0]].reference2, suffix: '_r2a', }
    )
    parentChild[parentChild[adnId][0]].forEach(xId => {
        console.log(xId)
        sql_app.build.contentJoin(sqlAdd.contentJoin,
            { newObjKey: xId, columnAdnId: xId, suffix: '_r1t_v', }
        )
        console.log(sqlAdd)
    })
    sql_app.build.montage001SqlAdd(adnId, sqlAdd)
}
/** Parts of page - necessary for compose the end program */
fpc01.component('t-page-part', {

    template: '#tPagePart', props: { pagePart: String },
    data() { return { count: ++pdCount, } },
    methods: {
        parentChild(adnId) { return parentChild[adnId] || [] },
        session() { return pd.session },
        setSqlBuildType(sqlName) {
            pd.session.buildSqlType = sqlName
            console.log(sqlName)
            this.count++
        },
        sql_app(sqlName) { return sql_app[sqlName] },
        sqlDataList(adnId) { return pd.session.sqlDataList && pd.session.sqlDataList[adnId] },
        buildSqlSelect(adnId) {
            const sqlAdd = { contentJoin: {}, sqlStr: { fieldsJoin: '', joinValues: '' } }

            fd.sqlAdd = sqlAdd

            sql_app.build[pd.session.buildSqlType](adnId, sqlAdd);

            (pd.session.jsonStr || (pd.session.jsonStr = {}))[adnId] = '\n' + sqlAdd.sql

            wsDbC.sendAndSetMessageFn({ sql: sqlAdd.sql, adnId: adnId }
            ).then(event =>
                ((pd.session.sqlDataList || (pd.session.sqlDataList = {})
                )[adnId] = JSON.parse(event.data).list
                ) && this.count++
                , event => {
                    console.error(event, 123)
                }) && this.count++
            this.count++
        },
        buildType(typeOf, adnId) {
            console.log(this.pagePart, typeOf, pd.session.p[this.pagePart][adnId])
            pd.session.p[this.pagePart][adnId].buildType = typeOf
            this.count++
        },
        buildJSON(adnId, typeOf) {
            const json = {}

            // !typeOf.includes('add_') && !pd.session.p[this.pagePart][adnId].typeOf
            !typeOf.includes('add_') // && !pd.session.p[this.pagePart][adnId].typeOf
                && (pd.session.p[this.pagePart][adnId].typeOf = typeOf)

            pd.session.p[this.pagePart][adnId].typeOf
                && buildJSON.typeOf[pd.session.p[this.pagePart][adnId].typeOf]
                && buildJSON.typeOf[pd.session.p[this.pagePart][adnId].typeOf](adnId, json)

            //add [], +/- On/Off add/remove FOR pd.session.p[this.pagePart][adnId]
            typeOf.includes('add_') &&
                (pd.session.p[this.pagePart][adnId].add || (pd.session.p[this.pagePart][adnId].add = []))
                && (pd.session.p[this.pagePart][adnId].add.includes(typeOf.split('_')[1])
                    && pd.session.p[this.pagePart][adnId].add.splice(
                        pd.session.p[this.pagePart][adnId].add.indexOf(typeOf.split('_')[1]), 1)
                    || pd.session.p[this.pagePart][adnId].add.splice(0, 0, typeOf.split('_')[1])
                )

            pd.session.p[this.pagePart][adnId].add &&
                pd.session.p[this.pagePart][adnId].add.includes('metaContentId')
                && (json.metaContentId = {}) && (() => {
                    console.log(1231, typeOf, json, pd.session.p[this.pagePart][adnId])
                    buildJSON.mcFirst(json.metaContentId, adnId)
                })()

            buildJSON.stringify[pd.session.p[this.pagePart][adnId].typeOf]
                && ((pd.session.jsonStr || (pd.session.jsonStr = {}))[adnId] = buildJSON
                    .stringify[pd.session.p[this.pagePart][adnId].typeOf](json))
            this.count++
        },
        isJsonPart(adnId, jsonPart) {
            return pd.session.p[this.pagePart] && pd.session.p[this.pagePart][adnId]
                && pd.session.p[this.pagePart][adnId].add
                && pd.session.p[this.pagePart][adnId].add.includes(jsonPart)
        },
        jsonStr(adnId) { return pd.session.jsonStr && pd.session.jsonStr[adnId] },
        isPanel(adnId) {
            return pd.isPanel(this.pagePart, adnId)
            // return pd.session.p && pd.session.p[this.pagePart] && pd.session.p[this.pagePart][adnId]
        },
        ppClick(pagePart) {
            !pd.session.ppClose.includes(pagePart) && pd.session.ppClose.splice(0, 0, pagePart)
                || pd.session.ppClose.splice(pd.session.ppClose.indexOf(pagePart), 1)
            this.count++
        },
        ppToFirst(pagePart, n) {
            const i = pd.session.json[pagePart].indexOf(n)
            console.log(pagePart, i, n, pd.session.json[pagePart], pd.session.json[pagePart].indexOf(n))
            pd.session.json[pagePart] = pd.session.json[pagePart].splice(i, 1).concat(pd.session.json[pagePart])
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
pd.isPanel = (pagePart, adnId) => pd.session.p && pd.session.p[pagePart] && pd.session.p[pagePart][adnId]

pd.ctAdntree = {}
fpc01.component('t-adntree', {
    template: '#tAdntree', props: { adnId: Number, pagePart: String }, data() { return { count: ++pdCount, } },
    methods: {
        isPanel() {
            return pd.isPanel(this.pagePart, this.adnId)
        },
        session() { return pd.session },
        adnClick(adnId) {
            !parentChild[adnId] && wsDbC.sendAndSetMessageFn(wsDbC.jsonToSend('adn01Childrens', adnId)
            ).then(event => {
                wsDbC.sqlAdnData(event)
            })
            pd.onOffChild(adnId)
            this.count++
        },
        parentChild(adnId) { return parentChild[adnId] || [] },
        isOpenChild(adnId) { return pd.isOpenChild(adnId) },
        e() { return pd.e(this) },
        i(n) { return pd.i(this, n) },
    },
    mounted() {
        pd.ctAdntree[this.adnId] = this
    },
})

pd.mFpc01 = fpc01.mount('#fpc01')
