'use strict'
/**
 * Algoritmed ©, EUPL-1.2 or later.
 * DOM -- Data & Ontology editor & Meta data modeler
 * Dpp -- DOM Page Part
 * 
 */
import {
    confDpp, forEachPpMedas, ppMedasPpl2Key
} from '/f/6/lib/confDomPagePart.js'
import { mcd } from '/f/6/lib/MetaContentData.js'

const dppInteractivity = {    // dppIty -- DOM Page Part interactivity data and functions.
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
        ppId: {},
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

export const initReViewOpened = () => forEachPpMedas((ppMedas, ppId, medas) =>
    ppMedas.openedId && ppMedas.openedId.filter(id => meMap[id]).forEach(id =>
        meMap[id]['mElement' + ppMedasPpl2Key(ppId, medas)].count++))

export const reViewMeMap = l => l.filter(adnId => meMap[adnId])
    .forEach(adnId => Okeys(meMap[adnId])
        .forEach(key => meMap[adnId][key].count++))

export const meMap = dppInteractivity.appComponents.meMap
export const addMeMap = (adnId, key, component) => {
    // console.log(adnId, key)
    !dppInteractivity.appComponents.meMap[adnId]
        && (dppInteractivity.appComponents.meMap[adnId] = {})
    dppInteractivity.appComponents.meMap[adnId][key] = component
}

export const dppItyComponent = dppInteractivity.appComponents
export const addDppItyComponent = (cName, component) => dppItyComponent[cName] = component
export const addDppIdComponent = (ppId, cName, component) => dppInteractivityPpId(ppId)[cName] = component
export const dppInteractivityPpId = ppId => {
    !dppItyComponent.ppId[ppId] && (dppItyComponent.ppId[ppId] = {})
    return dppItyComponent.ppId[ppId]
}
const Okeys = Object.keys
