'use strict'
/**
 * Algoritmed ©, EUPL-1.2 or later.
 * 
 */
export const tableList = ['entry1mat', 'ddmaterial', 'entry1']

import { ws, executeSelectQuery } from '/f/6/lib/wsDbRw.js'
export const reReadEntry1Mat = () => {
    console.log(123)
}
export const initLogic = () => ws.onopen = event =>
    executeSelectQuery(select01Entry1mat
    ).then(json => gridEntry1mat.setTableBody(json.list)
        .get().tBody.count++
    ).then(() => executeSelectQuery(select01DdMaterial
    ).then(json => gridDdMaterial.setTableBody(json.list)
        .get().tBody.count++
    ).then(() => executeSelectQuery(select01Entry1
    ).then(json => gridEntry1.setTableBody(json.list)
        .get().tBody.count++
    )))

import { makerGridTable } from
    '../5rGridTable/libGridTable/libGridTable.js'
const gridEntry1mat = makerGridTable('entry1mat')
    , select01Entry1matMaker = gridEntry1mat.initSelectMaker('select01', 'kassa.entry1mat')
    , select01Entry1mat = select01Entry1matMaker.setFrom('(\n\
SELECT e1m.*, m.naim_mat \n\
    FROM kassa.entry1mat e1m, kassa.ddmaterial m \n\
    WHERE e1m.id_mat = m.id_mat) x'
    ).get()

    , gridDdMaterial = makerGridTable('ddmaterial')
    , select01DdMaterialMaker = gridDdMaterial.initSelectMaker('select01', 'kassa.ddmaterial')
    , select01DdMaterial = select01DdMaterialMaker.get()

    , gridEntry1 = makerGridTable('entry1')
    , select01Entry1Maker = gridEntry1.initSelectMaker('select01', 'kassa.entry1')
    , select01Entry1 = select01Entry1Maker.get()

console.log(select01Entry1mat)
console.log(select01DdMaterial)
console.log(select01Entry1)

import { TBodyFnInitializer } from
    '../5rGridTable/libGridTable/libGridTable.js'

TBodyFnInitializer.initTable({
    entry1mat: ['id_doc', 'id_mat'],
    ddmaterial: ['id_mat'],
    entry1: ['id_doc'],
}, {
    entry1mat: 20, entry1: 14
})
