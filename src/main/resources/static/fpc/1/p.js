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
buildJSON.jnAddKeyObjNameValue = (jn, keyValue) => (jn[keyValue
    .keyAsObjName] = keyValue[keyValue.keyAsObjName]) && (jn
        .k = keyValue.keyAsObjName)

//bjd: build JSON deep
buildJSON.bjDeep = (jn, i) => buildJSON.jnAddKeyValue(jn, buildJSON
    .keyValue(eMap[i])) && buildJSON.bjParent(jn, i)

buildJSON.mcParent = (jn, i) => parentChild[i] && parentChild[i]
    .forEach(j => buildJSON.mcParent(buildJSON.add1Mc(jn, j), j))

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

buildJSON.mcFirst = (jn, i) => buildJSON.add1Mc(jn, i) && buildJSON.mcParent(jn, i)

pd.plusMinuList = ','
buildJSON.jt = {
    //jt: jsonType
}
pd.jsonType = '?'
buildJSON.jt.Structure = () => {
    const jn = {}
    
    jn.keyAsObjName = eMap[pd.sn.fElId].value_22 || eMap[pd.sn.fElId].r_value_22
    const jnRoot = jn[jn.keyAsObjName] = {}
    console.log(pd.sn.fElId,  eMap[pd.sn.fElId].value_22, jnRoot)
    
    parentChild[pd.sn.fElId].forEach(eId => {
        const kName = eMap[eId].value_22 || eMap[eId].r_value_22
        jnRoot[kName] = ''
        eMap[eId].doctype && (jnRoot[kName] = eMap[eId].doctype + ' ::_dataType_')
        console.log(eId, eMap[eId].doctype)
    })
    console.log(jnRoot)
    return jn
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
                jn = {}//jn: JSON Node
            hfj.v += '⌖ ' + pd.sn.fElId + '\n'
            if (eMap[pd.sn.fElId]) {

                //Build JSON from defined type 
                buildJSON.jt[pd.jsonType] && buildJSON.jnAddKeyObjNameValue(jn,
                    buildJSON.jt[pd.jsonType]())

                !buildJSON.jt[pd.jsonType] && buildJSON.bjDeep(jn, pd.sn.fElId)

                //console.log(pd.plusMinuList.includes('metaContentId') , bj.mc(eMap[pd.sn.fElId]), bj.key(eMap[pd.sn.fElId]))

                jn.metaContentId = {}
                !pd.plusMinuList.includes('metaContentId') && buildJSON
                    .mcFirst(jn.metaContentId, pd.sn.fElId)
            }
            return hfj.v + JSON.stringify(jn, '', 2)
        },
    }, data() { return pd }
})

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
