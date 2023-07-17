'use struct'
import { setBodyStylePole, setH1, setHead, setBody, setBodyColumns, setFoodColumns, setFood, setFoodAll, setFoodColumnsAll } from './libGridTable/libGridTable.js'

export default {
    h1: setH1('Довідник персонала'),
    head: setHead({
        id: { alias: '№№',      style: 'width: 40px;', classpole: 'w3-blue w3-center' },
        dataX: { alias: 'Дата', style: 'width: 90px;', classpole: 'w3-border w3-hover-shadow w3-blue       w3-center' },
        pip: {
            alias: 'ПІП',
            classpole: 'w3-border w3-hover-shadow w3-blue       w3-center',
            child: {
                firstName:  { alias: "Ім'я", style: 'width: 150px;', classpole: 'w3-col  w3-border  w3-blue       ' },
                fatherName: { alias: 'По Батькові', style: 'width: 150px;', classpole: 'w3-col  w3-border  w3-blue       ' },
                familyName: { alias: 'Прізвище', style: 'width: 150px;', classpole: 'w3-col  w3-border  w3-blue      ' },
            }
        },
        money: {
            alias: 'грн',
            filter: 'summa',
            classpole: 'w3-border w3-hover-shadow w3-blue       w3-center',
            child: {
                price: { alias: "ціна", style: 'width:50px;', filter: 'price,summa', classpole: 'w3-col  w3-border  w3-blue       w3-center' },
                summa: { alias: "сума", style: 'width:100px;', filter: 'summa', classpole: 'w3-col  w3-border  w3-blue       w3-center' }
            }
        },
        hobby: { alias: 'Хобби', style: 'width: 200px;', classpole: 'w3-border w3-hover-shadow w3-blue       w3-center' },
    }),

    bodyColumns: setBodyColumns(['id', 'dattX', 'firstName', 'fatherName', 'familyName', 'price', 'summa', 'hobby',]),

    bodyStylePole: setBodyStylePole({
        id:         { width: '40px',  formatpole: "id",         classpole: 'w3-border  w3-yellow' },
        dattX:      { width: '90px',  formatpole: "dat_1 DD.MM.YY",      classpole: 'w3-border  w3-silver' },
        firstName:  { width: '150px', formatpole: "str_1 0,10", classpole: 'w3-border  w3-blue' },
        fatherName: { width: '150px', formatpole: "str_1 0,6",  classpole: 'w3-border  w3-blue' },
        familyName: { width: '150px', formatpole: "str_1 0,30", classpole: 'w3-border  w3-blue' },
        price:      { width: '50px',  formatpole: "price",      classpole: 'w3-border  w3-silver ' },
        summa:      { width: '100px', formatpole: "summa",      classpole: 'w3-border  w3-silver' },
        hobby:      { width: '200px', formatpole: "str_1 0,50", classpole: 'w3-border  w3-blue' },
    }),

    body: setBody([
        { id: 1,  dattX: "2023-07-05", firstName: "Jon",        fatherName: "Jon",        familyName: "Jon",  hobby: "run", price: "3", summa: "9" },
        { id: 2,  dattX: "2023-07-14T13:55:45+03:00	Jon", firstName: "Jen",        fatherName: "Jon",        familyName: "Jon",  hobby: "sleep", price: "3", summa: "9" },
        { id: 3,  dattX: "2023-07-14T13:55:45+03:00	Jon", firstName: "Олег",       fatherName: "Jon",        familyName: "Jon",  hobby: "122 sleep", price: "3", summa: "9" },
        { id: 4,  dattX: "2023-07-14T13:55:45+03:00	Jon", firstName: "Таня",       fatherName: "Jon",        familyName: "Jon",  hobby: "sleep85855", price: "3", summa: "9" },
        { id: 5,  dattX: "2023-07-14T13:55:45+03:00	Jon", firstName: "Аполінарій", fatherName: "Jon",        familyName: "Jon",  hobby: "sleвфівep", price: "3", summa: "9" },
        { id: 6,  dattX: "2023-07-14T13:55:45+03:00	Jon", firstName: "Генадій ",   fatherName: "Петвич",     familyName: "Ив",   hobby: "ічвав2sleep", price: "3", summa: "9" },
        { id: 7,  dattX: "2023-07-14T13:55:45+03:00	Jon", firstName: "Светлана",   fatherName: "Михайловна", familyName: "_ ",   hobby: "sle ep", price: "3", summa: "9" },
        { id: 8,  dattX: "2023-07-14T13:55:45+03:00	Jon", firstName: "Jon2",       fatherName: "Jon",        familyName: "run",  hobby: "sle ep",  price: "3", summa: "9" },
        { id: 9,  dattX: "2023-07-14T13:55:45+03:00	Jon", firstName: "Jen3",       fatherName: "Jon",        familyName: "sle",  hobby: "sle ep",  price: "3", summa: "9" },
        { id: 10, dattX: "2023-07-14T13:55:45+03:00	Jon", firstName: "Олег",       fatherName: "Jon",        familyName: "122",  hobby: "sle ep",  price: "3", summa: "9" },
        { id: 11, dattX: "2023-07-14T13:55:45+03:00	Jon", firstName: "Таня",       fatherName: "Jon",        familyName: "sl",   hobby: "sle ep",  price: "3", summa: "9" },
        { id: 12, dattX: "2023-07-14T13:55:45+03:00	Jon", firstName: "Ай",         fatherName: "Jon",        familyName: "sl",   hobby: "sle ep",  price: "3", summa: "9" },
        { id: 13, dattX: "2023-07-14T13:55:45+03:00	Jon", firstName: "Генадій ",   fatherName: "Петрович",   familyName: "Ива",  hobby: "ічвав2sleep", price: "3", summa: "9" },
        { id: 14, dattX: "2023-07-14T13:55:45+03:00	Jon", firstName: "Света",      fatherName: "Михайловна", familyName: "_ ",   hobby: "sle ep", price: "3", summa: "9" },
        { id: 15, dattX: "2023-07-14T13:55:45+03:00	Jon", firstName: "Таня",       fatherName: "Jon",        familyName: "Jon",  hobby: "sleep85855", price: "3", summa: "9" },
        { id: 16, dattX: "2023-07-14T13:55:45+03:00	Jon", firstName: "Аполінарій", fatherName: "Jon",        familyName: "Jon",  hobby: "sleвфівep", price: "3", summa: "9" },
        { id: 17, dattX: "2023-07-14T13:55:45+03:00	Jon", firstName: "Генадій ",   fatherName: "Петрович",   familyName: "Иван", hobby: "ічвав2sleep", price: "3", summa: "9" },
        { id: 18, dattX: "2023-07-14T13:55:45+03:00	Jon", firstName: "Светлана",   fatherName: "Михайловна", familyName: "_ ",   hobby: "sleep", price: "3", summa: "9" },
        { id: 19, dattX: "2023-07-14T13:55:45+03:00	Jon", firstName: "Jon",        fatherName: "Jon",        familyName: "Jon", hobby: "run", price: "3", summa: "9" },
        { id: 20, dattX: "2023-07-14T13:55:45+03:00	Jon", firstName: "Jen",        fatherName: "Jon",        familyName: "Jon", hobby: "sleep", price: "3", summa: "9" },
        { id: 21, dattX: "2023-07-14T13:55:45+03:00	Jon", firstName: "Олег",       fatherName: "Jon",        familyName: "Jon", hobby: "122", price: "3", summa: "9" },
    ]),

    foodColumns: setFoodColumns(['id', 'dattX', 'firstName', 'fatherName', 'familyName', 'price', 'summa', 'hobby',]),

    food: setFood({
        id: { width: '40px', formatpole: "count", classpole: 'w3-border  w3-indigo' },
        dattX: { width: '90px', formatpole: "max", classpole: 'w3-border  w3-indigo' },
        firstName: { width: '150px', formatpole: "", classpole: 'w3-border  w3-indigo' },
        fatherName: { width: '150px', formatpole: "", classpole: 'w3-border  w3-indigo' },
        familyName: { width: '150px', formatpole: "", classpole: 'w3-border  w3-indigo' },
        hobby: { width: '200px', formatpole: "", classpole: 'w3-border  w3-indigo' },
        price: { width: '50px', formatpole: "max", classpole: 'w3-border  w3-indigo' },
        summa: { width: '10px', formatpole: "sum", classpole: 'w3-border  w3-indigo' },
    }),

    foodColumnsAll: setFoodColumnsAll(['id', 'dattX', 'summa',]),

    foodAll: setFoodAll({
        id: { width: '3em', formatpole: "count(*)", classpole: 'w3-border  w3-indigo' },
        dattX: { width: '90px', formatpole: "max", classpole: 'w3-border  w3-indigo' },
        summa: { width: '450px', formatpole: "sum", classpole: 'w3-border  w3-indigo' },
    }),

    // localperem: setlocalperem(['order by id desc', 'ggggg']),

}

export const testData = {}
testData.head = {
    id: { alias: 'NN' },
    dataX: { alias: 'Дата', },
    firstName: { alias: "Ім'я" },
    fatherName: { alias: 'По Батькові', style: 'width: 8em;' },
    familyName: { alias: 'Прізвище' },
    hobby: { alias: 'Хобби' },
}
