'use strict'
/**
 * Algoritmed ©, EUPL-1.2 or later.
 * MCD, mcd -- Meta Content Data
 * 
 */
export const mcd = { // Container for Meta Content Data from DB
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

export const addToParentChild = jsonAdnList =>
    jsonAdnList.forEach(adn => (mcd.parentChild[adn.p] || (mcd.parentChild[adn.p] = [])).push(adn.doc_id))

export const addToEMap = jsonAdnList => {
    jsonAdnList.forEach(adn => mcd.eMap[adn.doc_id] = adn)
    console.log(mcd)
}

const Okeys = Object.keys