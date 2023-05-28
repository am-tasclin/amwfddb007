'use strict'
/**
 * Algoritmed ©
 * metal -- model business task language
 * medas -- metal data structure
 * pp -- page part
 * 
 */

export const
    metalData = {},
    metalFnConfPP = {}

metalFnConfPP.initPageParts = (rawPpStr, ppId) => {
    console.log(rawPpStr, ppId)

    !rawPpStr.includes('cj=') &&
        metalFnConfPP.initFromURI(rawPpStr, ppId)

    rawPpStr.includes('cj=') &&
        metalFnConfPP.initFromJson(rawPpStr.replace('cj=', ''), ppId)
}

const initConfPP = (ppId) => {
    // pp -- page part
    !metalData.confPP && (metalData.confPP = {})
    !metalData.confPP.l_ppId && (metalData.confPP.l_ppId = [])
    !metalData.confPP.ppId && (metalData.confPP.ppId = {})
    metalData.confPP.l_ppId.push(ppId)
    metalData.confPP.ppId[ppId] = {}
}

metalFnConfPP.initFromURI = (rawPpStr, ppId) => {
    initConfPP(ppId)
    console.log(JSON.stringify(metalData.confPP), metalData.confPP)
    const rawPp = rawPpStr.split(';')
    rawPp.reduce((o, im) => {
        (o.l_medas || (o.l_medas = [])).push(im.split(',')[0]);
        (o.medas || (o.medas = {}))[im.split(',')[0]] = im.split(',').splice(1)
            .reduce((o, im) => (o[im] = {}) && o, {})
        return o
    }, metalData.confPP.ppId[ppId])
    console.log(metalData.confPP.ppId[ppId])
}
