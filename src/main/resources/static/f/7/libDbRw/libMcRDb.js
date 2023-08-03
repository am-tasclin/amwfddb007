'use strict'
/**
 * Algoritmed ©, Licence EUPL-1.2 or later.
 * 
 */
import { executeSelectQuery } from './wsDbRw.js'
import { addToEMap } from
    '/f/7/libDomGrid/libDomGrid.js'
export const readAdnByIds = id_list => {
    const sql = selectDocVlStrByIds.replace(':idList', id_list.join(','))
    executeSelectQuery(sql).then(json => addToEMap(json.list))
        .then(() => {
            console.log('read rr2', id_list)
        })
}

import { initSelectMaker } from './libSqlMaker.js'
const selectDocVlStrMaker = initSelectMaker('selectDocVlStr', 'doc')
    .initLeftJoin('string', 'doc_id=string_id')
    .initColumns('doc_id, parent p, reference r, reference2 r2, value vl_str')

const selectDocVlStrByIds = selectDocVlStrMaker
    .initWhere('doc_id IN (:idList)').get()
