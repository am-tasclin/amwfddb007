'use strict'
/**
 * Algoritmed ©, EUPL-1.2 or later.
 * MCD, mcd -- Meta Content Data
 * МКД      -- Мета-контент дані
 * MCDB     -- MC Data Bank. Model in relational database.
 * ADN, adn -- Abstract Data Node
 * 
 * DOM -- Data & Ontology editor & Meta data modeler
 * METaL, 
 * metal, ml    -- Modeling businEss Task Language
 *              -- Мова моделювання завдань бізнесу
 * MEDAS, medas -- MEtal DAta Structure. Build from MCD.
 * PP, pp -- Page Part. Block of MCD or MEDAS in Application Development Page.
 * Dpp -- DOM Page Part
 * pl2 -- Panel 2
 * ppl2 -- Part Panel 2. Panel 2 for one for all medas block
 * epl2 -- Element Panel 2. Panel 2 individual for some Element in medas block.
 * 
 * aco -- Application Component Object
 */

// Config for Dpp to include and use in other grid.
export const confDpp = {}
console.log(confDpp)
export const confDppId = ppId => confDpp.ppId[ppId || 1]
export const confDppMedas = (ppId, medas) => confDppId(ppId).medas[medas]
export const confDppMedasMcdId = (val, ppId, medas) => {
    const valList = val.replace(/\s+/g, '').split(',').filter(im => im)
        , dppMedas = confDpp.ppId[ppId].medas[medas]
    valList.filter(mcdId => !dppMedas.mcdId[mcdId])
        .forEach(mcdId => dppMedas.mcdId[mcdId] = {})
    dppMedas.l_mcdId = valList
    /*
    Object.keys(dppInteractivity.appComponents.sortMCData)
    .filter(im => im.split('_')[0] == ppId && im.split('_')[1] == medas)
    .forEach(im => dppInteractivity.appComponents.sortMCData[im].count++)
    */
    reViewSortMCData2p(ppId, medas)
    dppInteractivity.fn.ppId(ppId).tGridDpp.count++
}

const confMedas = {
    medas: {
        lr: 'Left|Right ::mc', //mc: Midnight Commander
        mcDd: 'Data Dictionary',
        mcEt: 'Element',
        mcPl: 'Profile',
    }, panel2: {
        epl2: ['mcEt', 'mcPl']
    }
}

export const confMedasDd = confMedas.medas
export const confMedasEpl2 = confMedas.panel2.epl2

const Okeys = Object.keys
    , reViewConfDppEd = ppId => {
        const ppIdObj = dppInteractivity.fn.ppId(ppId)
        ppIdObj.confDppEd.count++
        reViewConfDppEdPanel(ppId)
        // const l_confDppEd = Okeys(ppIdObj.tGridDpp.confDppEd).filter(im => 'aco' != im)
        // l_confDppEd.forEach(im => ppIdObj.tGridDpp.confDppEd[im].aco.count++)
    }
    , reViewConfDppEdPanel = ppId => Okeys(dppInteractivity.appComponents.ppId[ppId])
        .filter(im => im.includes('confDppEdPanel')).forEach(im => {
            dppInteractivity.appComponents.ppId[ppId][im].epl2Data = dppInteractivity.epl2Data
            dppInteractivity.appComponents.ppId[ppId][im].count++
        })
    , reViewSortMCData2p = (ppId, medas) => {
        Okeys(dppInteractivity.appComponents.sortMCData)
            .filter(im => im.split('_')[0] == ppId && im.split('_')[1] == medas)
            .forEach(im => dppInteractivity.appComponents.sortMCData[im].count++)
        reViewConfDppEd(ppId)
    }

export const mcd = { // Meta Content Data from DB
    eMap: {}, // eMap:: key:doc_id, value:ADN; 
    /**
     * Data from MCDB
     * Used for connect to data by ID (doc_id)
     */
    parentChild: {}, // parentChild:: key: doc_id, value: [doc_id...] 
    /**
     * Used for navigate in hierarchical data structure.
     */
}

// mgd -- metalTGridDpp prefix
export const mgdConfDppEdPanel = {}
mgdConfDppEdPanel.epl2Click = (ppId, medas, mcdId) => {
    console.log(dppInteractivity.epl2Data[medas])
    console.log(medas, mcdId, confDpp.ppId[ppId].medas[medas].epl2)
    const epl2 = confDpp.ppId[ppId].medas[medas].epl2
        , epl2Data = dppInteractivity.epl2Data[medas]

    !epl2Data.includes(mcdId)
        && epl2Data.push(mcdId) || epl2Data.splice(epl2Data.indexOf(mcdId), 1)

    !epl2.mcdId[mcdId]
        && ((epl2.mcdId[mcdId] = {}) && epl2.l_mcdId.push(mcdId))
        || (delete epl2.mcdId[mcdId] && epl2.l_mcdId.splice(epl2.l_mcdId.indexOf(mcdId), 1))
    dppInteractivity.appComponents.ppId[ppId].tGridDpp.count++
    //dppInteractivity.appComponents.ppId[ppId].tGridDpp.aco.count++
    console.log(dppInteractivity.appComponents.ppId[ppId])
    reViewConfDppEdPanel(ppId)
}
mgdConfDppEdPanel.medasRemoveFromConfDpp = (ppId, medas) => {
    console.log(medas, confDppId(ppId).removeMedas)
    confDppId(ppId).removeMedas
        .splice(confDppId(ppId).removeMedas.indexOf(medas), 1)
    confDppId(ppId).l_medas
        .splice(confDppId(ppId).l_medas.indexOf(medas), 1)
    delete confDppId(ppId).medas[medas]
    //this.count++
    dppInteractivity.appComponents.ppId[ppId].tGridDpp.count++
    reViewConfDppEd(ppId)
}

mgdConfDppEdPanel.medasRemoveFromRemove = (ppId, medas) => {
    confDppId(ppId).removeMedas
        .splice(confDppId(ppId).removeMedas.indexOf(medas), 1)
    reViewConfDppEd(ppId)
}

mgdConfDppEdPanel.medasAddRemove = (ppId, medas) => {
    confDppId(ppId).l_medas.includes(medas)
        && !confDppId(ppId).removeMedas
        && (confDppId(ppId).removeMedas = [])

    confDppId(ppId).l_medas.includes(medas)
        && !confDppId(ppId).removeMedas.includes(medas)
        && confDppId(ppId).removeMedas.push(medas)

    !confDppId(ppId).l_medas.includes(medas)
        && confDppId(ppId).l_medas.push(medas)
        && (confDppId(ppId).medas[medas] = { l_mcdId: [], mcdId: {} })
    dppInteractivity.appComponents.ppId[ppId].tGridDpp.count++
    dppInteractivity.appComponents.ppId[ppId].sortMedas.count++
    reViewConfDppEd(ppId)
}

export const
    dppInteractivity = {    // DOM Page Part interactivity data and functions.
        /**
         * 
         */
        appComponents: {    // Components of web-application
            /**
             * Structure of application components.
             *  --.ppId[ppId] 
             *  .aco -- Place for application component Proxy
             *  --.ppId[ppId].tGridDpp
             *  --.ppId[ppId].tGridDpp.confDppEd
             * 
             */
            sortMCData: {},  // SortMCData components with complex keys
            /**
             * 
             */
            meMap: {},      // MElement components to manage MCD data
            /**
             * 
             */
        },
        fn: {},// Function for application component manage
        /**
         * 
         */
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
    && dppInteractivity.appComponents.ppId[ppId].confDppEd.count++
//&& dppInteractivity.appComponents.ppId[ppId].confDppEd.aco.count++
//&& dppInteractivity.appComponents.ppId[ppId].tGridDpp.confDppEd.aco.count++

componentActivate.dropDownOpenIdOnOff = dropDownOpenId => dppInteractivity.dropDownOpenId == dropDownOpenId
    && delete dppInteractivity.dropDownOpenId || (dppInteractivity.dropDownOpenId = dropDownOpenId)

dppInteractivity.fn.setAdnComponent = (adnId, key, component) => {
    !dppInteractivity.appComponents.meMap[adnId]
        && (dppInteractivity.appComponents.meMap[adnId] = {})
    dppInteractivity.appComponents.meMap[adnId][key] = component
    // dppInteractivity.appComponents.meMap[adnId][key] = { aco: component }
}

dppInteractivity.fn.sortMedas = (ppId, medas) => {
    const l_medas = confDpp.ppId[ppId].l_medas
        , l_medas2 = l_medas.splice(l_medas.indexOf(medas), 1).concat(l_medas)
        , ppIdObj = dppInteractivity.fn.ppId(ppId)
    // console.log(ppId, medas, l_medas, l_medas2, ppIdObj)
    confDpp.ppId[ppId].l_medas = l_medas2
    ppIdObj.tGridDpp.count++
    ppIdObj.sortMedas.count++
    reViewConfDppEd(ppId)
}

dppInteractivity.fn.sortMcdIdClick = (ppId, medas, keysuffix, mcdId) => {
    console.log(ppId, medas, keysuffix, mcdId)
    const ppMedas1 = confDpp.ppId[ppId].medas[medas]
        , ppMedas = ppMedas1[keysuffix.split('_')[1]] || ppMedas1
    const lToSort = ppMedas.l_mcdId
    ppMedas.l_mcdId = lToSort.splice(lToSort.indexOf(mcdId), 1).concat(lToSort)

    console.log(ppMedas)

    dppInteractivity.appComponents.ppId[ppId].tGridDpp.count++
    //dppInteractivity.appComponents.ppId[ppId].tGridDpp.aco.count++

    reViewSortMCData2p(ppId, medas)
    /*
    Object.keys(dppInteractivity.appComponents.ppId[ppId].medas[medas].sortMCData)
    .forEach(location => dppInteractivity.appComponents
        .ppId[ppId].medas[medas].sortMCData[location].count++)
        dppInteractivity.fn.ppId(ppId).ppCmd.count++
    */
}

dppInteractivity.fn.ppId = ppId => {
    (dppInteractivity.appComponents.ppId ||
        (dppInteractivity.appComponents.ppId = {}));
    !dppInteractivity.appComponents.ppId[ppId] &&
        (dppInteractivity.appComponents.ppId[ppId] = {});
    return dppInteractivity.appComponents.ppId[ppId]
}

export const
    metalFnConfPP = {}     // METaL container to build confPP.

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

const initMedas = idList => idList.reduce((o, im) =>
    o.l_mcdId.push(im) && (o.mcdId[im] = {}) && o, { l_mcdId: [], mcdId: {}, })

metalFnConfPP.initFromURI = (rawPpStr, ppId) => {
    initConfPP(ppId)
    // console.log(JSON.stringify(confPP), confPP)
    const rawPp = rawPpStr.split(';')

    rawPp.filter(im => im.length != 0).filter(im => !im.split(',')[0].includes('_'))
        .reduce((o, im) => o.l_medas.push(im.split(',')[0])
            && (confDpp.ppId[ppId].medas[im.split(',')[0]] = initMedas(im.split(',').slice(1)))
            && o, (confDpp.ppId[ppId] = { l_medas: [], medas: {}, }))

    rawPp.filter(im => im.split(',')[0].includes('_')).reduce((o, im) => {
        const medas = confDpp.ppId[ppId].medas[im.split(',')[0].split('_')[0]]
        medas[im.split(',')[0].split('_')[1]] = initMedas(im.split(',').slice(1))
        return o
    }, {})

}

export const
    minSpaceJson = json => JSON.stringify(json, '', 2)
        .replace(/\s+]/g, ']').replace(/\s+}/g, '}')
        .replace(/\[\s+"/g, '\["').replace(/",\s+"/g, '","')