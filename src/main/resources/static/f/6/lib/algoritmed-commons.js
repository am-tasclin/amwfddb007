'use strict'
/**
 * Algoritmed ©, EUPL-1.2 or later.
 * DOM -- Data & Ontology editor & Meta data modeler
 * Dpp -- DOM Page Part
 * 
 */
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

export const dppItyComponent = dppInteractivity.appComponents
export const addDppItyComponent = (cName, component) => dppInteractivity.appComponents[cName] = component

export const dppItyDevComponent = dev => dppInteractivity.appComponents.dev = dev

export const minSpaceJson = json => JSON.stringify(json, '', 2)
    .replace(/\s+]/g, ']').replace(/\s+}/g, '}')
    .replace(/\[\s+"/g, '\["').replace(/",\s+"/g, '", "')
