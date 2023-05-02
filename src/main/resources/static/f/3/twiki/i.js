'use strict'
const { createApp } = Vue
import { fipi, fipi2, fipiFn } from '/f/3/lib/fipi.js'
import { wsDbC, pd } from '/f/3/lib/pd_wsDbC.js'
import TWiki from '/f/3/twiki/TWiki.js'
const pageId = window.location.hash.substring(1).split(',')[1]

console.log(pageId)
const firstReadIds = [pageId, fipi2.FhirInfoPageId].join(',')

wsDbC.cmdList = [{
    sendJson: { sqlName: 'adn01NodesIn', adnId: firstReadIds },
    thenFn: event => {
        fipi2.fipId = wsDbC.sqlAdnData(event)
        fipi.tWikiPage.count++
        wsDbC.readParentDeep(wsDbC.listDeepSql(wsDbC.listDeepNum(4), firstReadIds))
    },
}, {
    thenFn: event => {
        fipi.tWikiPart.count++
        fipi.fipList = fipiFn.childIdConcat(fipi2.FhirInfoPageId, [])
        console.log(pageId, 'wsDbC.cmdList[1] 2', fipi.fipList)
        fipiFn.initPPBlock()
    }
}, {
    thenFn: event => {
        console.log(fipi.fipList, pd.eMap[376639], 123)
    }
}]; wsDbC.cmdListItem = 0

wsDbC.runWsOpenInPromise(wsDbC.cmdList[0].sendJson)
    .then(wsDbC.cmdList[0].thenFn)

const tWiki = createApp({
    data() { return { count: 0, pageId: pageId } },
    mounted() {
        fipi.tWikiPage = this
    }, methods: {
        e(adnId) { return pd.eMap[adnId] },
        ea(adnId, att) { return pd.eMap[adnId] && pd.eMap[adnId][att] },
    },
})
tWiki.component('t-wiki', TWiki)
// tWiki.component('t-fhir-part', FhirPart)
tWiki.mount('#tWiki')

createApp({ data() { return { pageId: pageId } }, })
    .mount('#headTitle')
