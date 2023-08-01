'use struct'
import { setH1, setHead,  setBody } from './libGridTable/libGridTable.js'


export default {
    h1: setH1('Документи'),

    head: setHead({
        id_doc: {
            alias: '№№', style: 'width: 50px;', filter: 'id_doc',
            classHead: 'w3-blue w3-center', classBody: 'w3-silver w3-border ', classFooter: 'w3-border  w3-indigo', classFooterAll: 'w3-border  w3-indigo',
            formatBody: "id", formatFood: "count", formatFoodAll: "count"
        },

        datt: {
            alias: 'Дата', style: 'width: 100px;', filter: 'datt',
            classHead: 'w3-blue w3-center', classBody: 'w3-blue w3-center', classFooter: 'w3-border  w3-red', classFooterAll: 'w3-border  w3-indigo',
            formatBody: "dat_1", formatFoot: "min", formatFootAll: "count"
        },
        naldoc: {
            alias: 'Нал/безнал', style: 'width: 50px;', filter: 'naldoc',
            classHead: 'w3-red w3-center', classBody: 'w3-silver w3-border  ', classFooter: 'w3-border  w3-indigo', classFooterAll: 'w3-border  w3-indigo',
            formatBody: "", formatFood: "max", formatFoodAll: ""
        },

        money: {
            alias: 'Грн',
            classHead: 'w3-border w3-hover-shadow w3-blue       w3-center',
            child: {
                itog: {
                    alias: "сума", style: 'width: 110px;', filter: 'sumaprov',
                    classHead: 'w3-blue w3-center', classBody: 'w3-silver w3-border w3-right-align  ', classFooter: 'w3-border  w3-indigo', classFooterAll: 'w3-border  w3-indigo',
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

            }
        },
        naim_op: {
            alias: 'Опер-я', style: 'width: 40px;', filter: 'naim_op',
            classHead: 'w3-blue w3-center', classBody: 'w3-silver w3-border ', classFooter: 'w3-border  w3-red', classFooterAll: 'w3-border  w3-indigo',
            formatBody: "", formatFoot: "", formatFootAll: ""
        },
        naim_post: {
            alias: "Контрагент", style: 'width:50px;', filter: 'naim_post',
            classHead: 'w3-blue w3-center', classBody: 'w3-silver w3-border ', classFooter: 'w3-border  w3-indigo', classFooterAll: 'w3-border  w3-indigo',
            formatBody: "", formatFood: "max", formatFood: ""
        },



    }),


    body: setBody([]),

    // localperem: setLocalPerem(['order by id desc', 'ggggg']),

}

export const Perem = {}
Perem.head = {

}
