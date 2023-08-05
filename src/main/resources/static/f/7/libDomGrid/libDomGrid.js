'use strict'
/**
 * Algoritmed ©, EUPL-1.2 or later.
 * 
 */

const domContainer = { conf: {}, mcData: { eMap: {}, parentChilds: {} }, component: {} }
console.log(domContainer)
/**
 * Container of data and structures for build and use the DOM Grid
 * Контейнер даних і структур для створення та використання DOM Grid
 * 
 */

/**
 * 
 */
export const mcData = domContainer.mcData

/**
 * 
 */
export const domComponent = domContainer.component

/**
 * 
 */
export const domConf = domContainer.conf

/**
 * 
 * @param {*} pathTreeStr 
 * @returns 
 */
export const setActuelTreeObj = pathTreeStr =>
    domConf.actuelTreeObj = pathTreeStr.split(',').reduce((o, k) => o[k], domContainer.conf)

/**
 * 
 * @returns 
 */
export const actuelTreeObj = () => domConf.actuelTreeObj

/**
 * 
 * @param {*} path 
 * @param {*} treeRootId 
 * @param {*} adnId 
 * @returns 
 */
export const treeOpenedChildOnOff = (treeRootId, adnId) => {
    const treeConf = domConf.actuelTreeObj
    const openedId = (treeConf.openedId || (treeConf.openedId = {}))[treeRootId]
        || (treeConf.openedId[treeRootId] = [])
    !openedId.includes(adnId) && openedId.push(adnId)
        || (treeConf.openedId[treeRootId] = openedId.filter(i => i !== adnId))
    return treeConf.openedId[treeRootId]
}

/**
 * 
 * @param {*} adn 
 * @returns 
 */
export const setToEMap = adn => mcData.eMap[adn.doc_id] = adn

/**
 * 
 * @param {*} adnList 
 * @returns 
 */
export const initNewMc = adnList => adnList.forEach(adn => {
    setToEMap(adn)
    domComponent.mcElement[adn.doc_id].count++
})

/**
 * 
 * @param {*} adnList 
 * @returns 
 */
export const addNewMc = adnList => adnList
    .forEach(adn => setToEMap(adn))

/**
 * 
 * @param {*} adnList 
 * @returns 
 */
export const addToParentChild = adnList => adnList.reduce((pl, adn) =>
    !(mcData.parentChilds[adn.p] || (mcData.parentChilds[adn.p] = [])
    ).includes(adn.p) &&
    (mcData.parentChilds[adn.p].push(adn.doc_id) && pl.push(adn.p))
    && pl || pl, [])

/**
 * 
 * @returns 
 */
export const uniqueIdPageRead = () => Okeys(domContainer.conf.tree)
    .reduce((l, im) => domContainer.conf.tree[im].rootList.filter(im2 => !l.includes(im2))
        .reduce((l, im2) => l.push(im2) && l, l) && l, [])

/**
 * Short to tree configuration
 * @returns 
 */
export const confTree = () => domContainer.conf.tree

/**
 * 
 * @param {*} rawConfStr 
 */
export const initDomConfLogic = (rawConfStr) => {
    !rawConfStr.includes('cj=') && initUriDomConf(rawConfStr)
}

/**
 * Primary initialization from simple URI syntax
 * Первинна ініціалізація з простого синтаксису URI
 * 
 * @param {*} rawUriDomConf 
 * @param {*} ppId 
 */
const initUriDomConf = (rawUriDomConf, ppId) => {
    const uriDomConf_l = rawUriDomConf.split(',')
    !ppId && (ppId = 0)
    // console.log(123, rawUriDomConf, uriDomConf_l, ppId)
    'tree' == uriDomConf_l[0] && ((
        domContainer.conf.tree || (domContainer.conf.tree = {})
    )[ppId] = { rootList: uriDomConf_l.slice(1) })
    domConf.actuelTreeObj = domContainer.conf.tree[ppId]
}

const Okeys = Object.keys
