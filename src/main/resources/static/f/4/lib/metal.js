'use strict'
/**
 * Algoritmed ©
 * MCD, mcd -- Meta Content Data
 * МКД      -- Мета-контент дані
 * ADN, adn -- Abstract Data Node
 * METaL, metal -- Modeling businEss Task Language
 *              -- Мова моделювання завдань бізнесу
 * MEDAS, medas -- MEtal DAta Structure. Build from MCD.
 * PP, pp -- Page Part. Block of MCD or MEDAS in Application Development Page.
 * pl2 -- Panel 2
 * ppl2 -- Part Panel 2. Panel 2 for one for all medas block
 * epl2 -- Element Panel 2. Panel 2 individual for some Element in medas block.
 */

export const
    metalData = {}, //TO_DELETE
    // mcd -- eMap:: key:doc_id, value:ADN; 
    // parentChild:: key: doc_id, value: [doc_id...] 
    mcd = { eMap: {}, parentChild: {} },
    // Config for Page Part to include and use in other grid.
    confPP = {},
    // METaL container to build confPP.
    metalFnConfPP = {},
    ppInteractivity = {
        fn: {}
        , appComponents: { // Components of web-application
            eMap: {}, // MCD components to manage
        }
    }

ppInteractivity.clickDropDownOpenId = dropDownOpenId => {
    const ddl = ppInteractivity.dropDownOpenId && ppInteractivity.dropDownOpenId.split('_')
        , edAdnId = ppInteractivity.dropDownOpenId && ddl[2]
    ddl && ppInteractivity.appComponents.ppId[ddl[2]] && // ppCmdEd_fly_1
        ppInteractivity.appComponents.ppId[ddl[2]][ddl[0]].count++
    edAdnId && ppInteractivity.appComponents.eMap[edAdnId] &&
        Object.keys(ppInteractivity.appComponents.eMap[edAdnId])
            .filter(k => k.includes('adnMenu_'))
            .forEach(k => ppInteractivity.appComponents.eMap[edAdnId][k].count++)

    ppInteractivity.dropDownOpenId == dropDownOpenId
        && delete ppInteractivity.dropDownOpenId
        || (ppInteractivity.dropDownOpenId = dropDownOpenId)
}

ppInteractivity.fn.setAdnComponent = (adnId, key, component) => {
    !ppInteractivity.appComponents.eMap[adnId]
        && (ppInteractivity.appComponents.eMap[adnId] = {})
    ppInteractivity.appComponents.eMap[adnId][key] = component
}

ppInteractivity.fn.mcdIdSortClick = (ppId, medas, location, mcdId) => {
    const ppMedas1 = confPP.ppId[ppId].medas[medas]
        , ppMedas = ppMedas1[location.split('_')[1]] || ppMedas1
    const lToSort = ppMedas.l_mcdId
    ppMedas.l_mcdId = lToSort.splice(lToSort.indexOf(mcdId), 1).concat(lToSort)

    console.log(ppMedas)

    ppInteractivity.appComponents.ppId[ppId].tPageParts.count++
    Object.keys(ppInteractivity.appComponents.ppId[ppId].medas[medas].mcDataSort)
        .forEach(location => ppInteractivity.appComponents
            .ppId[ppId].medas[medas].mcDataSort[location].count++)
    ppInteractivity.fn.ppId(ppId).ppCmd.count++
}

ppInteractivity.fn.ppIdMedas = (ppId, medas) => {
    ppInteractivity.fn.ppId(ppId)
    !ppInteractivity.appComponents.ppId[ppId].medas &&
        (ppInteractivity.appComponents.ppId[ppId].medas = {});
    !ppInteractivity.appComponents.ppId[ppId].medas[medas] &&
        (ppInteractivity.appComponents.ppId[ppId].medas[medas] = {})
    return ppInteractivity.appComponents.ppId[ppId].medas[medas]
}

ppInteractivity.fn.ppId = ppId => {
    (ppInteractivity.appComponents.ppId ||
        (ppInteractivity.appComponents.ppId = {}));
    !ppInteractivity.appComponents.ppId[ppId] &&
        (ppInteractivity.appComponents.ppId[ppId] = {});
    return ppInteractivity.appComponents.ppId[ppId]
}

metalFnConfPP.initPageParts = (rawPpStr, ppId) => {
    console.log(rawPpStr, ppId)

    !rawPpStr.includes('cj=') &&
        metalFnConfPP.initFromURI(rawPpStr, ppId)
    rawPpStr.includes('cj=') &&
        metalFnConfPP.initFromJson(rawPpStr.replace('cj=', ''), ppId)
}

const initConfPP = (ppId) => {
    // pp -- page part
    !confPP && (confPP = {})
    !confPP.l_ppId && (confPP.l_ppId = [])
    !confPP.ppId && (confPP.ppId = {})
    confPP.l_ppId.push(ppId)
    confPP.ppId[ppId] = {}
}

const confMedas = idList => idList.reduce((o, im) =>
    o.l_mcdId.push(im) && (o.mcdId[im] = {}) && o, { l_mcdId: [], mcdId: {}, })

metalFnConfPP.initFromURI = (rawPpStr, ppId) => {
    initConfPP(ppId)
    // console.log(JSON.stringify(confPP), confPP)
    const rawPp = rawPpStr.split(';')

    rawPp.filter(im => im.length != 0).filter(im => !im.split(',')[0].includes('_'))
        .reduce((o, im) =>
            o.l_medas.push(im.split(',')[0])
            && (confPP.ppId[ppId].medas[im.split(',')[0]] = confMedas(im.split(',').slice(1)))
            && o
            , (confPP.ppId[ppId] = { l_medas: [], medas: {}, }))

    rawPp.filter(im => im.split(',')[0].includes('_')).reduce((o, im) => {
        const medas = confPP.ppId[ppId].medas[im.split(',')[0].split('_')[0]]
        medas[im.split(',')[0].split('_')[1]] = confMedas(im.split(',').slice(1))
        return o
    }, {})

}
