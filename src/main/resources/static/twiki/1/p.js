'use strict'
const { createApp, nextTick } = Vue
    , eMap = {} // emap: doc_id:MCrDB ADN Element
    , parentChild = {}
    , pd = {} //pd: Page Data
import { wsDbC } from '/fip/1/1/l1.js'

pd.session = {}//sn: session
pd.session.FhirInfoPageId = 376617 // [376617] am001fip/CodeSystem/FhirInfoPage title::
pd.session.fcw = wsDbC.fip

wsDbC.eMap = eMap
wsDbC.parentChild = parentChild

fd.mcc = { eMap: eMap, parentChild: parentChild }
fd.session = pd.session

window.location.hash.split('page_')[1] &&
    (pd.session.page = 1 * window.location.hash.split('page_')[1])

console.log(pd)

pd.e = ts => eMap[ts.adnId]
pd.i = (ts, n) => pd.e(ts) && pd.e(ts)[n]

wsDbC.cmdList = [] //[{sendJson:{},thenFn:(event =>{})}]
wsDbC.cmdListItem = 0
wsDbC.cmdList.push({
    sendJson: { sqlName: 'adn01NodesIn' },
    thenFn: event => {
        wsDbC.sqlAdnData(event)
        wsDbC.readParentDeep(wsDbC.listDeepSql(wsDbC.listDeepNum(4), wsDbC.cmdList[0].sendJson.adnId))
    }
})
wsDbC.cmdList.push({
    sendJson: { sqlName: 'adn01NodesIn' },
    thenFn: () => {
        const fipList = parentChild[pd.session.FhirInfoPageId]
            , fipList2 = fipList.concat(fipList.reduce((n, m) => Object.assign(n, parentChild[m]), []))
            , inList = Object.keys(eMap).filter(k => fipList2.includes(eMap[k].reference))
                .reduce((n, m) => n.concat(eMap[m].value_22.split(',')), [])
        console.log(123, fipList2, inList)
        wsDbC.cmdList[1].sendJson.adnId = inList
        wsDbC.sendAndSetMessageFn(Object.assign(wsDbC.cmdList[1].sendJson
            , { sql: wsDbC.replaceAdnId(wsDbC.cmdList[1].sendJson) })
        ).then(event => {
            wsDbC.sqlAdnData(event)
            wsDbC.readParentDeep(wsDbC.listDeepSql(wsDbC.listDeepNum(4), inList))
        })
    }
})

console.log(wsDbC.cmdList)

const twiki = createApp({
    data() { return { count: 1 } },
    methods: {
        session() { return pd.session },
        e(adnId) { return eMap[adnId] },
        ea(adnId, n) { return eMap[adnId] && eMap[adnId][n] },
        parentChild(adnId) { return parentChild[adnId] || [] },
        i(n) { return pd.i(this, n) },
    },
    mounted() {
        wsDbC.cmdList[0].sendJson.adnId = [pd.session.page, pd.session.FhirInfoPageId]
        wsDbC.runWsOpenInPromise(wsDbC.cmdList[0].sendJson).then(wsDbC.cmdList[0].thenFn)
    },
})

twiki.mount('#twiki')

createApp({ data() { return { docId: pd.session.page } } }).mount('#headTitle')
