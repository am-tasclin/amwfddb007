'use struct'
import { setbodyStylePole, setH1, setHead, setBody, setBodyColumns, setFoodColumns, setFood, setFoodAll, setFoodColumnsAll } from './libGridTable/libGridTable.js'

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

    bodyColumns: setBodyColumns(['id', 'datX', 'firstName', 'fatherName', 'familyName', 'price', 'summa', 'hobby',]),

    bodyStylePole: setbodyStylePole({
        id: { width: '3em', formatpole: "str_1 0,10", classpole: 'w3-col  w3-border  w3-blue       w3-center' },
        dattX: { width: '90px', formatpole: "dat_2", classpole: 'w3-col  w3-border w3-blue w3-left-align' },
        firstName: { width: '150px', formatpole: "str_1 0,10", classpole: 'w3-col  w3-border w3-grey w3-left-align' },
        fatherName: { width: '150px', formatpole: "str_1 0,30", classpole: 'w3-col  w3-border w3-blue w3-left-align' },
        familyName: { width: '150px', formatpole: "str_1 0,30", classpole: 'w3-col  w3-border w3-blue w3-left-align' },
        hobby: { width: '200px', formatpole: "str_1 0,50", classpole: 'w3-rest w3-border w3-red  w3-right-align w3-hoverable ' },
        price: { width: '50px', formatpole: "str_1 0,30", classpole: 'w3-col  w3-border w3-blue w3-left-align' },
        summa: { width: '50px', formatpole: "str_1 0,30", classpole: 'w3-col  w3-border w3-blue w3-left-align' },
    }),

    body: setBody([
        { id: 1, dattX: "12.01.2023", firstName: "Jon", fatherName: "Jon", familyName: "Jon", hobby: "run", price: "3", summa: "9" },
        { id: 2, dattX: "12.11.2023", firstName: "Jen", fatherName: "Jon", familyName: "Jon", hobby: "sleep", price: "3", summa: "9" },
        { id: 3, dattX: "04.04.2023", firstName: "Олег", fatherName: "Jon", familyName: "Jon", hobby: "122 sleep", price: "3", summa: "9" },
        { id: 23, dattX: "18.01.2023", firstName: "Таня", fatherName: "Jon", familyName: "Jon", hobby: "sleep85855", price: "3", summa: "9" },
        { id: 55, dattX: "12.02.2023", firstName: "Аполінарій", fatherName: "Jon", familyName: "Jon", hobby: "sleвфівep", price: "3", summa: "9" },
        { id: 103, dattX: "11.03.2023", firstName: "Генадій ", fatherName: "Петрович", familyName: "Ив", hobby: "ічвав2sleep", price: "3", summa: "9" },
        { id: 202, dattX: "10.12.2023", firstName: "Светлана", fatherName: "Михайловна", familyName: "_ ", hobby: "sle ep", price: "3", summa: "9" },
        { id: 12, dattX: "08.10.2023", firstName: "Jon2", fatherName: "Jon", name3: "Jon", familyName: "run", price: "3", summa: "9" },
        { id: 24, dattX: "27.05.2023", firstName: "Jen3", fatherName: "Jon", name3: "Jon", familyName: "sleep", price: "3", summa: "9" },
        { id: 32, dattX: "12.07.2023", firstName: "Олег", fatherName: "Jon", name3: "Jon", familyName: "122", price: "3", summa: "9" },
        { id: 55, dattX: "09.10.2023", firstName: "Таня", fatherName: "Jon", name3: "Jon", familyName: "sl", price: "3", summa: "9" },
        { id: 2, dattX: "14.04.2023", firstName: "Ай", fatherName: "Jon", name3: "Jon", familyName: "sl", price: "3", suma: "9" },
        { id: 1, dattX: "12.09.2023", firstName: "Генадій ", fatherName: "Петрович", familyName: "Ива", hobby: "ічвав2sleep", price: "3", summa: "9" },
        { id: 2, dattX: "30.01.2023", firstName: "Света", fatherName: "Михайловна", familyName: "_ ", hobby: "sle ep", price: "3", summa: "9" },
        { id: 23, dattX: "27.08.2023", firstName: "Таня", fatherName: "Jon", familyName: "Jon", hobby: "sleep85855", price: "3", summa: "9" },
        { id: 55, dattX: "07.07.2023", firstName: "Аполінарій", fatherName: "Jon", familyName: "Jon", hobby: "sleвфівep", price: "3", summa: "9" },
        { id: 103, dattX: "14.04.2023", firstName: "Генадій ", fatherName: "Петрович", familyName: "Иван", hobby: "ічвав2sleep", price: "3", summa: "9" },
        { id: 202, dattX: "23.06.2023", firstName: "Светлана", fatherName: "Михайловна", familyName: "_ ", hobby: "sleep", price: "3", summa: "9" },
        { id: 1, dattX: "12.01.2023", firstName: "Jon", fatherName: "Jon", familyName: "Jon", hobby: "run", price: "3", summa: "9" },
        { id: 2, dattX: "12.11.2023", firstName: "Jen", fatherName: "Jon", familyName: "Jon", hobby: "sleep", price: "3", summa: "9" },
        { id: 3, dattX: "04.04.2023", firstName: "Олег", fatherName: "Jon", familyName: "Jon", hobby: "122", price: "3", summa: "9" },
    ]),

    foodColumns: setFoodColumns(['id', 'dattX', 'firstName', 'fatherName', 'familyName', 'price', 'summa', 'hobby',]),

    food: setFood({
        id: { width: '3em', formatpole: "count(*)", classpole: 'w3-col  w3-border  w3-blue       w3-center' },
        dattX: { width: '90px', formatpole: "max", classpole: 'w3-col  w3-border w3-blue w3-left-align' },
        firstName: { width: '150px', formatpole: "", classpole: 'w3-col  w3-border w3-grey w3-left-align' },
        fatherName: { width: '150px', formatpole: "", classpole: 'w3-col  w3-border w3-blue w3-left-align' },
        familyName: { width: '150px', formatpole: "", classpole: 'w3-col  w3-border w3-blue w3-left-align' },
        hobby: { width: '200px', formatpole: "", classpole: 'w3-rest w3-border w3-red  w3-right-align w3-hoverable ' },
        price: { width: '50px', formatpole: "max", classpole: 'w3-col  w3-border w3-blue w3-left-align' },
        summa: { width: '50px', formatpole: "sum", classpole: 'w3-col  w3-border w3-blue w3-left-align' },
    }),

    foodColumnsAll: setFoodColumnsAll(['id', 'dattX', 'summa',]),

    foodAll: setFoodAll({
        id: { width: '3em', formatpole: "count(*)", classpole: 'w3-col  w3-border  w3-blue       w3-center' },
        dattX: { width: '90px', formatpole: "max", classpole: 'w3-col  w3-border w3-blue w3-left-align' },
        summa: { width: '450px', formatpole: "sum", classpole: 'w3-col  w3-border w3-blue w3-left-align' },
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
