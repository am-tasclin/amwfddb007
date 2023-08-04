'use strict'
/**
 * Algoritmed ©, Licence EUPL-1.2 or later.
 * 
 */
import { executeSelectQuery } from './wsDbRw.js'
import { initNewMc } from '/f/7/libDomGrid/libDomGrid.js'
export const readAdnByIds = id_list => {
    const sql = selectDocVlStrByIds.replace(':idList', id_list.join(','))
    executeSelectQuery(sql).then(json => initNewMc(json.list)
    ).then(() => {
        console.log('read rr2', id_list)
    })
}

import { addNewMc, addToParentChild } from '/f/7/libDomGrid/libDomGrid.js'
/**
 * 
 * @param {*} parentId_list 
 */
export const readAdnByParentIds = parentId_list => {
    const sql = selectDocVlStrByParentIds.replace(':idList', parentId_list.join(','))
    // console.log(sql, parentId_list)
    return executeSelectQuery(sql).then(json => {
        addNewMc(json.list)
        const pl = addToParentChild(json.list)
        // console.log(pl, json.list,)
    })
}

import { initSelectMaker } from './libSqlMaker.js'
const selectDocVlStrMaker = initSelectMaker('selectDocVlStr', 'doc')
    .initLeftJoin('string', 'doc_id=string_id')
    .initColumns('doc_id, parent p, reference r, reference2 r2, value vl_str')

/**
 * 
 */
const selectDocVlStrByIds = selectDocVlStrMaker
    .initWhere('doc_id IN (:idList)').get()

/**
 * 
 */
const selectDocVlStrByParentIds = selectDocVlStrMaker
    .initWhere('parent IN (:idList)').get()
