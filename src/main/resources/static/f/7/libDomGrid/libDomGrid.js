'use strict'
/**
 * Algoritmed ©, EUPL-1.2 or later.
 * 
 */

const domContainer = { conf: {}, mcData: { eMap: {}, parentChilds: {} }, component: {} }
console.log(domContainer)
/**
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
 * @param {*} adn 
 * @returns 
 */
export const setToEMap = adn => mcData.eMap[adn.doc_id] = adn

/**
 * 
 * @param {*} jsonAdnList 
 * @returns 
 */
export const initNewMc = jsonAdnList => jsonAdnList.forEach(adn => {
    setToEMap(adn)
    domComponent.mcElement[adn.doc_id].count++
})

/**
 * 
 * @returns 
 */
export const uniqueIdPageRead = () => Okeys(domContainer.conf.tree)
    .reduce((l, im) => domContainer.conf.tree[im].filter(im2 => !l.includes(im2))
        .reduce((l, im2) => l.push(im2) && l, l) && l, [])

/**
 * 
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
    )[ppId] = uriDomConf_l.slice(1))
}
const Okeys = Object.keys