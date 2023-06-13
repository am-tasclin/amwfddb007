'use strict'
/**
 * Algoritmed ©, EUPL-1.2 or later.
 * MCD, mcd -- Meta Content Data
 * МКД      -- Мета-контент дані
 * ADN, adn -- Abstract Data Node
 * DOM -- Data & Ontology editor & Meta-data modeler
 * METaL, metal -- Modeling businEss Task Language
 *              -- Мова моделювання завдань бізнесу
 * MEDAS, medas -- MEtal DAta Structure. Build from MCD.
 * PP, pp -- Page Part. Block of MCD or MEDAS in Application Development Page.
 * Dpp -- DOM Page Part
 * pl2 -- Panel 2
 * ppl2 -- Part Panel 2. Panel 2 for one for all medas block
 * epl2 -- Element Panel 2. Panel 2 individual for some Element in medas block.
 * aco -- Application Component Object
 */

// Config for Dpp to include and use in other grid.
export const confDpp = {}
export const confDppId = ppId => confDpp.ppId[ppId || 1]
export const confDppMedasMcdId = (val, ppId, medas) => {
    const valList = val.replace(/\s+/g, '').split(',').filter(im => im)
        , dppMedas = confDpp.ppId[ppId].medas[medas]
    valList.filter(mcdId => !dppMedas.mcdId[mcdId])
        .forEach(mcdId => dppMedas.mcdId[mcdId] = {})
    dppMedas.l_mcdId = valList
    dppInteractivity.fn.ppId(ppId).tGridDpp.aco.count++
    console.log(dppInteractivity.fn.ppId(ppId))
    Object.keys(dppInteractivity.fn.ppId(ppId))
        .filter(k => k.includes('ppConfEd_'))
        .forEach(k => dppInteractivity.fn.ppId(ppId).count++)
}

// Meta Content Data from DB
export const mcd = {
    eMap: {}, // eMap:: key:doc_id, value:ADN; 
    parentChild: {}, // parentChild:: key: doc_id, value: [doc_id...] 
}
export const
    // METaL container to build confPP.
    metalFnConfPP = {},
    dppInteractivity = {
        fn: {},
        appComponents: { // Components of web-application
            meMap: {}, // MCD MElement components to manage
        },
    }

dppInteractivity.clickDropDownOpenId = (dropDownOpenId, ppId) => {
    const edAdnId = dppInteractivity.dropDownOpenId
        && dppInteractivity.dropDownOpenId.split('_')[2]
    componentActivate.meMap(edAdnId)
    componentActivate.confDppEd(ppId)
    componentActivate.dropDownOpenIdOnOff(dropDownOpenId)
}

const componentActivate = {}
componentActivate.meMap = adnId => adnId && dppInteractivity.appComponents.meMap[adnId] &&
    Object.keys(dppInteractivity.appComponents.meMap[adnId])
        .filter(k => k.includes('adnMenu_'))
        .forEach(k => dppInteractivity.appComponents.meMap[adnId][k].count++)

componentActivate.confDppEd = ppId => dppInteractivity.appComponents.ppId[ppId]
    && dppInteractivity.appComponents.ppId[ppId].tGridDpp.confDppEd.aco.count++

componentActivate.dropDownOpenIdOnOff = dropDownOpenId => dppInteractivity.dropDownOpenId == dropDownOpenId
    && delete dppInteractivity.dropDownOpenId || (dppInteractivity.dropDownOpenId = dropDownOpenId)

dppInteractivity.fn.setAdnComponent = (adnId, key, component) => {
    !dppInteractivity.appComponents.meMap[adnId]
        && (dppInteractivity.appComponents.meMap[adnId] = {})
    dppInteractivity.appComponents.meMap[adnId][key] = component
}

dppInteractivity.fn.mcdIdSortClick = (ppId, medas, location, mcdId) => {
    const ppMedas1 = confDpp.ppId[ppId].medas[medas]
        , ppMedas = ppMedas1[location.split('_')[1]] || ppMedas1
    const lToSort = ppMedas.l_mcdId
    ppMedas.l_mcdId = lToSort.splice(lToSort.indexOf(mcdId), 1).concat(lToSort)

    console.log(ppMedas)

    dppInteractivity.appComponents.ppId[ppId].tPagePart.count++
    Object.keys(dppInteractivity.appComponents.ppId[ppId].medas[medas].mcDataSort)
        .forEach(location => dppInteractivity.appComponents
            .ppId[ppId].medas[medas].mcDataSort[location].count++)
    dppInteractivity.fn.ppId(ppId).ppCmd.count++
}

dppInteractivity.fn.ppIdMedas = (ppId, medas) => {
    dppInteractivity.fn.ppId(ppId)
    !dppInteractivity.appComponents.ppId[ppId].medas &&
        (dppInteractivity.appComponents.ppId[ppId].medas = {});
    !dppInteractivity.appComponents.ppId[ppId].medas[medas] &&
        (dppInteractivity.appComponents.ppId[ppId].medas[medas] = {})
    return dppInteractivity.appComponents.ppId[ppId].medas[medas]
}

dppInteractivity.fn.ppId = ppId => {
    (dppInteractivity.appComponents.ppId ||
        (dppInteractivity.appComponents.ppId = {}));
    !dppInteractivity.appComponents.ppId[ppId] &&
        (dppInteractivity.appComponents.ppId[ppId] = {});
    return dppInteractivity.appComponents.ppId[ppId]
}

metalFnConfPP.initPagePart = (rawPpStr, ppId) => {
    console.log(rawPpStr, ppId)

    !rawPpStr.includes('cj=') &&
        metalFnConfPP.initFromURI(rawPpStr, ppId)
    rawPpStr.includes('cj=') &&
        metalFnConfPP.initFromJson(rawPpStr.replace('cj=', ''), ppId)
}

const initConfPP = ppId => {
    // pp -- page part
    !confDpp && (confDpp = {})
    !confDpp.l_ppId && (confDpp.l_ppId = [])
    !confDpp.ppId && (confDpp.ppId = {})
    confDpp.l_ppId.push(ppId)
    confDpp.ppId[ppId] = {}
}

const confMedas = idList => idList.reduce((o, im) =>
    o.l_mcdId.push(im) && (o.mcdId[im] = {}) && o, { l_mcdId: [], mcdId: {}, })

metalFnConfPP.initFromURI = (rawPpStr, ppId) => {
    initConfPP(ppId)
    // console.log(JSON.stringify(confPP), confPP)
    const rawPp = rawPpStr.split(';')

    rawPp.filter(im => im.length != 0).filter(im => !im.split(',')[0].includes('_'))
        .reduce((o, im) => o.l_medas.push(im.split(',')[0])
            && (confDpp.ppId[ppId].medas[im.split(',')[0]] = confMedas(im.split(',').slice(1)))
            && o
            , (confDpp.ppId[ppId] = { l_medas: [], medas: {}, }))

    rawPp.filter(im => im.split(',')[0].includes('_')).reduce((o, im) => {
        const medas = confDpp.ppId[ppId].medas[im.split(',')[0].split('_')[0]]
        medas[im.split(',')[0].split('_')[1]] = confMedas(im.split(',').slice(1))
        return o
    }, {})

}
