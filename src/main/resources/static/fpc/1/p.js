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

// jsLib1.wsDbSelect.onopen = event => 'adn01OneNode_adn01Childrens'.split('_')
//     .forEach(sqlName => readAdn([pd.fElId], sqlFn, { sqlName: sqlName }))

jsLib1.wsDbSelect = new WebSocket("ws://" + window.location.host + "/dbSelect")

jsLib1.wsDbSelect.onopen = event => readAdns('adn01OneNode_adn01Childrens', [pd.fElId])

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
    readAdnsDirect = (strAdnsSql, idL) => idL && strAdnsSql.split('_'
    ).forEach(sqlName => idL.forEach(adnId => true && jsLib1.wsDbSelect.send(JSON
        .stringify({ sqlName: sqlName, adnId: adnId, sql: sqlFn(adnId, sqlName) })))),

    readAdnDirect = (idL, sqlFn, m) => idL && idL.forEach(adnId => true && jsLib1.
        wsDbSelect.send(JSON.stringify(Object.assign(m
            , { adnId: adnId, 'sql': sqlFn(adnId, m.sqlName) })))),

    readAdns = (strAdnsSql, idL) => strAdnsSql.split('_')
        .forEach(sqlName => readAdn(idL, sqlFn, { sqlName: sqlName })),

    readAdn = (a, sqlFn, m) => a && a.forEach(adnId => !eMap[adnId] && jsLib1.
        wsDbSelect.send(JSON.stringify(Object.assign(m
            , { adnId: adnId, 'sql': sqlFn(adnId, m.sqlName) })))),

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
            console.log('oc')
            if (!parentChild[this.adnId]) {
                // console.log(this.adnId, sqlFn(this.adnId, 'adn01Childrens'))
                readAdnsDirect('adn01Childrens', [this.adnId])
                console.log(this.adnId)
            }
        },
    }, data() { return { count: 1 } },
})

fpc01.mount('#fpc01')

createApp({ data() { return pd } }).mount('#headTitle')
createApp({ data() { return pd } }).mount('#id01')
