'use struct'
import { setH1, setHead, setColumns, setBody, } from './libGridTable/libGridTable.js'

export default {
    h1: setH1('Довідник персонала'),
    head: setHead({
        id: {
            alias: '№№', style: 'width: 40px;',filter: 'id',
            classHead: 'w3-blue w3-center', classBody: 'w3-blue w3-center', classFooter: 'w3-border  w3-indigo', classFooterAll: 'w3-border  w3-indigo',
            formatBody: "id", formatFood: "count", formatFoodAll: "count"
        },

        dataX: {
            alias: 'Дата', style: 'width: 40px;',filter: 'id',
            classHead: 'w3-blue w3-center', classBody: 'w3-blue w3-center', classFooter: 'w3-border  w3-red', classFooterAll: 'w3-border  w3-indigo',
            formatBody: "dat_1", formatFoot: "count", formatFootAll: "count"
        },

        pip: {
            alias: 'ПІП',
            classHead: 'w3-border w3-hover-shadow w3-blue       w3-center',
            child: {
                firstName: {
                    alias: "Ім'я", style: 'width: 150px;',filter: '',
                    classHead: 'w3-blue w3-center', classBody: 'w3-blue w3-center', classFooter: 'w3-border  w3-indigo', classFooterAll: 'w3-border  w3-indigo',
                    formatBody: "str_1 0,5", formatFood: "", formatFoodAll: "",
                },
                fatherName: {
                    alias: 'По Батькові', style: 'width: 150px;',filter: '',
                    classHead: 'w3-red w3-center', classBody: 'w3-blue w3-center', classFooter: 'w3-border  w3-indigo', classFooterAll: 'w3-border  w3-indigo',
                    formatBody: "str_1 0,4", formatFood: "", formatFoodAll: ""
                },
                familyName: {
                    alias: 'Прізвище', style: 'width: 150px;',filter: '',
                    classHead: 'w3-blue w3-center', classBody: 'w3-blue w3-center', classFooter: 'w3-border  w3-indigo', classFooterAll: 'w3-border  w3-indigo',
                    formatBody: "str_1 0,3", formatFood: "", formatFoodAll: ""
                },
            }
        },
        money: {
            alias: 'грн',
            filter: 'summa',
            classHead: 'w3-border w3-hover-shadow w3-blue w3-center',
            child: {
                price: {
                    alias: "ціна", style: 'width:50px;', filter: 'price,summa',
                    classHead: 'w3-blue w3-center', classBody: 'w3-blue w3-center', classFooter: 'w3-border  w3-indigo', classFooterAll: 'w3-border  w3-indigo',
                    formatBody: "", formatFood: "max", formatFood: ""
                },
                summa: {
                    alias: "сума", style: 'width:100px;', filter: 'summa,price',
                    classHead: 'w3-blue w3-center', classBody: 'w3-blue w3-center', classFooter: 'w3-border  w3-indigo', classFooterAll: 'w3-border  w3-indigo',
                    formatBody: "", formatFood: "sum", formatFoodAll: "sum"
                }
            }
        },
        hobby: {
            alias: 'Хобби', style: 'width: 200px;',
            classHead: 'w3-blue w3-center', classBody: 'w3-blue w3-center', classFooter: 'w3-border  w3-indigo', classFooterAll: 'w3-border  w3-indigo',
            formatBody: "id", formatFood: "sum", formatFoodAll: ""
        },
    }),

    columns: setColumns(['id', 'dataX', 'firstName', 'fatherName', 'familyName', 'price', 'summa', 'hobby',]),

    body: setBody([
        { id: 1, dataX: "2023-07-05",                     firstName: "Jon", fatherName: "Jon", familyName: "Jon", hobby: "run", price: "3", summa: "9" },
        { id: 2, dataX: "2023-07-14",                     firstName: "Jen", fatherName: "Jon", familyName: "Jon", hobby: "sleep", price: "3", summa: "9" },
        { id: 3, dataX: "2023-07-14",                     firstName: "Олег", fatherName: "Jon", familyName: "Jon", hobby: "122 sleep", price: "3", summa: "9" },
        { id: 4, dataX: "2023-07-14T13:55:45+03:00	Jon", firstName: "Таня", fatherName: "Jon", familyName: "Jon", hobby: "sleep85855", price: "3", summa: "9" },
        { id: 5, dataX: "2023-07-14T13:55:45+03:00	Jon", firstName: "Аполінарій", fatherName: "Jon", familyName: "Jon", hobby: "sleвфівep", price: "3", summa: "9" },
        { id: 6, dataX: "2023-07-14T13:55:45+03:00	Jon", firstName: "Генадій ", fatherName: "Петвич", familyName: "Ив", hobby: "ічвав2sleep", price: "3", summa: "9" },
        { id: 7, dataX: "2023-07-14T13:55:45+03:00	Jon", firstName: "Светлана", fatherName: "Михайловна", familyName: "_ ", hobby: "sle ep", price: "3", summa: "9" },
        { id: 8, dataX: "2023-07-14T13:55:45+03:00	Jon", firstName: "Jon2", fatherName: "Jon", familyName: "run", hobby: "sle ep", price: "3", summa: "9" },
        { id: 9, dataX: "2023-07-14T13:55:45+03:00	Jon", firstName: "Jen3", fatherName: "Jon", familyName: "sle", hobby: "sle ep", price: "3", summa: "9" },
        { id: 10, dataX: "2023-07-14T13:55:45+03:00	Jon", firstName: "Олег", fatherName: "Jon", familyName: "122", hobby: "sle ep", price: "3", summa: "9" },
        { id: 11, dataX: "2023-07-14T13:55:45+03:00	Jon", firstName: "Таня", fatherName: "Jon", familyName: "sl", hobby: "sle ep", price: "3", summa: "9" },
        { id: 12, dataX: "2023-07-14T13:55:45+03:00	Jon", firstName: "Ай", fatherName: "Jon", familyName: "sl", hobby: "sle ep", price: "3", summa: "9" },
        { id: 13, dataX: "2023-07-14T13:55:45+03:00	Jon", firstName: "Генадій ", fatherName: "Петрович", familyName: "Ива", hobby: "ічвав2sleep", price: "3", summa: "9" },
        { id: 14, dataX: "2023-07-14T13:55:45+03:00	Jon", firstName: "Света", fatherName: "Михайловна", familyName: "_ ", hobby: "sle ep", price: "3", summa: "9" },
        { id: 15, dataX: "2023-07-14T13:55:45+03:00	Jon", firstName: "Таня", fatherName: "Jon", familyName: "Jon", hobby: "sleep85855", price: "3", summa: "9" },
        { id: 16, dataX: "2023-07-14T13:55:45+03:00	Jon", firstName: "Аполінарій", fatherName: "Jon", familyName: "Jon", hobby: "sleвфівep", price: "3", summa: "9" },
        { id: 17, dataX: "2023-07-14T13:55:45+03:00	Jon", firstName: "Генадій ", fatherName: "Петрович", familyName: "Иван", hobby: "ічвав2sleep", price: "3", summa: "9" },
        { id: 18, dataX: "2023-07-14T13:55:45+03:00	Jon", firstName: "Светлана", fatherName: "Михайловна", familyName: "_ ", hobby: "sleep", price: "3", summa: "9" },
        { id: 19, dataX: "2023-07-14T13:55:45+03:00	Jon", firstName: "Jon", fatherName: "Jon", familyName: "Jon", hobby: "run", price: "3", summa: "9" },
        { id: 20, dataX: "2023-07-14T13:55:45+03:00 Jon", firstName: "Jen", fatherName: "Jon", familyName: "Jon", hobby: "sleep", price: "3", summa: "9" },
        { id: 21, dataX: "2023-07-14T13:55:45+03:00	Jon", firstName: "Олег", fatherName: "Jon", familyName: "Jon", hobby: "122", price: "3", summa: "9" },
    ]),


    //  localperem: setLocalPerem(['order by id desc', 'ggggg']),

}

export const Perem = {}
Perem.head = {
   
}
