'use struct'
import { setH1, setHead,  setBody } from './libGridTable/libGridTable.js'

export default {
    h1: setH1('Довідник персонала'),


    head: setHead({
        idnom: {
            alias: '№№', style: 'width: 50px;', filter: 'dnom',
            classHead: 'w3-blue w3-center', classBody: 'w3-silver w3-border ', classFooter: 'w3-border  w3-indigo', classFooterAll: 'w3-border  w3-indigo',
            formatBody: "id", formatFood: "count", formatFoodAll: "count"
        },

        dateprov: {
            alias: 'Дата', style: 'width: 100px;', filter: 'dateprov',
            classHead: 'w3-blue w3-center', classBody: 'w3-blue w3-center', classFooter: 'w3-border  w3-red', classFooterAll: 'w3-border  w3-indigo',
            formatBody: "dat_1", formatFoot: "min", formatFootAll: "count"
        },

        money: {
            alias: 'Грн',
            classHead: 'w3-border w3-hover-shadow w3-blue       w3-center',
            child: {
                sumaprov: {
                    alias: "сума", style: 'width: 110px;', filter: 'sumaprov',
                    classHead: 'w3-blue w3-center', classBody: 'w3-silver w3-border w3-right-align  ', classFooter: 'w3-border  w3-indigo', classFooterAll: 'w3-border  w3-indigo',
                    formatBody: "", formatFood: "sum", formatFoodAll: "max",
                },
                nameval: {
                    alias: 'валюта', style: 'width: 50px;', filter: 'nameval',
                    classHead: 'w3-red w3-center', classBody: 'w3-silver w3-border  ', classFooter: 'w3-border  w3-indigo', classFooterAll: 'w3-border  w3-indigo',
                    formatBody: "", formatFood: "max", formatFoodAll: ""
                },
                snal: {
                    alias: 'нал/безнал', style: 'width: 50px;', filter: 'snal',
                    classHead: 'w3-blue w3-center', classBody: 'w3-silver w3-border ', classFooter: 'w3-border  w3-indigo', classFooterAll: 'w3-border  w3-indigo',
                    formatBody: "", formatFood: "", formatFoodAll: ""
                },
            }
        },
        namekassop: {
            alias: 'Касова опер-я', style: 'width: 40px;', filter: 'id',
            classHead: 'w3-blue w3-center', classBody: 'w3-silver w3-border ', classFooter: 'w3-border  w3-red', classFooterAll: 'w3-border  w3-indigo',
            formatBody: "", formatFoot: "", formatFootAll: ""
        },

        contragent: {
            alias: 'Контрагент',
            filter: '',
            classHead: 'w3-border w3-hover-shadow w3-blue w3-center',
            child: {
                namecontr: {
                    alias: "наименование", style: 'width:50px;', filter: 'namecontr',
                    classHead: 'w3-blue w3-center', classBody: 'w3-silver w3-border ', classFooter: 'w3-border  w3-indigo', classFooterAll: 'w3-border  w3-indigo',
                    formatBody: "", formatFood: "max", formatFood: ""
                },
                iddoc: {
                    alias: "№док", style: 'width:100px;', filter: 'iddoc',
                    classHead: 'w3-blue w3-center', classBody: 'w3-silver w3-border ', classFooter: 'w3-border  w3-indigo', classFooterAll: 'w3-border  w3-indigo',
                    formatBody: "", formatFood: "", formatFoodAll: ""
                }
            }
        },
        nameoperator: {
            alias: 'Операция', style: 'width: 200px;', filter: 'nameoperator',
            classHead: 'w3-blue w3-center', classBody: 'w3-silver w3-border w3-right-align ', classFooter: 'w3-border  w3-indigo', classFooterAll: 'w3-border  w3-indigo',
            formatBody: "", formatFood: "", formatFoodAll: ""
        },


    }),


    body: setBody([]),

    // localperem: setLocalPerem(['order by id desc', 'ggggg']),

}

export const Perem = {}
Perem.head = {

}
