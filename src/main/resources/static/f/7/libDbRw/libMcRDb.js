'use strict'
/**
 * Algoritmed ©, Licence EUPL-1.2 or later.
 * 
 */
import { executeSelectQuery } from './wsDbRw.js'
import { executeAdnInsertQuery } from './wsDbRw.js'
import { executeDeleteAdn1Query } from './wsDbRw.js'

import { initNewMc } from '/f/7/libDomGrid/libDomGrid.js'

export const dbSendInsertAdn = adnJson =>
    executeAdnInsertQuery(adnJson)

export const dbSendDeleteAdn1 = adnJson =>
    executeDeleteAdn1Query(adnJson)

export const readAdnByIds = id_list => {
    const sql = selectDocVlStrByIds.replace(':idList', id_list.join(','))
    executeSelectQuery(sql).then(json => initNewMc(json.list)
    ).then(() => {
        console.log('read rr2', id_list)
    })
}

/**
 * 
 * @param {*} adnList 
 * @returns 
export const addToParentChild = adnList => adnList.reduce((pl, adn) =>
    !(mcData.parentChilds[adn.p] || (mcData.parentChilds[adn.p] = [])
    ).includes(adn.p) &&
    (mcData.parentChilds[adn.p].push(adn.doc_id) && pl.push(adn.p))
    && pl || pl, [])
 */

import { addNewMc, } from '/f/7/libDomGrid/libDomGrid.js'
/**
 * 
 * @param {*} parentId_list 
 */
export const readAdnByParentIds = parentId_list => {
    const sql = selectDocVlStrByParentIds.replace(':idList', parentId_list.join(','))
    // console.log(sql, parentId_list)
    return executeSelectQuery(sql).then(json => {
        !json.list.length && parentId_list.forEach(andId =>
            mcData.parentChilds[andId] = [])
        addNewMc(json.list)
        const pl2 = json.list.reduce((o, im) =>
            (o[im.p] || (o[im.p] = [])).push(im.doc_id) && o, {})
        Object.keys(pl2).forEach(p => mcData.parentChilds[p] = pl2[p])
    })
}

import { initSelectMaker } from './libSqlMaker.js'
import { mcData } from '../libDomGrid/libDomGrid.js'
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
