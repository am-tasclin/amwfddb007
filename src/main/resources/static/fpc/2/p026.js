/**
 * @license Algoritmed.js v0.1.026
 * (c) 2021-2023 Algoritmed Ltd. http://algoritmed.com
 * License: Apache-2.0 license 
 */

'use strict'
const { createApp, nextTick, ref } = Vue
    , eMap = {} // emap: doc_id:MCrDB ADN Element
    , parentChild = {} // parent:[Child ids]
    , pd = {} //pd: Page Data

pd.session = {}//sn: session
pd.count = 0
pd.plusMinuList = ','

pd.session.hashVrVl = window.location.hash.split(',')
pd.isHashVr = n => pd.session.hashVrVl[0].indexOf(n) == 1
pd.session.fElId = (pd.isHashVr('fElId') && 1 * pd.session.hashVrVl[1]) || pd.session.fElId || 373071

//bj: buildJSON
const buildJSON = {}

//jt: typeOf
buildJSON.typeOf = { mc: {} }
// buildJSON.jt = {}

//fmc: FHIR Meta Content'
buildJSON.typeOf.fmcSpace = '  '

buildJSON.typeOf.fhirMcStrignify = (json, prefixStr, so) => (
    so.s += '{') && 'object' === typeof json && buildJSON.typeOf
        .fhirMcElementStrignify(json, prefixStr, so
        ) && (so.s += '}') || true
// ) && (so.s += prefixStr + '}') || true

// so.s += prefixStr + '[') && json.forEach(json2 => buildJSON.jt
buildJSON.typeOf.fhirMcListStrignify = (json, prefixStr, so) => (
    so.s += '[') && json.forEach(json2 => buildJSON.typeOf
        .fhirMcStrignify(json2, prefixStr + buildJSON.typeOf.fmcSpace, so)) && false ||
    (so.s += ']') || true
// ) && false || (so.s += prefixStr + ']') || true

buildJSON.typeOf.fhirMcElementStrignify = (json, prefixStr, so) => Object.keys(json)
    .forEach((key, i) => (so.s += prefixStr + (i > 0 ? ',' : '') + '"' + key + '":')
        && ('number' === typeof json[key] && (so.s += '' + json[key]))
        && buildJSON.test(json, key)
        && ('string' === typeof json[key] && (so.s += '"' + json[key] + '"'))
        || ('object' === typeof json[key]
            && ('mc' === key && (so.s += JSON.stringify(json[key]) + ''))
            || (Array.isArray(json[key])
                && (1 == json[key].length && 0 == Object.keys(json[key][0]).length
                    && (so.s += JSON.stringify(json[key]))
                    || buildJSON.typeOf.fhirMcListStrignify(json[key], prefixStr + buildJSON.typeOf.fmcSpace, so)
                )
            )
            || buildJSON.typeOf.fhirMcStrignify(json[key], prefixStr + buildJSON.typeOf.fmcSpace, so)
        )
    ) || true

buildJSON.jnAddKeyObjNameValue = (json, keyValue) => keyValue.keyAsObjName
    && (json[keyValue.keyAsObjName] = keyValue[keyValue.keyAsObjName])
    && (json.docKey = keyValue.keyAsObjName)

buildJSON.typeOf.keyAsObjName = i => eMap[i].value_22 || eMap[i].r_value_22
buildJSON.typeOf.se2Parent = (jn, pId) => parentChild[pId].forEach(eId => {
    // const kName = eMap[eId].value_22 || eMap[eId].r_value_22
    const kName = buildJSON.typeOf.keyAsObjName(eId)
        , doctype = eMap[eId].doctype || eMap[eId].r_doctype

    jn[kName] = ''
    eMap[eId].doctype && (jn[kName] = eMap[eId].doctype + ' ::_dataType_')

    // console.log(123, eId, eMap[eId].doctype, doctype == 37)

    doctype == 37 && (jn[kName] = [{}])
    parentChild[eId] && doctype != 37 && (jn[kName] = {})
    let e = doctype == 37 && jn[kName][0] || jn[kName]
    parentChild[eId] && buildJSON.typeOf.se2Parent(e, eId)
})
buildJSON.typeOf.NativeMetaContent = () => {
    const json = {}
    json.keyAsObjName = 'metContentNative01'
    const mcn = json[json.keyAsObjName] = { eMap: {} }
    Object.keys(eMap).filter(i => i == 368597).forEach(dId => (
        mcn.eMap[dId] = {}) && Object.keys(eMap[dId]).filter(key => eMap[dId][key])
            .forEach(key => mcn.eMap[dId][key] = eMap[dId][key]))
    console.log(11, mcn.eMap)
    return json
}
buildJSON.typeOf.Structure = () => {
    const json = {}
    json.keyAsObjName = buildJSON.typeOf.keyAsObjName(pd.session.fElId)
    buildJSON.typeOf.se2Parent(json[json.keyAsObjName] = {}, pd.session.fElId)
    return json
}

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

buildJSON.test = (p1, p2) => {
    console.log(1234, p2, p1[p2], typeof p1[p2], p1)
    return true
}

pd.typeOf = '?'

const fpc01 = createApp({
    data() { return pd }, methods: {
        buildJSON() {
            //j: buildJSON in DEVELOPMENT !
            const hfj = { v: 'Hello buildJSON! ' + this.count + '\n' },
                json = {}//jn: JSON Node
            hfj.v += '⌖ ' + pd.session.fElId + '\n'

            buildJSON.typeOf[pd.typeOf] && buildJSON.jnAddKeyObjNameValue(json,
                buildJSON.typeOf[pd.typeOf]())

            pd.plusMinuList.includes('metaContentId')
                && (json.metaContentId = {})
                && buildJSON.mcFirst(json.metaContentId, pd.session.fElId)

            fd.json = json

            // hfj.v += JSON.stringify(json,'',2)

            hfj.v += JSON.stringify(fd.json, (k, v) => (
                'mc' == k && JSON.stringify(v)) || v, 2)
                .replace(/\s+}/g,'}')
                .replace(/mc":\s"{/g,'mc": {')
                .replace(/{\s+"mc":/g,'{ "mc":')
                .replace(/}"}/g,'}}')
                .replace(/\\"/g,'"')

            console.log(11, hfj.v)
            const so = { s: '' }
            buildJSON.typeOf.fhirMcStrignify(json, '\n', so)
            so.s = so.s.replace(/{\s+"mc/g, '{"mc')
            console.log(11, so.s)

            // return             hfj.v + so.s

            return hfj.v
        }, typeOfClick(jt) {
            pd.typeOf = jt
            this.count++
        }, pmClick(n) { //pmClick: plus/minus click
            !pd.plusMinuList.includes(n)
                && (pd.plusMinuList += n + ',')
                || (pd.plusMinuList = pd.plusMinuList.replace(n + ',', ''))
            this.count++
        }
    }
})

pd.e = ts => eMap[ts.adnId]
pd.i = (ts, n) => pd.e(ts) && pd.e(ts)[n]

jsLib1.wsDbSelect = new WebSocket("ws://" + window.location.host + "/dbSelect")

jsLib1.wsDbSelect.onopen = event => readAdnsDirect
    ('adn01OneNode_adn01Childrens', pd.session.hashVrVl.filter((v, i) => i > 0), isNotIn_eMap)
// ('adn01OneNode_adn01Childrens', [pd.session.fElId], isNotIn_eMap)

jsLib1.wsDbSelect.onmessage = event => {
    const obj = JSON.parse(event.data)
    'adn01OneNode' == obj.sqlName && (
        eMap[obj.list[0].doc_id] = obj.list[0])
    'adn01Childrens' == obj.sqlName && obj.list
        .forEach(el => (parentChild[obj.adnId] || (parentChild[obj.adnId] = []))
            && (eMap[el.doc_id] = el) && parentChild[obj.adnId].push(el.doc_id))
}

const
    readAdnsDirect = (strAdnsSql, idL, isForFor2) => idL && strAdnsSql.split('_'
    ).forEach(sqlName => idL.forEach(adnId => isForFor2 && jsLib1
        .wsDbSelect.send(JSON.stringify(
            { sqlName: sqlName, adnId: adnId, sql: sqlFn(adnId, sqlName) }))))

    , isNotIn_eMap = adnId => !eMap[adnId]

    , sqlFn = (adnId, sqlName) => jsLib1.replaceSql(sql_app[sqlName].sql)
        .replace(':adnId', adnId)

fd.eMap = eMap
fd.parentChild = parentChild

fpc01.component('t-adn-view', {
    template: '#tAdnView', props: { adnId: Number }, methods: {
        opc() {
            return pd.e(this) && (pd.e(this).opened = !pd.e(this).opened)
        }, oc() {
            !parentChild[this.adnId] && (eMap[this.adnId].opened = true) &&
                readAdnsDirect('adn01Childrens', [this.adnId], () => true)
        },
        //icpp: increment count++
        icpp() { this.count++ },
        //e: get Adn Element
        e() { return pd.e(this) },
        //i: get Adn Attribute Value
        i(n) { return pd.i(this, n) },
        //p: get parentChild
        p() { return parentChild[this.adnId] },
    }, data() { return { count: pd.count } }
})

fpc01.mount('#fpc01')

pd.session.or2tree = () => {
    const x = Object.assign([], pd.session.hashVrVl)
    x.shift()
    return 'tree_' + x.join('_') + ',' + x[0]
}
pd.session.hashVrVlto1 = p => {
    let x = Object.assign([], pd.session.hashVrVl)
    x.splice(1, 0, x.splice(p, 1)[0])
    return x.join(',')
}

const menu = {
    menuList: [{
        text: '002_ M&D-M for 373071',
        href: '/f/mdm/1/i.html#!/init_%7B%22tree%22:%7B%22l%22:%7B%22id%22:%5B368833,369967%5D,%22selectedId%22:372797,%22openIds%22:%5B368833,369984,376485,369975,369973,369972,369967,376483,376484,368636,372801,372800,372798,372799,372797%5D%7D,%22r%22:%7B%22id%22:%5B373071,376483,372797,368636%5D,%22selectedId%22:368636,%22openIds%22:%5B373071,373072,376485,376486,376483,376484,372797,372799,372798,372800,372801,368636%5D%7D%7D,%22selectedLR%22:%22r%22%7D',
    }, {
        text: '003_ MedicationRequest',
        href: '/f/mdm/1/i.html#!/init_{"tree":{"l":{"id":[376482,373466,373359,376479,371312,369926,373495],"selectedId":376479,"openIds":[372138,371312,373359,373466,376482]},"r":{"id":[369980,374705,375222,368833,371556],"selectedId":369980,"openIds":[368833,376482,372225]}},"selectedLR":"r"}',
    },]
}
createApp({ data() { return menu } }).mount('#menu01')
pd.siteTitle = 'FPC'
createApp({ data() { return { siteTitle: pd.siteTitle } } }).mount('#headTitle')
createApp({ data() { return { sn: pd.session, count: pd.count } } }).mount('#id01')

