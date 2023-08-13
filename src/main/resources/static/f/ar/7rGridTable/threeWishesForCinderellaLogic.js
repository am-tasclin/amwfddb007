'use strict'
/**
 * Algoritmed ©, EUPL-1.2 or later.
 * 
 */
export const tableList = ['entry1mat', 'ddmaterial', 'entry1']

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

gridEntry1mat.setConfig({
    toAllHead: { classHead: 'w3-blue' },
    id_doc: { alias: '№№' },
    id_mat: { alias: '№№ мат-ла' },
    naim_mat: { alias: 'найменування' },
    kilkist: { alias: 'Кіл-ть', classHead: 'w3-green' },
    money: {
        alias: 'Грн',
        children: {
            sena: { alias: 'ціна' },
            suma: { alias: 'сума' },
        }
    },
})

console.log(gridEntry1mat.getConfig())
const headToColumns = h => Object.keys(h)
    .filter(im => 'toAllHead' != im)
    .reduce((l, im) => (h[im].children
        && Object.keys(h[im].children)
            .reduce((l, im) => l.push(im) && l, l)
        || l.push(im)) && l, [])

const l = headToColumns(gridEntry1mat.getConfig())
console.log(l)
gridEntry1mat.setBodyColumns(l)

// console.log(select01Entry1mat)
// console.log(select01DdMaterial)
// console.log(select01Entry1)

import { TBodyFnInitializer } from
    '../5rGridTable/libGridTable/libGridTable.js'

TBodyFnInitializer.initTable({
    entry1mat: ['id_doc', 'id_mat'],
    ddmaterial: ['id_mat'],
    entry1: ['id_doc'],
}, {
    entry1mat: 20, entry1: 14
})

import { ws, executeSelectQuery } from '/f/6/lib/wsDbRw.js'

const reViewGridTable = gridTable => {
    gridTable.get().tBody.count++
    gridTable.get().tHead.count++
    gridTable.get().tFoot.count++
}

export const initLogic = () => ws.onopen = event =>
    executeSelectQuery(select01Entry1mat
    ).then(json => {
        gridEntry1mat.setTableBody(json.list)
        reViewGridTable(gridEntry1mat)
    }).then(() => executeSelectQuery(select01DdMaterial
    ).then(json => {
        gridDdMaterial.setTableBody(json.list)
        reViewGridTable(gridDdMaterial)
    }).then(() => executeSelectQuery(select01Entry1
    ).then(json => {
        gridEntry1.setTableBody(json.list)
        reViewGridTable(gridEntry1)
    })))

import { TBodyFn, gridTable } from
    '/f/ar/5rGridTable/libGridTable/libGridTable.js'

TBodyFn.selectRowReadDbFn = tagName => ['entry1', 'ddmaterial'].indexOf(tagName) >= 0 && (() => {
    const sqlEntry1mat = select01Entry1matMaker.setWhere(['entry1', 'ddmaterial']
        .filter(tagName2 => Okeys(gridTable(tagName2).rowSelectedIds).length > 0)
        .reduce((s, tagName2) => {
            s && (s += ' AND ')
            s += Object.entries(gridTable(tagName2).rowSelectedIds)[0].join('=')
            return s
        }, '')).get()
    console.log(sqlEntry1mat)
    executeSelectQuery(sqlEntry1mat).then(json =>
        gridEntry1mat.setTableBody(json.list)
            .get().tBody.count++)
})()
const Okeys = Object.keys