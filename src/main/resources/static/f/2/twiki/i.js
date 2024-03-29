'use strict'
const { createApp } = Vue
import { fipi, fipi2, fipiFn } from '/f/2/lib/fipi.js'
import { wsDbC, pd } from '/f/2/lib/pd_wsDbC.js'
import TWiki from '/f/2/twiki/TWiki.js'
import FhirPart from '/f/2/lib/FhirPart.js'

const pageId = window.location.hash.substring(1).split(',')[1]

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

wsDbC.cmdList = [{
    thenFn: event => {
        fipi2.fipId = wsDbC.sqlAdnData(event)
        fipi.tWikiPage.count++
        wsDbC.readParentDeep(wsDbC.listDeepSql(wsDbC.listDeepNum(4)
            , wsDbC.cmdList[0].sendJson.adnId))

    }, sendJson: { sqlName: 'adn01NodesIn', },
}, {
    thenFn: event => {
        fipi.tWikiPart.count++
        fipi.fipList = fipiFn.childIdConcat(fipi2.FhirInfoPageId, [])

        Object.keys(pd.eMap).filter(adnId => fipi.fipList.includes(
            pd.eMap[adnId].reference) && 'json' != pd.eMap[pd.eMap[adnId].reference].value_22
            && 'json' != pd.eMap[adnId].value_22
        ).reduce((x, adnId) => {
            console.log(adnId, fipi
                , pd.eMap[pd.eMap[adnId].reference].value_22
            )

            pd.eMap[adnId].value_22 &&
                fipiFn.initPageParts(pd.eMap[adnId].value_22, adnId)
        }, 0)
        Object.keys(pd.eMap).filter(adnId => fipi.fipList.includes(
            pd.eMap[adnId].reference) && 'json' == pd.eMap[pd.eMap[adnId].reference].value_22
        ).reduce((x, adnId) => {
            fipiFn.addPpIdFromJson(adnId, pd.eMap[adnId].value_22)
        }, 0)

        const allAdnIds = fipiFn.getAllAdnIds()
        console.log(fipi, allAdnIds)

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
        console.log('123 3/3')
    },
}]; wsDbC.cmdListItem = 0


wsDbC.cmdList[0].sendJson.adnId = [pageId, fipi2.FhirInfoPageId].join(',')
wsDbC.runWsOpenInPromise(wsDbC.cmdList[0].sendJson)
    .then(wsDbC.cmdList[0].thenFn)

createApp({ data() { return { pageId: pageId } } }).mount('#headTitle')
