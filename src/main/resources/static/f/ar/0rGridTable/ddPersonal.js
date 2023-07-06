'use struct'
import { setH1, setHead } from './lib/libGridTable.js'

export default {
    h1: setH1('Довідник персонала'),
    head: setHead({
        id: { alias: '№№', style: 'width: 3em;' },
        dataX: { alias: 'Дата', style: 'width: 6em;' },
        pip: {
            alias: 'ПІП',
            child: {
                firstName: { alias: "Ім'я", style: 'width: 6em;' },
                fatherName: { alias: 'По Батькові' },
                familyName: { alias: 'Прізвище' },
            }
        },
        hobby: { alias: 'Хобби', style: 'width: 10em;'  },
    }),
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
