'use strict'
/**
 * Algoritmed ©, EUPL-1.2 or later.
 * DOM grid editor logic
 * 
 */

const domContainer = {
    conf: { actualeEdit: {} }, mcData: { eMap: {}, parentChilds: {} },
    components: {}
}
export const consoleLogDomCOntainer = () => console.log(domContainer)

/**
 * Container of data and structures for build and use the DOM Grid
 * Контейнер даних і структур для створення та використання DOM Grid
 * 
 */

export const setActualeCompomentName = ctName => domContainer.actualeComponentName = ctName
export const setDomComponent = (ctName, ct) =>
    setActualeCompomentName(ctName) && (domContainer.components[ctName] = ct)

export const getDomComponent = (ctName) => domContainer.components[ctName]
export const getActualeCompomentName = () => domContainer.actualeComponentName

/**
 * 
 */
export const mcData = domContainer.mcData

/**
 * 
 */
const domConf = () => domContainer.conf

const domConfStrignifyList = ['mcElement', 'actuelTreeObj', 'actualeEdit',]
const domConfStrignifyFn = (k, v) =>
    !domConfStrignifyList.includes(k)
    && v || undefined
export const domConfLocationHash = () => JSON.stringify(domConf, domConfStrignifyFn)
export const domConfStrignify = () => {
    const x = JSON.stringify(domConf, domConfStrignifyFn, 2)
    console.log(x)
    console.log(domConfLocationHash())
    window.location.href = '#cj=' + domConfLocationHash()
}

export const actualeEdit = () => domConf().actualeEdit

/**
 * 
 * @returns 
 */
export const actuelTreeObj = () => domConf().actuelTreeObj
/**
 * 
 * @param {*} pathTreeStr 
 * @returns 
 */
export const setActuelTreeObj = pathTreeStr => {
    setActualeCompomentName('tree')
    domContainer.conf.actualeEdit.tree =
        domConf().actuelTreeObj = pathTreeStr.split(',').reduce((o, k) => o[k], domContainer.conf)
    getDomComponent('actualeEdit').count++
    getDomComponent('adnEditPanel').count++
    return domConf().actuelTreeObj
}

/**
 * 
 * @param {*} treeRootId 
 * @returns 
 */
export const initActuelTreeOpenedId = treeRootId => (domConf().actuelTreeObj.openedId
    || (domConf().actuelTreeObj.openedId = {}))[treeRootId]
    || (domConf().actuelTreeObj.openedId[treeRootId] = [])

/**
 * 
 * @param {*} path 
 * @param {*} treeRootId 
 * @param {*} adnId 
 * @returns 
 */
export const treeOpenedChildOnOff = (treeRootId, adnId) => {
    const actuelTreeObj = domConf().actuelTreeObj
    const actuelTreeOpenedId = initActuelTreeOpenedId(treeRootId)
    !actuelTreeOpenedId.includes(adnId)
        && actuelTreeOpenedId.push(adnId)
        || (actuelTreeObj.openedId[treeRootId] = actuelTreeOpenedId.filter(i => i !== adnId))
    return actuelTreeObj.openedId[treeRootId]
}
export const reViewAdn = adnId => Okeys(actuelTreeObj().mcElement)
    .forEach(rootId => actuelTreeObj().mcElement[rootId][adnId] &&
        actuelTreeObj().mcElement[rootId][adnId].count++)
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
    !rawConfStr.includes('cj=') && initUriDomConf(rawConfStr)
    || initJsonDomConf(rawConfStr.replace('cj=', ''))

const initJsonDomConf = (rawConfStr, ppId) => {
    const confJson = JSON.parse(decodeURI(rawConfStr))
    console.log(domContainer.conf)
    domContainer.conf.tree = confJson.tree
    !ppId && (ppId = 0)
    domContainer.conf.actuelTreeObj = domContainer.conf.tree[ppId]
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
    'tree' == uriDomConf_l[0] && ((
        domContainer.conf.tree || (domContainer.conf.tree = {})
    )[ppId] = { rootList: uriDomConf_l.slice(1) })
    domContainer.conf.actuelTreeObj = domContainer.conf.tree[ppId]
    return domContainer.conf
}

const Okeys = Object.keys

