'use strict'
/**
 * Algoritmed ©, EUPL-1.2 or later.
 * DOM -- Data & Ontology editor & Meta data modeler
 * Dpp -- DOM Page Part
 * 
 */
export const minSpaceJson = json => JSON.stringify(json, '', 2)
    .replace(/\s+]/g, ']').replace(/\s+}/g, '}')
    .replace(/\[\s+"/g, '\["').replace(/",\s+"/g, '", "')
