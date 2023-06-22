'use strict'
/**
 * Algoritmed ©, EUPL-1.2 or later.
 * MCD, mcd -- Meta Content Data
 * 
 */
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
