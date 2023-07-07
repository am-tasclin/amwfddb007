'use struct'
import { setH1, setHead } from './lib/libGridTable.js'


export default {
    h1: setH1('Довідник персонала111'),
    head: setHead({
        id: { alias: '№№', style: 'width: 45px;', filter: 'id' },
        dataX: { alias: 'Дата', style: 'width: 90px;', filter: 'dataX' },
        pip: {
            alias: 'ПІП',
            filter: 'firstName,fatherName,familyName',
            child: {
                firstName: { alias: "Ім'я", style: 'width: 150px;', filter: 'firstName' },
                fatherName: { alias: 'По Батьковddі', style: 'width: 150px;', filter: 'fatherName' },
                familyName: { alias: 'Прізвище', style: 'width: 150px;', filter: 'familyName' },
            }
        },
        money: {
            alias: 'грн',
            filter: 'summa',
            child: {
                price: { alias: "ціна", style: 'width:50px', filter: 'price,summa' },
                summa: { alias: "сума", style: 'width:50px', filter: 'summa' }
            }
        },
        hobby: { alias: 'Хобби', style: 'width: 200px;', filter: 'hobby' },

    }),

    table: [
        { id: 1, datt: "12.01.2023", name1: "Jon", name2: "Jon", name3: "Jon", hobby: "run", price: "3", suma: "9" },
        { id: 2, datt: "12.11.2023", name1: "Jen", name2: "Jon", name3: "Jon", hobby: "sleep", price: "3", suma: "9" },
        { id: 3, datt: "04.04.2023", name1: "Олег", name2: "Jon", name3: "Jon", hobby: "122 sleep", price: "3", suma: "9" },
        { id: 23, datt: "18.01.2023", name1: "Таня", name2: "Jon", name3: "Jon", hobby: "sleep85855", price: "3", suma: "9" },
        { id: 55, datt: "12.02.2023", name1: "Аполінарій", name2: "Jon", name3: "Jon", hobby: "sleвфівep", price: "3", suma: "9" },
        { id: 103, datt: "11.03.2023", name1: "Генадій ", name2: "Петрович", name3: "Ивановский", hobby: "ічвав2sleep", price: "3", suma: "9" },
        { id: 202, datt: "10.12.2023", name1: "Светлана", name2: "Михайловна", name3: "_ ", hobby: "sle ep", price: "3", suma: "9" },
        { id: 12, datt: "08.10.2023", name1: "Jon2", name2: "Jon", name3: "Jon", hobby: "run", price: "3", suma: "9" },
        { id: 24, datt: "27.05.2023", name1: "Jen3", name2: "Jon", name3: "Jon", hobby: "sleep", price: "3", suma: "9" },
        { id: 32, datt: "12.07.2023", name1: "Олег", name2: "Jon", name3: "Jon", hobby: "122 sleep", price: "3", suma: "9" },
        { id: 55, datt: "09.10.2023", name1: "Таня", name2: "Jon", name3: "Jon", hobby: "sleep85855", price: "3", suma: "9" },
        { id: 2, datt: "14.04.2023", name1: "Ай", name2: "Jon", name3: "Jon", hobby: "sleвфівep", price: "3", suma: "9" },
        { id: 1, datt: "12.09.2023", name1: "Генадій ", name2: "Петрович", name3: "Ивановский", hobby: "ічвав2sleep", price: "3", suma: "9" },
        { id: 2, datt: "30.01.2023", name1: "Света", name2: "Михайловна", name3: "_ ", hobby: "sle ep", price: "3", suma: "9" },
        { id: 23, datt: "27.08.2023", name1: "Таня", name2: "Jon", name3: "Jon", hobby: "sleep85855", price: "3", suma: "9" },
        { id: 55, datt: "07.07.2023", name1: "Аполінарій", name2: "Jon", name3: "Jon", hobby: "sleвфівep", price: "3", suma: "9" },
        { id: 103, datt: "14.04.2023", name1: "Генадій ", name2: "Петрович", name3: "Ивановский", hobby: "ічвав2sleep", price: "3", suma: "9" },
        { id: 202, datt: "23.06.2023", name1: "Светлана", name2: "Михайловна", name3: "_ ", hobby: "sleep", price: "3", suma: "9" },
    ],

    colNames: ['id', 'datt', 'name1', 'name2', 'name3', 'price', 'suma', 'hobby'],


    colClassStylePole: {
        id: { width: '3em', formatpole: "tr_1 0,10", classpole: 'w3-col  w3-border  w3-blue       w3-center' },
        datt: { width: '90px', formatpole: "dat_2", classpole: 'w3-col  w3-border w3-blue w3-left-align' },
        name1: { width: '150px', formatpole: "str_1 0,10", classpole: 'w3-col  w3-border w3-grey w3-left-align' },
        name2: { width: '150px', formatpole: "str_1 0,30", classpole: 'w3-col  w3-border w3-blue w3-left-align' },
        name3: { width: '150px', formatpole: "str_1 0,30", classpole: 'w3-col  w3-border w3-blue w3-left-align' },
        hobby: { width: '200px', formatpole: "str_1 0,50", classpole: 'w3-rest w3-border w3-red  w3-right-align w3-hoverable ' },
        price: { width: '50px', formatpole: "str_1 0,30", classpole: 'w3-col  w3-border w3-blue w3-left-align' },
        suma: { width: '50px', formatpole: "str_1 0,30", classpole: 'w3-col  w3-border w3-blue w3-left-align' },
    },


    tablefooter1: ['id', 'datt', 'name1', 'name2', 'name3', 'price', 'suma', 'hobby',],
    footer1: {
        id: { width: '45px', agregat: "", classpole: 'w3-col  w3-navy  w3-center' },
        datt: { width: '90px', agregat: "", classpole: 'w3-col  w3-navy  w3-left-align' },
        name1: { width: '150px', agregat: "", classpole: 'w3-col  w3-border w3-left-align' },
        name2: { width: '150px', agregat: "min", classpole: 'w3-col  w3-border w3-left-align' },
        price: { width: '50px', agregat: "max", classpole: 'w3-col  w3-border w3-left-align' },
        suma: { width: '50px', agregat: "sum", classpole: 'w3-col  w3-border w3-left-align' },
        name3: { width: '150px', agregat: "", classpole: 'w3-col  w3-border w3-left-align' },
        hobby: { width: '200px', agregat: "count(*)", classpole: 'w3-rest w3-border w3-right-align' },

    },

    tablefooter2: ['id', 'datt', 'name1'],
    footer2: {
        id: { width: '45px', agregat: "count(*)", classpole: 'w3-col  w3-navy  w3-center' },
        datt: { width: '90px', agregat: "max", classpole: 'w3-col  w3-navy  w3-left-align' },
        name1: { width: '750px', agregat: "", classpole: 'w3-col w3-green  w3-border w3-right-align' },
    },
    Nastroyki: {
        SortPole: "",
        SortDesc: ""
    }
}