'use strict'
/**
 * Algoritmed ©, EUPL-1.2 or later.
 * 
 */

const domContainer = { conf: {}, data: { eMap: {}, parentChilds: {} }, component: {} }
console.log(domContainer)
/**
 * 
 */

/**
 * 
 * @returns 
 */
export const uniqueIdPageRead = () => Okeys(domContainer.conf.tree)
    .reduce((l, im) => domContainer.conf.tree[im].filter(im2 => !l.includes(im2))
        .reduce((l, im2) => l.push(im2) && l, l) && l, [])

/**
 * 
 * @param {*} rawConfStr 
 */
export const initDomConfLogic = (rawConfStr) => {
    !rawConfStr.includes('cj=') && initUriDomConf(rawConfStr)
}

const initUriDomConf = (rawUriDomConf, ppId) => {
    const uriDomConf_l = rawUriDomConf.split(',')
    !ppId && (ppId = 0)
    // console.log(123, rawUriDomConf, uriDomConf_l, ppId)
    'tree' == uriDomConf_l[0] && ((
        domContainer.conf.tree || (domContainer.conf.tree = {})
    )[ppId] = uriDomConf_l.slice(1))
}
const Okeys = Object.keys