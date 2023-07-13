'use struct'
import { setBodyStylePole, setH1, setHead, setBody, setBodyColumns, setFoodColumns, setFood, setFoodAll, setFoodColumnsAll } from './libGridTable/libGridTable.js'

export default {
    h1: setH1('Довідник персонала'),
    head: setHead({
        id: { alias: '№№', style: 'width: 3em;', classpole: 'w3-blue w3-center' },
        dataX: { alias: 'Дата', style: 'width: 6em;', classpole: 'w3-border w3-hover-shadow w3-blue       w3-center' },
        pip: {
            alias: 'ПІП',
            classpole: 'w3-border w3-hover-shadow w3-blue       w3-center',
            child: {
                firstName: { alias: "Ім'я", style: 'width: 10em;', classpole: 'w3-col  w3-border  w3-blue       ' },
                fatherName: { alias: 'По Батькові', style: 'width: 5em;', classpole: 'w3-col  w3-border  w3-blue       ' },
                familyName: { alias: 'Прізвище', style: 'width: 8em;', classpole: 'w3-col  w3-border  w3-blue      ' },
            }
        },
        money: {
            alias: 'грн',
            filter: 'summa',
            classpole: 'w3-border w3-hover-shadow w3-blue       w3-center',
            child: {
                price: { alias: "ціна", style: 'width:2em;', filter: 'price,summa', classpole: 'w3-col  w3-border  w3-blue       w3-center' },
                summa: { alias: "сума", style: 'width:5em;', filter: 'summa', classpole: 'w3-col  w3-border  w3-blue       w3-center' }
            }
        },
        hobby: { alias: 'Хобби', style: 'width: 10em;', classpole: 'w3-border w3-hover-shadow w3-blue       w3-center' },
    }),

    bodyColumns: setBodyColumns(['id', 'dattX', 'firstName', 'fatherName', 'familyName', 'price', 'summa', 'hobby',]),

    bodyStylePole: setBodyStylePole({
        id:         { width: '3em',   formatpole: "id",         classpole: 'w3-border  w3-silver' },
        dattX:      { width: '90px',  formatpole: "dat_2",      classpole: 'w3-border  w3-silver' },
        firstName:  { width: '150px', formatpole: "str_1 0,10", classpole: 'w3-border  w3-blue' },
        fatherName: { width: '150px', formatpole: "str_1 0,6",  classpole: 'w3-border  w3-blue' },
        familyName: { width: '150px', formatpole: "str_1 0,30", classpole: 'w3-border  w3-blue' },
        price:      { width: '50px',  formatpole: "price",      classpole: 'w3-border  w3-silver ' },
        summa:      { width: '50px',  formatpole: "summa",      classpole: 'w3-border  w3-silver' },
        hobby:      { width: '200px', formatpole: "str_1 0,50", classpole: 'w3-border  w3-blue' },
    }),

    body: setBody([
        { id: 1,  dattX: "12.01.2023", firstName: "Jon",        fatherName: "Jon",        familyName: "Jon",  hobby: "run", price: "3", summa: "9" },
        { id: 2,  dattX: "12.11.2023", firstName: "Jen",        fatherName: "Jon",        familyName: "Jon",  hobby: "sleep", price: "3", summa: "9" },
        { id: 3,  dattX: "04.04.2023", firstName: "Олег",       fatherName: "Jon",        familyName: "Jon",  hobby: "122 sleep", price: "3", summa: "9" },
        { id: 4,  dattX: "18.01.2023", firstName: "Таня",       fatherName: "Jon",        familyName: "Jon",  hobby: "sleep85855", price: "3", summa: "9" },
        { id: 5,  dattX: "12.02.2023", firstName: "Аполінарій", fatherName: "Jon",        familyName: "Jon",  hobby: "sleвфівep", price: "3", summa: "9" },
        { id: 6,  dattX: "11.03.2023", firstName: "Генадій ",   fatherName: "Петвич",     familyName: "Ив",   hobby: "ічвав2sleep", price: "3", summa: "9" },
        { id: 7,  dattX: "10.12.2023", firstName: "Светлана",   fatherName: "Михайловна", familyName: "_ ",   hobby: "sle ep", price: "3", summa: "9" },
        { id: 8,  dattX: "08.10.2023", firstName: "Jon2",       fatherName: "Jon",        familyName: "run",  hobby: "sle ep",  price: "3", summa: "9" },
        { id: 9,  dattX: "27.05.2023", firstName: "Jen3",       fatherName: "Jon",        familyName: "sle",  hobby: "sle ep",  price: "3", summa: "9" },
        { id: 10, dattX: "12.07.2023", firstName: "Олег",       fatherName: "Jon",        familyName: "122",  hobby: "sle ep",  price: "3", summa: "9" },
        { id: 11, dattX: "09.10.2023", firstName: "Таня",       fatherName: "Jon",        familyName: "sl",   hobby: "sle ep",  price: "3", summa: "9" },
        { id: 12, dattX: "14.04.2023", firstName: "Ай",         fatherName: "Jon",        familyName: "sl",   hobby: "sle ep",  price: "3", summa: "9" },
        { id: 13, dattX: "12.09.2023", firstName: "Генадій ",   fatherName: "Петрович",   familyName: "Ива",  hobby: "ічвав2sleep", price: "3", summa: "9" },
        { id: 14, dattX: "30.01.2023", firstName: "Света",      fatherName: "Михайловна", familyName: "_ ",   hobby: "sle ep", price: "3", summa: "9" },
        { id: 15, dattX: "27.08.2023", firstName: "Таня",       fatherName: "Jon",        familyName: "Jon",  hobby: "sleep85855", price: "3", summa: "9" },
        { id: 16, dattX: "07.07.2023", firstName: "Аполінарій", fatherName: "Jon",        familyName: "Jon",  hobby: "sleвфівep", price: "3", summa: "9" },
        { id: 17, dattX: "14.04.2023", firstName: "Генадій ",   fatherName: "Петрович",   familyName: "Иван", hobby: "ічвав2sleep", price: "3", summa: "9" },
        { id: 18, dattX: "23.06.2023", firstName: "Светлана",   fatherName: "Михайловна", familyName: "_ ",   hobby: "sleep", price: "3", summa: "9" },
        { id: 19, dattX: "12.01.2023", firstName: "Jon",        fatherName: "Jon",        familyName: "Jon", hobby: "run", price: "3", summa: "9" },
        { id: 20, dattX: "12.11.2023", firstName: "Jen",        fatherName: "Jon",        familyName: "Jon", hobby: "sleep", price: "3", summa: "9" },
        { id: 21, dattX: "04.04.2023", firstName: "Олег",       fatherName: "Jon",        familyName: "Jon", hobby: "122", price: "3", summa: "9" },
    ]),

    foodColumns: setFoodColumns(['id', 'dattX', 'firstName', 'fatherName', 'familyName', 'price', 'summa', 'hobby',]),

    food: setFood({
        id: { width: '3em', formatpole: "count", classpole: 'w3-border  w3-indigo' },
        dattX: { width: '90px', formatpole: "max", classpole: 'w3-border  w3-indigo' },
        firstName: { width: '150px', formatpole: "", classpole: 'w3-border  w3-indigo' },
        fatherName: { width: '150px', formatpole: "", classpole: 'w3-border  w3-indigo' },
        familyName: { width: '150px', formatpole: "", classpole: 'w3-border  w3-indigo' },
        hobby: { width: '200px', formatpole: "", classpole: 'w3-border  w3-indigo' },
        price: { width: '50px', formatpole: "max", classpole: 'w3-border  w3-indigo' },
        summa: { width: '50px', formatpole: "sum", classpole: 'w3-border  w3-indigo' },
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
