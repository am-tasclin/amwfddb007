'use struct'
import { setH1, setHead,  setBody } from './libGridTable/libGridTable.js'

export default {
    h1: setH1('Материали'),

    head: setHead({
        id_mat: {
            alias: '№№', style: 'width: 50px;', filter: 'id_mat',
            classHead: 'w3-blue w3-center', classBody: 'w3-silver w3-border ', classFooter: 'w3-border  w3-indigo', classFooterAll: 'w3-border  w3-indigo',
            formatBody: "id", formatFood: "count", formatFoodAll: "count"
        },
        naim_mat: {
            alias: 'найменування', style: 'width: 50px;', filter: 'naim_mat',
            classHead: 'w3-blue w3-center', classBody: 'w3-silver w3-border ', classFooter: 'w3-border  w3-indigo', classFooterAll: 'w3-border  w3-indigo',
            formatBody: "id", formatFood: "count", formatFoodAll: "count"
        },
        money: {
            alias: 'Грн',
            classHead: 'w3-border w3-hover-shadow w3-blue       w3-center',
            child: {
                sena: {
                    alias: "ціна", style: 'width: 110px;', filter: 'sena',
                    classHead: 'w3-blue w3-center', classBody: 'w3-silver w3-border w3-right-align  ', classFooter: 'w3-border  w3-indigo', classFooterAll: 'w3-border  w3-indigo',
                    formatBody: "", formatFood: "sum", formatFoodAll: "max",
                },
                kilkist: {
                    alias: 'кіл-ть', style: 'width: 50px;', filter: 'kilkist',
                    classHead: 'w3-blue w3-center', classBody: 'w3-silver w3-border ', classFooter: 'w3-border  w3-indigo', classFooterAll: 'w3-border  w3-indigo',
                    formatBody: "", formatFood: "", formatFoodAll: ""
                },
                suma: {
                    alias: 'сума', style: 'width: 50px;', filter: 'dolg',
                    classHead: 'w3-blue w3-center', classBody: 'w3-silver w3-border ', classFooter: 'w3-border  w3-indigo', classFooterAll: 'w3-border  w3-indigo',
                    formatBody: "", formatFood: "", formatFoodAll: ""
                },

            }
        },

    }),


    body: setBody([]),

    // localperem: setLocalPerem(['order by id desc', 'ggggg']),

}

export const Perem = {}
Perem.head = {

}
