'use strict'
/**
 * Algoritmed ©, Licence EUPL-1.2 or later.
 * 
 * twiki - Wiki page pattern
 * 
 */
const { createApp } = Vue
const pageId = window.location.hash.substring(1).split(',')[1]

import TWiki from '/f/6/libTWiki/TWiki.js'
const tWiki = createApp({
    data() { return { count: 0, pageId: pageId } },
    template: `<TWiki :pageId="pageId"/>`, components: { TWiki },
})
import MElement from '/f/6/libTGridDpp/MElement.js'
tWiki.component('t-m-element', MElement)
tWiki.mount('#tWiki')

import DbMessagePool from '/f/6/lib/DbMessagePool.js'
createApp({ template: `<DbMessagePool/>`, components: { DbMessagePool }, }
).mount('#dbMessagePool')

/**
 * Ws DB init the page
 */
import { l_domType, cdppInitPagePart, confDppUniqueMcdId } from '/f/6/lib/confDomPagePart.js'
const initDom = () => {
    console.log(l_domType, Okeys(mcd.eMap))
    Okeys(mcd.eMap).filter(i => l_domType.includes(mcd.eMap[i].r)
    ).forEach(i => {
        console.log(i, mcd.eMap[i].vl_str)
        cdppInitPagePart(mcd.eMap[i].vl_str, i)
    })
    const uniqueMcdId = confDppUniqueMcdId()
    uniqueMcdId.l.length && readDom(uniqueMcdId)
}

import { readDppFromList, readOpenedParent } from '/f/6/lib/wsDbRw.js'
import { reViewMeMap, reViewMeMapOpened } from '/f/6/libTGridDpp/MElement.js'
const readDom = (uniqueMcdId) => readDppFromList(uniqueMcdId.l, () => {
    reViewMeMap(uniqueMcdId.l)
    readOpenedParent(uniqueMcdId.openedId, reViewMeMapOpened)
    !uniqueMcdId.openedId.length && reViewMeMapOpened()
})

import { ws, readDocAndParentList } from '/f/6/lib/wsDbRw.js'
import { meMap } from '/f/6/libTGridDpp/dppInteractivity.js'
import { mcd } from '/f/6/lib/MetaContentData.js'
ws.onopen = event => pageId && readDocAndParentList(
    { doc_id: [pageId], parent: [pageId] }, () => {
        meMap[pageId].tWiki.count++
        readDocAndParentList({ doc_id: [], parent: mcd.parentChild[pageId] }, () => {
            console.log(mcd, mcd.parentChild[pageId])
            meMap[pageId].tWiki.count++
            initDom()
        })
    })

const Okeys = Object.keys
