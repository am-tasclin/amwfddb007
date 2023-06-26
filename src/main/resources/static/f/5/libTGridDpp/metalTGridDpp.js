'use strict'
/**
 * Algoritmed ©, EUPL-1.2 or later.
 * MCD, mcd -- Meta Content Data
 * МКД      -- Мета-контент дані
 * MCDB     -- MC Data Bank. Model in relational database.
 * ADN, adn -- Abstract Data Node
 * 
 * MEDAS, medas -- MEtal DAta Structure. Build from MCD.
 * DOM -- Data & Ontology editor & Meta data modeler
 * METaL, 
 * metal, ml    -- Modeling businEss Task Language
 *              -- Мова моделювання завдань бізнесу
 * PP, pp -- Page Part. Block of MCD or MEDAS in Application Development Page.
 * Dpp -- DOM Page Part
 * pl2 -- Panel 2
 * ppl2 -- Part Panel 2. Panel 2 for one for all medas block
 * epl2 -- Element Panel 2. Panel 2 individual for some Element in medas block.
 * 
 * aco -- Application Component Object
 */
// import { mcd } from '/f/5/lib/MetaContentData.js'
import { confDpp, confDppMedas, ppMedasKey } from '/f/5/lib/ConfDomPagePart.js'

export const
    dppInteractivity = {    // dppIty -- DOM Page Part interactivity data and functions.
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
    , meMap = dppInteractivity.appComponents.meMap

export const dppItyDevComponent = dev => dppInteractivity.appComponents.dev = dev
export const dppItyCtViewJson = () => {
    const cvj = {}

    cvj.l_appComponents = Okeys(dppInteractivity.appComponents)

    Okeys(dppInteractivity.appComponents.meMap).reduce((o, im) =>
        (o[im] = Okeys(dppInteractivity.appComponents.meMap[im]))
        && o, cvj.meMap = {})
    dppInteractivity.appComponents.ppId &&
        Okeys(dppInteractivity.appComponents.ppId).reduce((o, ppId) => {
            o[ppId] = {}
            o[ppId].l = Okeys(dppInteractivity.appComponents.ppId[ppId])
            o[ppId].l_sortMCData = Okeys(dppInteractivity.appComponents
                .ppId[ppId].sortMcData)
            return o
        }, cvj.ppId = {})
    return cvj
}

export const Okeys = Object.keys
const reViewConfDppEd = ppId => {
    dppInteractivityPpId(ppId).confDppEd.count++
    reViewConfDppEdPanel(ppId)
}
    , reViewConfDppEdPanel = ppId => Okeys(dppInteractivity.appComponents.ppId[ppId])
        .filter(im => im.includes('confDppEdPanel')).forEach(im => {
            dppInteractivityPpId(ppId)[im].epl2Data = dppInteractivity.epl2Data
            dppInteractivityPpId(ppId)[im].count++
        })

export const reViewSortMCData2p = (ppId, medas) => {
    Okeys(dppInteractivityPpId(ppId).sortMcData)
        .filter(im => im.split('_')[1] == ppId && im.split('_')[2] == medas)
        .forEach(im => dppInteractivityPpId(ppId).sortMcData[im].count++)
    reViewConfDppEd(ppId)
}

// mgd -- metalTGridDpp prefix
export const mgdAdnMenu = {} // mgd for AdnMenu.js logic
mgdAdnMenu.adnClick = (adnId, ppId, medas, ppl2) => {
    const cgDppMedas = confDppMedas(ppId, medas, ppl2)
    !cgDppMedas.openedId && (cgDppMedas.openedId = [])
    !cgDppMedas.openedId.includes(adnId)
        && cgDppMedas.openedId.push(adnId)
        || cgDppMedas.openedId.splice(cgDppMedas.openedId.indexOf(adnId), 1)

    dppInteractivity.fn.reviewPpidMedas(ppId, medas, ppl2)
}

export const mgdSortMcData = {} // mgd for SortMCData.js logic

mgdSortMcData.sortMcdIdClick = (ppId, medas, ppl2, mcdId) => {
    const ppMedas = confDppMedas(ppId, medas, ppl2)
        , lToSort = ppMedas.l_mcdId
    ppMedas.l_mcdId = lToSort.splice(lToSort.indexOf(mcdId), 1).concat(lToSort)

    dppInteractivity.fn.reviewPpidMedas(ppId, medas, ppl2)
}

export const reViewMeMcdPpMedasPl = (mcdId, ppMedasKey) => {
    const x = Okeys(meMap[mcdId])
        .filter(im2 => im2.includes(ppMedasKey))
        .filter(im2 => im2.includes('mElement_'))
    x.forEach(im2 => meMap[mcdId][im2].count++)
}

dppInteractivity.fn.reviewPpidMedas = (ppId, medas, isPl2) => {

    const ppMedas = confDppMedas(ppId, medas, isPl2)
        // , meMap = dppInteractivity.appComponents.meMap
        , ppMedas_Key = ppMedasKey(ppId, medas, isPl2)
    //, keyPpMedasPl = ppId + '_' + medas + '_' + (isPl2 && 2 || 1)

    reViewSortMCData2p(ppId, medas)
    // reViewSortMCData2p(ppId, ppMedas_Key)
    // const meMapIdList = Okeys(meMap).filter(im => ppMedas.l_mcdId.includes(im))
    // const meMapIdList = ppMedas.l_mcdId
    console.log(ppMedas_Key)
    // meMapIdList.forEach(im => Okeys(meMap[im])
    ppMedas.l_mcdId.forEach(mcdId => reViewMeMcdPpMedasPl(mcdId, ppMedas_Key))

    dppInteractivity.appComponents.ppId[ppId].tGridDpp.count++
    dppInteractivity.appComponents.dev.count++
}

export const mgdConfDppEdPanel = {} // mgd for ConfDppEdPanel.js logic
mgdConfDppEdPanel.epl2Click = (ppId, medas, mcdId) => {
    console.log(dppInteractivity.epl2Data[medas])
    console.log(medas, mcdId, confDpp.ppId[ppId].medas[medas].epl2)
    const epl2 = confDpp.ppId[ppId].medas[medas].epl2
        , epl2Data = dppInteractivity.epl2Data[medas]

    !epl2Data.includes(mcdId)
        && epl2Data.push(mcdId) || epl2Data.splice(epl2Data.indexOf(mcdId), 1)

    !epl2.mcdId[mcdId]
        && (epl2.mcdId[mcdId] = {}) || delete epl2.mcdId[mcdId]
    // && ((epl2.mcdId[mcdId] = {}) && epl2.l_mcdId.push(mcdId))
    // || (delete epl2.mcdId[mcdId] && epl2.l_mcdId.splice(epl2.l_mcdId.indexOf(mcdId), 1))
    dppInteractivity.appComponents.ppId[ppId].tGridDpp.count++
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

dppInteractivity.clickDropDownOpenId = (dropDownOpenId, ppId) => {
    const edAdnId = dppInteractivity.dropDownOpenId
        && dppInteractivity.dropDownOpenId.split('_')[2]
    componentActivate.meMap(edAdnId)
    componentActivate.confDppEd(ppId)
    componentActivate.dropDownOpenIdOnOff(dropDownOpenId)
}
export const dropDownOpenId = () => dppInteractivity.dropDownOpenId

const componentActivate = {} // 
componentActivate.meMap = adnId => adnId && dppInteractivity.appComponents.meMap[adnId] &&
    Object.keys(dppInteractivity.appComponents.meMap[adnId])
        .filter(k => k.includes('adnMenu_'))
        .forEach(k => dppInteractivity.appComponents.meMap[adnId][k].count++)

componentActivate.confDppEd = ppId => dppInteractivity.appComponents.ppId[ppId]
    && dppInteractivity.appComponents.ppId[ppId].confDppEd.count++

componentActivate.dropDownOpenIdOnOff = dropDownOpenId => dppInteractivity.dropDownOpenId == dropDownOpenId
    && delete dppInteractivity.dropDownOpenId || (dppInteractivity.dropDownOpenId = dropDownOpenId)

export const setMeMapComponent = (adnId, key, component) => {
    // console.log(adnId, key)
    !dppInteractivity.appComponents.meMap[adnId]
        && (dppInteractivity.appComponents.meMap[adnId] = {})
    dppInteractivity.appComponents.meMap[adnId][key] = component
}

dppInteractivity.fn.sortMedas = (ppId, medas) => {
    const l_medas = confDpp.ppId[ppId].l_medas
        , l_medas2 = l_medas.splice(l_medas.indexOf(medas), 1).concat(l_medas)
        , ppIdObj = dppInteractivityPpId(ppId)
    // console.log(ppId, medas, l_medas, l_medas2, ppIdObj)
    confDpp.ppId[ppId].l_medas = l_medas2
    ppIdObj.tGridDpp.count++
    ppIdObj.sortMedas.count++
    reViewConfDppEd(ppId)
}

export const dppInteractivityPpId = ppId => {
    (dppInteractivity.appComponents.ppId ||
        (dppInteractivity.appComponents.ppId = {}));
    !dppInteractivity.appComponents.ppId[ppId] &&
        (dppInteractivity.appComponents.ppId[ppId] = {});
    return dppInteractivity.appComponents.ppId[ppId]
}

export const
    metalFnConfPP = {}     // METaL container to build confPP.

metalFnConfPP.initPagePart = (rawPpStr, ppId) => {
    initConfPP(ppId)

    !rawPpStr.includes('cj=') &&
        metalFnConfPP.initFromURI(rawPpStr, ppId)
    rawPpStr.includes('cj=') &&
        metalFnConfPP.initFromJson(rawPpStr.replace('cj=', ''), ppId)
}

metalFnConfPP.initFromJson = (jsonStr, ppId) => {
    const json = JSON.parse(decodeURI(jsonStr))
    confDpp.ppId[ppId] = json
}

const initConfPP = ppId => {
    // pp -- page part
    !confDpp && (confDpp = {})
    !confDpp.l_ppId && (confDpp.l_ppId = [])
    !confDpp.ppId && (confDpp.ppId = {})
    confDpp.l_ppId.push(ppId)
    confDpp.ppId[ppId] = {}
}

const initMedas = idList => idList.reduce((o, mcdId) =>
    o.l_mcdId.push(mcdId) && (o.mcdId[mcdId] = {}) && o, { l_mcdId: [], mcdId: {}, })

metalFnConfPP.initFromURI = (rawPpStr, ppId) => {
    console.log(rawPpStr, ppId, confDpp)
    const rawPp = rawPpStr.split(';')
        , confPpId = (confDpp.ppId[ppId] = { l_medas: [], medas: {}, })

    rawPp.filter(im => im.length != 0)
        .filter(im => !im.split(',')[0].includes('_'))// is not panel2
        .reduce((o, im) => o.l_medas.push(im.split(',')[0])
            && (confPpId.medas[im.split(',')[0]] = initMedas(im.split(',').slice(1)))
            && o, confPpId)

    rawPp.filter(im => im.split(',')[0].includes('_')) // is ppl2
        .filter(im => 'ppl2' == im.split(',')[0].split('_')[1])
        .forEach(im => confPpId.medas[im.split(',')[0].split('_')[0]]
            .ppl2 = initMedas(im.split(',').slice(1)))

    rawPp.filter(im => im.split(',')[0].includes('_')) // is epl2
        .filter(im => 'epl2' == im.split(',')[0].split('_')[1])
        .forEach(im => im.split(',').slice(1).reduce((o, mcdId) =>
            (o.mcdId[mcdId] = {}) && o, confPpId.medas[im.split(',')[0].split('_')[0]]
                .epl2 = { mcdId: {} }))
}

export const minSpaceJson = json => JSON.stringify(json, '', 2)
    .replace(/\s+]/g, ']').replace(/\s+}/g, '}')
    .replace(/\[\s+"/g, '\["').replace(/",\s+"/g, '", "')
