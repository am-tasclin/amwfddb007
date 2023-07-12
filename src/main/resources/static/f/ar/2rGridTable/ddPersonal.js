'use struct'
import { setH1, setHead, setBody, setBodyColumns } from './libGridTable/libGridTable.js'

export default {
    h1: setH1('Довідник персонала'),
    head: setHead({
        id: { alias: '№№', style: 'width: 3em;' },
        dataX: {
            alias: 'Дата', style: 'width: 9em;'
            , dataInFormat: 'DD.MM.YYYY', dataOutFormat: 'YYYY MMM DD'
        }, pip: {
            alias: 'ПІП',
            child: {
                firstName: { alias: "Ім'я", style: 'width: 6em;' },
                fatherName: { alias: 'По Батькові' },
                familyName: { alias: 'Прізвище' },
            }
        }, money: {
            alias: 'грн',
            filter: 'summa',
            child: {
                price: { alias: "ціна", style: 'width:5em;', filter: 'price,summa' },
                summa: { alias: "сума", style: 'width:5em;', filter: 'summa' }
            }
        }, hobby: { alias: 'Хобби', style: 'width: 10em;' },
    }),
    bodyColumns: setBodyColumns(['id', 'dataX', 'firstName', 'fatherName', 'familyName', 'price', 'summa', 'hobby',]),
    body: setBody([
        { id: 1, dataX: "12.01.2023", firstName: "Jon", fatherName: "Jon", familyName: "Jon", hobby: "run", price: "3", summa: "9" },
        { id: 2, dataX: "12.11.2023", firstName: "Jen", fatherName: "Jon", familyName: "Jon", hobby: "sleep", price: "3", summa: "9" },
        { id: 3, dataX: "04.04.2023", firstName: "Олег", fatherName: "Jon", familyName: "Jon", hobby: "122 sleep", price: "3", summa: "9" },
    ]),
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
