'use struct'
export const data = {}
data.table = [
    { id: 1, datt: "12.01.2023", name1: "Jon", name2: "Jon", name3: "Jon", hobby: "run", },
    { id: 2, datt: "12.11.2023", name1: "Jen", name2: "Jon", name3: "Jon", hobby: "sleep", },
    { id: 3, datt: "04.04.2023", name1: "Олег", name2: "Jon", name3: "Jon", hobby: "122 sleep", },
    { id: 23, datt: "18.01.2023", name1: "Таня", name2: "Jon", name3: "Jon", hobby: "sleep85855", },
    { id: 55, datt: "12.02.2023", name1: "Аполінарій", name2: "Jon", name3: "Jon", hobby: "sleвфівep", },
    { id: 103, datt: "11.03.2023", name1: "Генадій ", name2: "Петрович", name3: "Ивановский", hobby: "ічвав2sleep", },
    { id: 202, datt: "10.12.2023", name1: "Светлана", name2: "Михайловна", name3: "_ ", hobby: "sle ep", },
    { id: 12, datt: "08.10.2023", name1: "Jon2", name2: "Jon", name3: "Jon", hobby: "run", },
    { id: 24, datt: "27.05.2023", name1: "Jen3", name2: "Jon", name3: "Jon", hobby: "sleep", },
    { id: 32, datt: "12.07.2023", name1: "Олег", name2: "Jon", name3: "Jon", hobby: "122 sleep", },
    { id: 55, datt: "09.10.2023", name1: "Таня", name2: "Jon", name3: "Jon", hobby: "sleep85855", },
    { id: 2, datt: "14.04.2023", name1: "Ай", name2: "Jon", name3: "Jon", hobby: "sleвфівep", },
    { id: 1, datt: "12.09.2023", name1: "Генадій ", name2: "Петрович", name3: "Ивановский", hobby: "ічвав2sleep", },
    { id: 2, datt: "30.01.2023", name1: "Света", name2: "Михайловна", name3: "_ ", hobby: "sle ep", },
    { id: 23, datt: "27.08.2023", name1: "Таня", name2: "Jon", name3: "Jon", hobby: "sleep85855", },
    { id: 55, datt: "07.07.2023", name1: "Аполінарій", name2: "Jon", name3: "Jon", hobby: "sleвфівep", },
    { id: 103, datt: "14.04.2023", name1: "Генадій ", name2: "Петрович", name3: "Ивановский", hobby: "ічвав2sleep", },
    { id: 202, datt: "23.06.2023", name1: "Светлана", name2: "Михайловна", name3: "_ ", hobby: "sle ep", },
]

data.colAlias = {
    id: '№№',
    datt: 'Дата',
    name1: "FIO | Імя",
    name2: "FIO | Отчество",
    name3: "FIO | Призвисько",
    hobby: "Xobbi"
}

data.colNames = ['id', 'datt', 'name1', 'name2', 'name3', 'hobby']

data.colClassStyle = {
    id: { width: '60px', height: '30px', classhead: 'w3-col            w3-left-align' },
    datt: { width: '150px', height: '30px', classhead: 'w3-col            w3-center' },
    name1: { width: '150px', height: '30px', classhead: 'w3-col            w3-center' },
    name2: { width: '150px', height: '30px', classhead: 'w3-col            w3-center' },
    name3: { width: '150px', height: '30px', classhead: 'w3-col            w3-center' },
    hobby: { width: '200px', height: '30px', classhead: 'w3-rest w3-green  w3-center' },
}

data.colClassStylePole = {
    id: { width: '60px', formatpole: "", classpole: 'w3-col  w3-border  w3-blue       w3-center' },
    datt: { width: '150px', formatpole: "dat_2", classpole: 'w3-col  w3-border w3-blue w3-left-align' },
    name1: { width: '150px', formatpole: "str_1 0,10", classpole: 'w3-col  w3-border w3-grey w3-left-align' },
    name2: { width: '150px', formatpole: "str_1 0,30", classpole: 'w3-col  w3-border w3-blue w3-left-align' },
    name3: { width: '150px', formatpole: "str_1 0,30", classpole: 'w3-col  w3-border w3-blue w3-left-align' },
    hobby: { width: '200px', formatpole: "str_1 0,50", classpole: 'w3-rest w3-border w3-red  w3-right-align w3-hoverable ' },
}

data.tablefooter = [
    { id: "|", datt: "|", name1: "|", name2: "|", name3: "|", hobby: "|", },
]

data.footer1 = {
    id: { width: '60px',     footer1: "count(*)", footer2: "", classpole: 'w3-col  w3-navy  w3-center' },
    datt: { width: '150px',  footer1: "count(*)", footer2: "", classpole: 'w3-col  w3-navy  w3-left-align' },
    name1: { width: '150px', footer1: "",         footer2: "", classpole: 'w3-col  w3-navy  w3-left-align' },
    name2: { width: '150px', footer1: "",         footer2: "", classpole: 'w3-col  w3-navy  w3-left-align' },
    name3: { width: '150px', footer1: "",         footer2: "", classpole: 'w3-col  w3-navy  w3-left-align' },
    hobby: { width: '200px', footer1: "",         footer2: "", classpole: 'w3-rest w3-navy  w3-right-align w3-hoverable ' },
}

data.Nastroyki = {
    KolFooter: 2,
    SortPole: "",
    SortDesc: ""
}
