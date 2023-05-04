'use strict'
const { createApp } = Vue
import { fipi, fipi2, fipiFn } from '/f/3/lib/fipi.js'
import { wsDbC, pd } from '/f/3/lib/pd_wsDbC.js'
import TWiki from '/f/3/twiki/TWiki.js'
import FhirPart from '/f/3/lib/FhirPart.js'

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

        const allAdnIds = fipiFn.getAllAdnIds()

        wsDbC.cmdList[1].sendJson.adnId = allAdnIds
        allAdnIds &&
            wsDbC.sendAndSetMessageFn(Object.assign(wsDbC.cmdList[1].sendJson
                , { sql: wsDbC.replaceAdnId(wsDbC.cmdList[1].sendJson) })
            ).then(event => {
                const l_adnId = wsDbC.sqlAdnData(event)
                fipi.l_ppId.forEach(ppId => fipi.ppId[ppId].l_pp
                    .forEach(pp => fipi.ppId[ppId].pp[pp].l_fipId
                        .filter(fipId => l_adnId.includes(1 * fipId)).forEach(fipId =>
                            fipi.ppId[ppId].pp[pp].fipId[fipId].fhirPart[fipId].count++
                        )))
                wsDbC.readParentDeep(wsDbC.listDeepSql(wsDbC.listDeepNum(4), allAdnIds.join(',')))
            })
    }, sendJson: { sqlName: 'adn01NodesIn' },

}, {
    thenFn: event => {
        console.log(3, ' read DB')
        fipi2.viewAdnAfterRead()
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
tWiki.component('t-fhir-part', FhirPart)
tWiki.mount('#tWiki')

createApp({ data() { return { pageId: pageId } }, })
    .mount('#headTitle')
