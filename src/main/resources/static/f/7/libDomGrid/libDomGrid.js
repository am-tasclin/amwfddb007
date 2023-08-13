'use strict'
/**
 * Algoritmed ©, EUPL-1.2 or later.
 * DOM grid editor logic
 * 
 */

const eMap = {}, parentChilds = {}
    , domContainer = {
        conf: { actuallyEdit: {} }, mcData: { eMap: eMap, parentChilds: parentChilds },
        components: {}
    }
console.log(domContainer)
export const consoleLogDomCOntainer = () => console.log(domContainer)

/**
 * Container of data and structures for build and use the DOM Grid
 * Контейнер даних і структур для створення та використання DOM Grid
 * 
 */

export const setActualeCompomentName = ctName => domContainer.actuallyComponentName = ctName
export const setDomComponent = (ctName, ct) =>
    setActualeCompomentName(ctName) && (domContainer.components[ctName] = ct)

export const getDomComponent = (ctName) => domContainer.components[ctName]
export const getActualeCompomentName = () => domContainer.actuallyComponentName

/**
 * 
 */
export const mcData = domContainer.mcData

/**
 * 
 */
const domConf = () => domContainer.conf

const domConfStrignifyList = ['mcElement', 'actuallyTreeObj', 'actuallyEdit',]
const domConfStrignifyFn = (k, v) => !domConfStrignifyList.includes(k) && v || undefined
export const domConfLocationHash = () => JSON.stringify(domConf(), domConfStrignifyFn)
export const domConfHrefHash = () => window.location.href = '#cj=' + domConfLocationHash()

export const domConfStrignify = () => {
    console.log(domConf())
    const x = JSON.stringify(domConf(), domConfStrignifyFn, 2)
    console.log(x)
    console.log(domConfLocationHash())
    domConfHrefHash()
}

export const actuallyEdit = () => domConf().actuallyEdit

/**
 * 
 * @returns 
 */
export const actuallyTreeObj = () => domConf().actuallyTreeObj
/**
 * 
 * @param {*} pathTreeStr 
 * @returns 
 */
export const setActuallyTreeObj = pathTreeStr => {
    setActualeCompomentName('tree')
    domContainer.conf.actuallyEdit.tree =
        domConf().actuallyTreeObj = pathTreeStr.split(',').reduce((o, k) => o[k], domContainer.conf)
    getDomComponent('actuallyEdit').count++
    getDomComponent('adnEditPanel').count++
    return domConf().actuallyTreeObj
}

/**
 * 
 * @param {*} treeRootId 
 * @returns 
 */
export const initActuallyTreeOpenedId = treeRootId => (domConf().actuallyTreeObj.openedId
    || (domConf().actuallyTreeObj.openedId = {}))[treeRootId]
    || (domConf().actuallyTreeObj.openedId[treeRootId] = [])

/**
 * 
 * @param {*} path 
 * @param {*} treeRootId 
 * @param {*} adnId 
 * @returns 
 */
export const treeOpenedChildOnOff = (treeRootId, adnId) => {
    const actuallyTreeObj = domConf().actuallyTreeObj
    const actuallyTreeOpenedId = initActuallyTreeOpenedId(treeRootId)
    !actuallyTreeOpenedId.includes(adnId)
        && actuallyTreeOpenedId.push(adnId)
        || (actuallyTreeObj.openedId[treeRootId] = actuallyTreeOpenedId.filter(i => i !== adnId))
    return actuallyTreeObj.openedId[treeRootId]
}

export const reViewAdn = adnId => actuallyTreeObj().mcElement && Okeys(actuallyTreeObj().mcElement)
    .forEach(rootId => actuallyTreeObj().mcElement[rootId][adnId] &&
        actuallyTreeObj().mcElement[rootId][adnId].count++)
/**
 * 
 * @param {*} adnList 
 * @returns 
 */
export const initNewMc = adnList => adnList.forEach(adn => {
    setToEMap(adn)
    reViewAdn(adn.doc_id)
})
/**
 * 
 * @param {*} adn 
 * @returns 
 */
export const setToEMap = adn =>
    mcData.eMap[adn.doc_id] = adn
/**
 * 
 * @param {*} adnList 
 * @returns 
 */
export const addNewMc = adnList => adnList
    .forEach(adn => setToEMap(adn))

/**
 * 
 * @returns 
 */
export const uniqueIdPageRead = () => Okeys(domContainer.conf.tree)
    .reduce((l, im) => domContainer.conf.tree[im].rootList.filter(im2 => !l.includes(im2))
        .reduce((l, im2) => l.push(im2) && l, l) && l, [])

export const uniqueParentIdPageRead = () => Okeys(domConf().tree)
    .reduce((l1, treeId) => domConf().tree[treeId].openedId && Okeys(domConf().tree[treeId].openedId)
        .reduce((l2, treeRootId) => domConf().tree[treeId].openedId[treeRootId]
            .reduce((l3, i) => !l3.includes(i) && l3.push(i) && l3 || l3
                , l2) && l2, l1) && l1 || l1, [])

/**
 * Short to tree configuration
 * @returns 
 */
export const confTree = () => domContainer.conf.tree

/**
 * 
 * @param {*} rawConfStr 
 */
export const initDomConfLogic = (rawConfStr) =>
    rawConfStr.includes('cj=') && initJsonDomConf(rawConfStr.replace('cj=', ''))
    || initUriDomConf(rawConfStr)

const initJsonDomConf = (rawConfStr, ppId) => {
    const confJson = JSON.parse(decodeURI(rawConfStr))
    domContainer.conf.tree = confJson.tree
    !ppId && (ppId = Okeys(domConf().tree)[0])
    domContainer.conf.actuallyTreeObj = domContainer.conf.tree[ppId]
    domContainer.conf.actuallyEdit.pathTreeStr = 'tree,' + ppId
    console.log(domContainer.conf.actuallyEdit.pathTreeStr, domContainer)
    //setActuallyTreeObj(pathTreeStr)

    return domContainer.conf
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
    domContainer.conf.actuallyEdit.pathTreeStr = 'tree,' + ppId
    'tree' == uriDomConf_l[0] && ((
        domContainer.conf.tree || (domContainer.conf.tree = {})
    )[ppId] = { rootList: uriDomConf_l.slice(1) }
    ) && (domContainer.conf.actuallyTreeObj = domContainer.conf.tree[ppId])
        || (() => {
            domContainer.conf.tree = {}
            console.log(domContainer)
        })()
    return domContainer.conf
}

export const addTreeFn = addTreeId => {
    !Okeys(domContainer.conf.tree).length && (domContainer.conf.tree = { 0: {} })
    const firstRootTreeId = Okeys(domContainer.conf.tree)[0];
    (domContainer.conf.tree[firstRootTreeId].rootList
        || (domContainer.conf.tree[firstRootTreeId].rootList = []))
    !domContainer.conf.tree[firstRootTreeId].rootList.includes(addTreeId)
        && domContainer.conf.tree[firstRootTreeId].rootList.push(addTreeId)
    const pathTreeStr = 'tree,' + firstRootTreeId
    setActuallyTreeObj(pathTreeStr)
}

const Okeys = Object.keys
