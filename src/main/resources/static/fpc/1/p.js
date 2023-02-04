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
pd.hashVrVl = window.location.hash.split('_')
pd.isHashVr = n => pd.hashVrVl[0].indexOf(n) == 1
// pd.isHashVr('fElId') && (pd.fElId = 1 * pd.hashVrVl[1])
pd.fElId = pd.isHashVr('fElId') ? (1 * pd.hashVrVl[1]) : 373071

//for development
fd.eMap = eMap
fd.parentChild = parentChild
//for development

jsLib1.wsDbSelect = new WebSocket("ws://" + window.location.host + "/dbSelect")

jsLib1.wsDbSelect.onopen = event => readAdnsDirect
    ('adn01OneNode_adn01Childrens', [pd.fElId], isNotIn_eMap)

jsLib1.wsDbSelect.onmessage = event => {
    const obj = JSON.parse(event.data)
    console.log(obj)
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

const fpc01 = createApp({
    methods: {
        i(id, n) { return eMap[id] && eMap[id][n] },
        //j: build JSON DEVELOPMENT
        j() {
            const hfj = { v: 'Hello FHIR JSON! ' + this.count + '\n' },
                jn = {}
            hfj.v += pd.fElId + '\n'
            if (eMap[pd.fElId]) {
                const e = eMap[pd.fElId]
                let k = e.r_value_22 || e.rr_value_22,
                    v = e.r2_value_22
                jn[k] = v
                console.log(k, v, e.r_value_22, e.rr_value_22, jn)
            }
            return hfj.v + JSON.stringify(jn, '', 2)
        },
    }, data() { return pd }
})

pd.icpp = ts => ts.count++
pd.i = (ts, n) => eMap[ts.adnId] && eMap[ts.adnId][n]

fpc01.component('t-adn-view', {
    template: '#tAdnView',
    props: { adnId: Number },
    mounted() {
        this.count++
        console.log(this.count)
    }, methods: {
        //icpp: increment count++
        icpp() { pd.icpp(this) },
        //i: get Adn Attribute Value
        i(n) { return pd.i(this, n) },
        //p: get parentChild
        p() { return parentChild[this.adnId] },
        //oc: Open Close Element
        oc() {
            if (!parentChild[this.adnId]) {
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
