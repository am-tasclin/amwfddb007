'use strict'
/**
 * Algoritmed ©, EUPL-1.2 or later.
 * 
 */
export const tableList = ['entry1mat', 'ddmaterial', 'entry1']

import { makerGridTable } from
    '../5rGridTable/libGridTable/libGridTable.js'
import { ws, executeSelectQuery } from '/f/6/lib/wsDbRw.js'

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

console.log(12, select01DdMaterial)

export const initLogic = () => ws.onopen = event =>
    executeSelectQuery(select01Entry1mat
    ).then(json => {
        gridEntry1mat.setTableBody(json.list)
        gridEntry1mat.get().tBody.count++
    }).then(() => {
        console.log(123, select01DdMaterial)
        executeSelectQuery(select01DdMaterial
        ).then(json => {
            console.log(json)
            gridDdMaterial.setTableBody(json.list)
            gridDdMaterial.get().tBody.count++
        }).then(() => {
            console.log(123, select01Entry1)
            executeSelectQuery(select01Entry1
            ).then(json => {
                console.log(json)
                gridEntry1.setTableBody(json.list)
                gridEntry1.get().tBody.count++
            })
        })
    })
