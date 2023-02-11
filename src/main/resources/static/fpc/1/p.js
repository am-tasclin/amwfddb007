/**
 * @license Algoritmed.js v0.1.025
 * (c) 2021-2023 Algoritmed Ltd. http://algoritmed.com
 * License: Apache-2.0 license 
 */

'use strict'
const { createApp, nextTick, ref } = Vue
    , eMap = {} // emap: doc_id:MCrDB ADN Element
    , parentChild = {} // parent:[Child ids]
    , pd = {} //pd: Page Data

pd.siteTitle = 'FPC'
pd.count = 0
// console.log(pd.icpp())

pd.sn = {}//sn: session
pd.sn.hashVrVl = window.location.hash.split(',')
pd.sn.or2tree = () => {
    let x = Object.assign([], fd.sn.hashVrVl)
    x.shift()
    return 'tree_' + x.join('_') + ',' + x[0]
}
pd.sn.hashVrVlto1 = p => {
    let x = Object.assign([], fd.sn.hashVrVl)
    x.splice(1, 0, x.splice(p, 1)[0])
    // console.log(p, x)
    return x.join(',')
}
pd.isHashVr = n => pd.sn.hashVrVl[0].indexOf(n) == 1
// pd.isHashVr('fElId') && (pd.fElId = 1 * pd.hashVrVl[1])
pd.sn.fElId = (pd.isHashVr('fElId') && 1 * pd.sn.hashVrVl[1]) || pd.sn.fElId || 373071

//for development
fd.eMap = eMap
fd.parentChild = parentChild
fd.sn = pd.sn
fd.isHashVr = pd.isHashVr
//for development

jsLib1.wsDbSelect = new WebSocket("ws://" + window.location.host + "/dbSelect")

jsLib1.wsDbSelect.onopen = event => readAdnsDirect
    ('adn01OneNode_adn01Childrens', pd.sn.hashVrVl.filter((v, i) => i > 0), isNotIn_eMap)
// ('adn01OneNode_adn01Childrens', [pd.sn.fElId], isNotIn_eMap)

jsLib1.wsDbSelect.onmessage = event => {
    const obj = JSON.parse(event.data)
    // console.log(obj)
    if ('adn01OneNode' == obj.sqlName) eMap[obj.list[0]
        .doc_id] = obj.list[0]
    else 'adn01Childrens' == obj.sqlName && obj.list
        .forEach(el => (parentChild[obj.adnId] || (parentChild[obj.adnId] = [])
        ) && (eMap[el.doc_id] = el) && parentChild[obj.adnId].push(el.doc_id))
}

const
    readAdnsDirect = (strAdnsSql, idL, isForFor2) => idL && strAdnsSql.split('_'
    ).forEach(sqlName => idL.forEach(adnId => isForFor2 && jsLib1
        .wsDbSelect.send(JSON.stringify(
            { sqlName: sqlName, adnId: adnId, sql: sqlFn(adnId, sqlName) })))),

    isNotIn_eMap = adnId => !eMap[adnId],

    sqlFn = (adnId, sqlName) => jsLib1.replaceSql(sql_app[sqlName].sql)
        .replace(':adnId', adnId)

//bj: buildJSON
const buildJSON = {}

// bj.is1UpperCase = s => s.substring(0, 1) === s.substring(0, 1).toUpperCase()
buildJSON.key = e => { return e.r_value_22 || e.rr_value_22 }
buildJSON.keyValue = e => {
    const keyValue = {}
    keyValue.k = buildJSON.key(e)
    keyValue.v = e.r2_value_22 || (
        // loaded attribute: rr is Type
        // bj.is1UpperCase(e.rr_value_22) && {}
        parentChild[e.doc_id] && {}
    )
    return keyValue
}

//bjp: build JSON from parentChild
buildJSON.bjParent = (jn, i) => parentChild[i] && parentChild[i].forEach(j => {
    const kv = buildJSON.keyValue(eMap[j])
    buildJSON.jnAddKeyValue(jn, kv)
    if (typeof kv.v == 'object') buildJSON.bjParent(kv.v, j)
})
buildJSON.jnAddKeyValue = (jn, keyValue) => jn[keyValue.k] = keyValue.v
buildJSON.jnAddKeyObjNameValue = (json, keyValue) => (
    json[keyValue.keyAsObjName] = keyValue[keyValue.keyAsObjName])
    && (json.k = keyValue.keyAsObjName)

//bjd: build JSON deep
buildJSON.bjDeep = (jn, i) => buildJSON.jnAddKeyValue(jn, buildJSON
    .keyValue(eMap[i])) && buildJSON.bjParent(jn, i)

buildJSON.mc2Parent = (jn, i) => parentChild[i] && parentChild[i]
    .forEach(j => (jn[buildJSON.jsonType.keyAsObjName(j)] = { mc: buildJSON.mc(eMap[j]) }
    ) && buildJSON.mc2Parent(jn[buildJSON.jsonType.keyAsObjName(j)], j))

buildJSON.mcParent = (jn, i) => parentChild[i] && parentChild[i]
    .forEach(j => buildJSON.mcParent(buildJSON.add1Mc(jn, j), j))

buildJSON.mcFirst = (jn, i) => buildJSON.add1Mc(jn, i) && buildJSON.mcParent(jn, i)

// add and return (1)one mc
buildJSON.add1Mc = (jn, i) => (
    jn[buildJSON.key(eMap[i])] = { mc: buildJSON.mc(eMap[i]) }) && jn[buildJSON.key(eMap[i])]

//build mc: meta-content id block
buildJSON.mc = e => {
    const mc = { id: e.doc_id }
    e.reference && (mc.r = e.reference)
    e.reference2 && (mc.r2 = e.reference2)
    return mc
}

pd.plusMinuList = ','

pd.jsonType = '?'
//jt: jsonType
buildJSON.jsonType = { mc: {} }
// buildJSON.jt = {}
buildJSON.jsonType.mc.Structure = (jn, i) => {
    jn[buildJSON.jsonType.keyAsObjName(i)] = { mc: buildJSON.mc(eMap[i]) }
    console.log(jn)
    const jn2 = jn[buildJSON.jsonType.keyAsObjName(i)]
    buildJSON.mc2Parent(jn2, i)
    //parentChild[i].forEach(j => jn2[buildJSON.jt.keyAsObjName(j)] = { mc: buildJSON.mc(eMap[j]) })
}
buildJSON.jsonType.keyAsObjName = i => eMap[i].value_22 || eMap[i].r_value_22
buildJSON.jsonType.se2Parent = (jn, pId) => parentChild[pId].forEach(eId => {
    // const kName = eMap[eId].value_22 || eMap[eId].r_value_22
    const kName = buildJSON.jsonType.keyAsObjName(eId)
        , doctype = eMap[eId].doctype || eMap[eId].r_doctype

    jn[kName] = ''
    eMap[eId].doctype && (jn[kName] = eMap[eId].doctype + ' ::_dataType_')

    // console.log(123, eId, eMap[eId].doctype, doctype == 37)

    doctype == 37 && (jn[kName] = [{}])
    parentChild[eId] && doctype != 37 && (jn[kName] = {})
    let e = doctype == 37 && jn[kName][0] || jn[kName]
    parentChild[eId] && buildJSON.jsonType.se2Parent(e, eId)
})
buildJSON.jsonType.Structure = () => {
    const json = {}
    json.keyAsObjName = buildJSON.jsonType.keyAsObjName(pd.sn.fElId)
    // console.log(pd.sn.fElId, eMap[pd.sn.fElId].value_22, "jnRoot")
    buildJSON.jsonType.se2Parent(json[json.keyAsObjName] = {}, pd.sn.fElId)
    return json
}
const fpc01 = createApp({
    methods: {
        i(id, n) { return eMap[id] && eMap[id][n] },
        jsonTypeClick(jt) {
            pd.jsonType = jt
            this.count++
        }, pmClick(n) {
            //pmClick: plus/minus click
            (!pd.plusMinuList.includes(n) && (pd.plusMinuList += n + ','
            )) || (pd.plusMinuList = pd.plusMinuList.replace(n + ',', ''))
            this.count++
        }, buildJSON() {
            //j: buildJSON in DEVELOPMENT !
            const hfj = { v: 'Hello FHIR JSON! ' + this.count + '\n' },
                json = {} //jn: JSON Node
            hfj.v += '⌖ ' + pd.sn.fElId + '\n'
            if (eMap[pd.sn.fElId]) {

                //Build JSON from defined type 
                buildJSON.jsonType[pd.jsonType] && buildJSON.jnAddKeyObjNameValue(json,
                    buildJSON.jsonType[pd.jsonType]())

                !buildJSON.jsonType[pd.jsonType] && buildJSON.bjDeep(json, pd.sn.fElId)

                //console.log(pd.plusMinuList.includes('metaContentId') , bj.mc(eMap[pd.sn.fElId]), bj.key(eMap[pd.sn.fElId]))

                //if with metaContentId
                !pd.plusMinuList.includes('metaContentId')
                    && (json.metaContentId = {})
                    && (
                        (buildJSON.jsonType.mc[pd.jsonType] && buildJSON
                            .jsonType.mc[pd.jsonType](json.metaContentId, pd.sn.fElId)) ||
                        (!buildJSON.jsonType.mc[pd.jsonType] && buildJSON
                            .mcFirst(json.metaContentId, pd.sn.fElId))
                    )
            }
            const so = { s: '' };
            buildJSON.jsonType.fhirMcStrignify(json, '\n', so)
            // return hfj.v + JSON.stringify(jn, '', 1)
            console.log(json, so)
            so.s = so.s.replace(/{\s+"mc/g, '{"mc')
            return hfj.v + so.s
        },
    }, data() { return pd }
})

//fmc: FHIR Meta Content'
buildJSON.jsonType.fmcSpace = '  '

buildJSON.jsonType.test = (json, key, so) => {
    // console.log(key, json[key].length, Array.isArray(json[key]))
    // console.log(123, key, json[key], json[key][0])
    // console.log(key, 1 == json[key].length && 0 == Object.keys(json[key][0]).length, Array.isArray(json[key]))
    console.log(key, Array.isArray(json[key]), so, json)
    return true
}

buildJSON.jsonType.fhirMcStrignify = (json, prefixStr, so) => (
    so.s += '{') && 'object' === typeof json && buildJSON.jsonType
        .fhirMcElementStrignify(json, prefixStr, so
        ) && (so.s += '}') || true
// ) && (so.s += prefixStr + '}') || true

buildJSON.jsonType.fhirMcListStrignify = (json, prefixStr, so) => (
    // so.s += prefixStr + '[') && json.forEach(json2 => buildJSON.jt
    so.s += '[') && json.forEach(json2 => buildJSON.jsonType
        .fhirMcStrignify(json2, prefixStr + buildJSON.jsonType.fmcSpace, so)
    ) && false || (so.s += ']') || true
// ) && false || (so.s += prefixStr + ']') || true

buildJSON.jsonType.fhirMcElementStrignify = (json, prefixStr, so) => Object.keys(json)
    .forEach((key, i) => (so.s += prefixStr + (i > 0 ? ',' : '') + '"' + key + '":')
        && ('string' === typeof json[key] && (so.s += '"' + json[key] + '"'))
        || ('object' === typeof json[key]
            && ('mc' === key && (so.s += JSON.stringify(json[key]) + ''))
            || (Array.isArray(json[key])
                && (1 == json[key].length && 0 == Object.keys(json[key][0]).length
                    && (so.s += JSON.stringify(json[key]))
                    || buildJSON.jsonType.fhirMcListStrignify(json[key], prefixStr + buildJSON.jsonType.fmcSpace, so)
                )
            )
            || buildJSON.jsonType.fhirMcStrignify(json[key], prefixStr + buildJSON.jsonType.fmcSpace, so)
        )
    ) || true

pd.icpp = ts => ts.count++
pd.e = ts => eMap[ts.adnId]
pd.i = (ts, n) => pd.e(ts) && pd.e(ts)[n]

fpc01.component('t-adn-view', {
    template: '#tAdnView', props: { adnId: Number },
    mounted() {
        this.count++
    }, methods: {
        //icpp: increment count++
        icpp() { this.count++ },
        //e: get Adn Element
        e() { return pd.e(this) },
        //i: get Adn Attribute Value
        i(n) { return pd.i(this, n) },
        //p: get parentChild
        p() { return parentChild[this.adnId] },
        //oc: Open Close Element
        opc() {
            return pd.e(this) && (pd.e(this).opened = !pd.e(this).opened)
        }, oc() {
            if (!parentChild[this.adnId]) {
                eMap[this.adnId].opened = true
                readAdnsDirect('adn01Childrens', [this.adnId], () => true)
            }
        },
    }, data() { return { count: 1 } },
})

fpc01.mount('#fpc01')

createApp({ data() { return pd } }).mount('#headTitle')
createApp({ data() { return pd } }).mount('#id01')

const menu = {
    menuList: [{
        text: '002_ M&D-M for 373071',
        href: '/f/mdm/1/i.html#!/init_%7B%22tree%22:%7B%22l%22:%7B%22id%22:%5B368833,369967%5D,%22selectedId%22:372797,%22openIds%22:%5B368833,369984,376485,369975,369973,369972,369967,376483,376484,368636,372801,372800,372798,372799,372797%5D%7D,%22r%22:%7B%22id%22:%5B373071,376483,372797,368636%5D,%22selectedId%22:368636,%22openIds%22:%5B373071,373072,376485,376486,376483,376484,372797,372799,372798,372800,372801,368636%5D%7D%7D,%22selectedLR%22:%22r%22%7D',
    }, {
        text: '003_ MedicationRequest',
        href: '/f/mdm/1/i.html#!/init_{"tree":{"l":{"id":[376482,373466,373359,376479,371312,369926,373495],"selectedId":376479,"openIds":[372138,371312,373359,373466,376482]},"r":{"id":[369980,374705,375222,368833,371556],"selectedId":369980,"openIds":[368833,376482,372225]}},"selectedLR":"r"}',
    },]
}; createApp({ data() { return menu } }).mount('#menu01')
