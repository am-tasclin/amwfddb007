'use strict'
const { createApp } = Vue
import { wsDbC, pd } from '/fip/1/1/l1.js'
import { fipiFn } from '/fip/1/2/fipi.js'
import FhirPart from '/fip/1/2/FhirPart.js'
import TWiki from '/twiki/4/TWiki.js'

window.location.hash.split('page,')[1] &&
    (pd.session.page = 1 * window.location.hash.split('page,')[1])

const pageWiki = createApp({
    data() { return { docId: pd.session.page, twHead: '' } }
})

const cTWiki = pageWiki.component('t-wiki', TWiki)
pageWiki.component('t-fhir-part', FhirPart)
const mPageWiki = pageWiki.mount('#pageWiki')

pd.session.FhirInfoPageId = 376617 // [376617] am001fip/CodeSystem/FhirInfoPage title::

fd.mcc = { eMap: pd.eMap, parentChild: pd.parentChild }
fd.session = pd.session

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
        const ppsTWiki = {}
        const fipList = pd.parentChild[pd.session.FhirInfoPageId]
        pd.fipList = fipList.concat(fipList
            .reduce((n, m) => Object.assign(n, pd.parentChild[m]), []))
        console.log(pd.fipList)
        ppsTWiki.pps = Object.keys(pd.eMap).filter(k => pd.fipList.includes(pd.eMap[k].reference))
            .reduce((n, m) => {
                'FIP' == pd.eMap[m].r_value_22
                    && (n[m] = fipiFn.initPageParts(pd.eMap[m].value_22, {}))
                    || (n[m] = fipiFn.initPageParts(pd.eMap[m].r_value_22 + ',' + pd.eMap[m].value_22, {}))
                n[m].inList = Object.keys(n[m].json)
                    .reduce((n2, m2) => n2.concat(n[m].json[m2]), [])
                return n
            }, {})
        ppsTWiki.inList = Object.keys(ppsTWiki.pps)
            .reduce((n, m) => n.concat(ppsTWiki.pps[m].inList), [])
        console.log(ppsTWiki)
        console.log(pd.eMap)
        console.log(pd.parentChild)

        wsDbC.cmdList[1].sendJson.adnId = ppsTWiki.inList
        // console.log(inList, new Date().toISOString())
        wsDbC.sendAndSetMessageFn(Object.assign(wsDbC.cmdList[1].sendJson
            , { sql: wsDbC.replaceAdnId(wsDbC.cmdList[1].sendJson) })
        ).then(event => {
            pd.ctAdntree && wsDbC.sqlAdnData(event)
                .forEach(adnId => pd.ctAdntree[adnId].count++)

            ppsTWiki.inList.length > 0 &&
                wsDbC.readParentDeep(wsDbC.listDeepSql(wsDbC.listDeepNum(4), ppsTWiki.inList))
        })
    },
}]
wsDbC.cmdList[0].sendJson.adnId = [pd.session.page, pd.session.FhirInfoPageId]
wsDbC.runWsOpenInPromise(wsDbC.cmdList[0].sendJson).then(wsDbC.cmdList[0].thenFn)

pd.docId = () => ({ docId: pd.session.page })

createApp({ data() { return pd.docId() } }).mount('#headTitle')
createApp({ data() { return pd.docId() } }).mount('#showDocId')
