'use strict'
const { createApp } = Vue
import { wsDbC, pd } from '/fip/1/1/l1.js'

window.location.hash.split('page_')[1] &&
    (pd.session.page = 1 * window.location.hash.split('page_')[1])

const pageWiki = createApp({
    data() { return { docId: pd.session.page, twHead: '' } }
})
import TWiki from './TWiki.js'
const cTWiki = pageWiki.component('t-wiki', TWiki)
const mPageWiki = pageWiki.mount('#pageWiki')

pd.session.FhirInfoPageId = 376617 // [376617] am001fip/CodeSystem/FhirInfoPage title::

fd.mcc = { eMap: pd.eMap, parentChild: pd.parentChild }
fd.session = pd.session

console.log(pd, new Date().toISOString())
const mShowDocName = createApp({ data() { return { docName: '' } } }).mount('#showDocName')

wsDbC.cmdListItem = 0
wsDbC.cmdList = [{
    sendJson: { sqlName: 'adn01NodesIn' },
    thenFn: event => {
        wsDbC.sqlAdnData(event)
        wsDbC.readParentDeep(wsDbC.listDeepSql(wsDbC.listDeepNum(4)
            , wsDbC.cmdList[0].sendJson.adnId))
    },
}, {
    sendJson: { sqlName: 'adn01NodesIn' },
    thenFn: () => {
        // console.log(new Date().toISOString(), pd.tWiki, pd.session.page, 'read WIKI complete')
        //new view of #pageWiki
        mPageWiki.twHead = mShowDocName.docName = pd.eMap[pd.session.page].value_22
        //new view of <t-wiki>
        pd.tWiki[pd.session.page].count++
        // console.log(pd.parentChild, pd.session.FhirInfoPageId)
        const fipList = pd.parentChild[pd.session.FhirInfoPageId]
            , fipList2 = fipList.concat(fipList
                .reduce((n, m) => Object.assign(n, pd.parentChild[m]), []))
            , inList = Object.keys(pd.eMap).filter(k => fipList2.includes(pd.eMap[k].reference))
                .reduce((n, m) => n.concat(pd.eMap[m].value_22.split(',')), [])
            , inList2 = Object.keys(pd.eMap).filter(k => fipList2.includes(pd.eMap[k].reference))
                .reduce((n, m) => (n[pd.eMap[m].r_value_22] = pd.eMap[m].value_22.split(',')
                    .reduce((n, m, i) => (n[i] = 1 * m) && n, [])) && n, {})

        console.log(fipList, fipList2, inList, inList2)

        wsDbC.cmdList[1].sendJson.adnId = inList
        // console.log(inList, new Date().toISOString())
        wsDbC.sendAndSetMessageFn(Object.assign(wsDbC.cmdList[1].sendJson
            , { sql: wsDbC.replaceAdnId(wsDbC.cmdList[1].sendJson) })
        ).then(event => {
            wsDbC.sqlAdnData(event)
            wsDbC.readParentDeep(wsDbC.listDeepSql(wsDbC.listDeepNum(4), inList))
        })
    },
}]
wsDbC.cmdList[0].sendJson.adnId = [pd.session.page, pd.session.FhirInfoPageId]
wsDbC.runWsOpenInPromise(wsDbC.cmdList[0].sendJson).then(wsDbC.cmdList[0].thenFn)

pd.docId = () => ({ docId: pd.session.page })

createApp({ data() { return pd.docId() } }).mount('#headTitle')
createApp({ data() { return pd.docId() } }).mount('#showDocId')
