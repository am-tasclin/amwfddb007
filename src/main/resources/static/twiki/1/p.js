'use strict'
const { createApp, nextTick } = Vue
    , eMap = {} // emap: doc_id:MCrDB ADN Element
    , parentChild = {}
    , pd = {} //pd: Page Data
import { sql_app, wsDs } from '/fip/1/1/l1.js'
pd.session = {}//sn: session
pd.session.fcw = wsDs.fip

wsDs.eMap = eMap
wsDs.parentChild = parentChild

fd.mcc = { eMap: eMap, parentChild: parentChild }

window.location.hash.split('page_')[1] &&
    (pd.session.page = 1 * window.location.hash.split('page_')[1])

console.log(pd)

pd.e = ts => eMap[ts.adnId]
pd.i = (ts, n) => pd.e(ts) && pd.e(ts)[n]

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
        const pageAndId = [pd.session.page]

        wsDs.runWsOpenInPromise(
            { sqlName: 'adn01NodesIn', adnId: pageAndId }
        ).then(event => {
            wsDs.sqlAdnData(event)
            wsDs.readParentDeep(wsDs.listDeepSql(wsDs.listDeepNum(4), pageAndId))
        })
    },
})

twiki.mount('#twiki')

createApp({ data() { return { docId: pd.session.page } } }).mount('#headTitle')

