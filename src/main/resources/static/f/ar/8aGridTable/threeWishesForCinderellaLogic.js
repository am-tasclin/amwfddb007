'use strict'
/**
 * Algoritmed ©, EUPL-1.2 or later.
 * 
 */
export const tableList = ['entry1mat', 'ddmaterial', 'entry1']

import { makerGridTable } from
    '/f/ar/8aGridTable/libGridTable/libGridTable.js'

const gridEntry1mat = makerGridTable('entry1mat')
const headentry1mat = {
    id_doc: {
        alias: '№№', style: 'width: 30px;', filter: 'dnom',
        classHead: 'w3-blue w3-center', classBody: 'w3-silver w3-border ', classFooter: 'w3-border  w3-indigo', classFooterAll: 'w3-border  w3-indigo',
        formatBody: "id", formatFood: "count", formatFoodAll: "count"
    },
    id_mat: {
        alias: '№№мат-ла', style: 'width: 10px;', filter: 'dnom',
        classHead: 'w3-blue w3-center', classBody: 'w3-green w3-border ', classFooter: 'w3-border  w3-indigo', classFooterAll: 'w3-border  w3-indigo',
        formatBody: "id", formatFood: "", formatFoodAll: "count"
    },
    naim_mat: {
        alias: 'найменування', style: 'width: 50px;', filter: 'dnom',
        classHead: 'w3-blue w3-center', classBody: 'w3-green w3-border ', classFooter: 'w3-border  w3-indigo', classFooterAll: 'w3-border  w3-indigo',
        formatBody: "id", formatFood: "", formatFoodAll: "count"
    },

    kilkist: {
        alias: 'Кіл-ть', style: 'width: 50px;', filter: 'dnom',
        classHead: 'w3-blue w3-center', classBody: 'w3-silver w3-border ', classFooter: 'w3-border  w3-indigo', classFooterAll: 'w3-border  w3-indigo',
        formatBody: "id", formatFood: "", formatFoodAll: "count"
    },
    money: {
        alias: 'Грн',
        classHead: 'w3-border w3-hover-shadow w3-blue       w3-center',
        child: {

            sena: {
                alias: "ціна", style: 'width: 110px;', filter: 'sumaprov',
                classHead: 'w3-blue w3-center', classBody: 'w3-silver w3-border w3-right-align  ', classFooter: 'w3-border  w3-indigo', classFooterAll: 'w3-border  w3-indigo',
                formatBody: "", formatFood: "max", formatFoodAll: "max",
            },
            suma: {
                alias: 'сума  ', style: 'width: 50px;', filter: 'oplat',
                classHead: 'w3-blue w3-center', classBody: 'w3-silver w3-border ', classFooter: 'w3-border  w3-indigo', classFooterAll: 'w3-border  w3-indigo',
                formatBody: "", formatFood: "sum", formatFoodAll: ""
            },
        }
    }
}
const select01Entry1matMaker = gridEntry1mat.initSelectMaker('select01', 'kassa.entry1mat')
    , select01Entry1mat = select01Entry1matMaker.
        setFrom('(\n\
    SELECT e1m.id_doc,e1m.id_mat, m.naim_mat, e1m.kilkist,e1m.sena,e1m.suma \n\
    FROM kassa.entry1mat e1m, kassa.ddmaterial m \n\
    WHERE e1m.id_mat = m.id_mat) x'
        )
        .get()
gridEntry1mat.setHead(headentry1mat)


const gridDdMaterial = makerGridTable('ddmaterial')
    , select01DdMaterialMaker = gridDdMaterial.initSelectMaker('select01', 'kassa.ddmaterial')
    , select01DdMaterial = select01DdMaterialMaker
        .get()

const headDdMaterial = {
    money: {
        alias: 'Грн',
        classHead: 'w3-border w3-hover-shadow w3-blue       w3-center',
        child: {
            id_mat: {
                alias: "сума", style: 'width: 10px;', filter: 'sumaprov',
                classHead: 'w3-blue w3-center', classBody: 'w3-silver w3-border w3-right-align  ', classFooter: 'w3-border  w3-indigo', classFooterAll: 'w3-border  w3-indigo',
                formatBody: "", formatFood: "count", formatFoodAll: "max",
            },
            naim_mat: {
                alias: 'валюта', style: 'width: 150px;', filter: 'nameval',
                classHead: 'w3-red w3-center', classBody: 'w3-silver w3-border  ', classFooter: 'w3-border  w3-indigo', classFooterAll: 'w3-border  w3-indigo',
                formatBody: "", formatFood: "max", formatFoodAll: ""
            },
        }
    },


}
gridDdMaterial.setHead(headDdMaterial)



const gridEntry1 = makerGridTable('entry1')
    , select01Entry1Maker = gridEntry1.initSelectMaker('select01', 'kassa.entry1')
    , select01Entry1 = select01Entry1Maker
        // .initColumns(' id_doc, datt ')
        .get()

const headEnrty1 = {
    id_doc: {
        alias: '№№', style: 'width: 50px;', filter: 'id_doc',
        classHead: 'w3-blue w3-center', classBody: 'w3-silver w3-border ', classFooter: 'w3-border  w3-indigo', classFooterAll: 'w3-border  w3-indigo',
        formatBody: "", formatFood: "count", formatFoodAll: "count"
    },
    datt: {
        alias: 'Дата', style: 'width: 100px;', filter: 'datt',
        classHead: 'w3-blue w3-center', classBody: 'w3-blue w3-center', classFooter: 'w3-border  w3-red', classFooterAll: 'w3-border  w3-indigo',
        formatBody: "dat_1", formatFoot: "min", formatFootAll: "count"
    },
    id_op: {
        alias: '№№op', style: 'width: 50px;', filter: 'id_doc',
        classHead: 'w3-blue w3-center', classBody: 'w3-silver w3-border ', classFooter: 'w3-border  w3-indigo', classFooterAll: 'w3-border  w3-indigo',
        formatBody: "", formatFood: "count", formatFoodAll: "count"
    },
    naim_op: {
        alias: 'op', style: 'width: 50px;', filter: 'id_doc',
        classHead: 'w3-blue w3-center', classBody: 'w3-silver w3-border ', classFooter: 'w3-border  w3-indigo', classFooterAll: 'w3-border  w3-indigo',
        formatBody: "str_1 1,5", formatFood: "", formatFoodAll: "count"
    },
    naldoc: {
        alias: 'нал/док', style: 'width: 50px;', filter: 'id_doc',
        classHead: 'w3-blue w3-center', classBody: 'w3-silver w3-border ', classFooter: 'w3-border  w3-indigo', classFooterAll: 'w3-border  w3-indigo',
        formatBody: "", formatFood: "", formatFoodAll: "count"
    },
    naim_post: {
        alias: "Контрагент", style: 'width:50px;', filter: 'naim_post',
        classHead: 'w3-blue w3-center', classBody: 'w3-silver w3-border ', classFooter: 'w3-border  w3-indigo', classFooterAll: 'w3-border  w3-indigo',
        formatBody: "str_1 0,10", formatFood: "", formatFood: ""
    },
    id_post: {
        alias: '№№', style: 'width: 50px;', filter: 'id_doc',
        classHead: 'w3-blue w3-center', classBody: 'w3-silver w3-border ', classFooter: 'w3-border  w3-indigo', classFooterAll: 'w3-border  w3-indigo',
        formatBody: "", formatFood: "", formatFoodAll: "count"
    },
    money: {
        alias: 'Грн',
        classHead: 'w3-border w3-hover-shadow w3-red      w3-center',
        child: {

            itog: {
                alias: "сума", style: 'width: 110px;', filter: 'sumaprov',
                classHead: 'w3-red w3-center', classBody: 'w3-silver w3-border w3-right-align  ', classFooter: 'w3-border  w3-indigo', classFooterAll: 'w3-border  w3-indigo',
                formatBody: "", formatFood: "sum", formatFoodAll: "max",
            },
            oplat: {
                alias: 'оплата', style: 'width: 50px;', filter: 'oplat',
                classHead: 'w3-blue w3-center', classBody: 'w3-silver w3-border ', classFooter: 'w3-border  w3-indigo', classFooterAll: 'w3-border  w3-indigo',
                formatBody: "", formatFood: "", formatFoodAll: ""
            },
            dolg: {
                alias: 'долг', style: 'width: 50px;', filter: 'dolg',
                classHead: 'w3-blue w3-center', classBody: 'w3-silver w3-border ', classFooter: 'w3-border  w3-indigo', classFooterAll: 'w3-border  w3-indigo',
                formatBody: "", formatFood: "", formatFoodAll: ""
            },
        },
    },
        naim_user: {
            alias: '  ', style: 'width: 50px;', filter: 'id_doc',
            classHead: 'w3-blue w3-center', classBody: 'w3-yellow w3-border ', classFooter: 'w3-border  w3-indigo', classFooterAll: 'w3-border  w3-indigo',
            formatBody: "str_1 0,15", formatFood: "", formatFoodAll: "count"
        },
        id_user: {
            alias: '№№op', style: 'width: 50px;', filter: 'id_doc',
            classHead: 'w3-blue w3-center', classBody: 'w3-silver w3-border ', classFooter: 'w3-border  w3-indigo', classFooterAll: 'w3-border  w3-indigo',
            formatBody: "", formatFood: "", formatFoodAll: "count"
        },


    }
gridEntry1.setHead(headEnrty1)


import { TBodyFnInitializer } from '/f/ar/8aGridTable/libGridTable/libGridTable.js'

TBodyFnInitializer.initTable({
        entry1mat: ['id_doc', 'id_mat'],
        ddmaterial: ['id_mat'],
        entry1: ['id_doc'],
    }, {
        entry1mat: 20, entry1: 14
    })


import { ws, executeSelectQuery } from '/f/6/lib/wsDbRw.js'

export const initLogic = () => ws.onopen = event =>
        executeSelectQuery(select01Entry1mat)
            .then(json => {
                console.log('gridEntry1mat  ', gridEntry1mat)
                const x = gridEntry1mat.setTableBody(json.list).get()
                console.log('X  ',x)
                x.tBody.count++
                x.tHead.count++
                x.tFoot.count++

            })

            .then(() => executeSelectQuery(select01DdMaterial)
                .then(json => {
                    const y = gridDdMaterial.setTableBody(json.list).get()
                    y.tBody.count++
                    y.tHead.count++
                    y.tFoot.count++
                })

                .then(() => executeSelectQuery(select01Entry1)
                    .then(json => {
                        const z = gridEntry1.setTableBody(json.list).get()
                        z.tBody.count++
                        z.tHead.count++
                        z.tFoot.count++
                    })
                )

            )

import { TBodyFn, gridTable } from
    //    '/f/ar/5rGridTable/libGridTable/libGridTable.js'
    '/f/ar/8aGridTable/libGridTable/libGridTable.js'

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







