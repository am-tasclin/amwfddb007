'use strict'
/**
 * Algoritmed ©, EUPL-1.2 or later.
 * DOM -- Data & Ontology editor & Meta data modeler
 * Dpp -- DOM Page Part
 * 
 */

export const addToUniqueList = (lFrom, lTo) => lFrom.reduce((lTo2, im) =>
    pushListUnique(lTo2, im), lTo)
export const pushListUnique = (lTo, vl) =>
    !lTo.includes(vl) && lTo.push(vl) && lTo || lTo

export const minSpaceJson = json => JSON.stringify(json, '', 2)
    .replace(/\s+]/g, ']').replace(/\s+}/g, '}')
    .replace(/\[\s+"/g, '\["').replace(/",\s+"/g, '", "')
