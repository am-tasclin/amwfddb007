'use strict'
const { createApp } = Vue
import { ws, executeSelectQuery } from '/f/6/lib/wsDbRw.js'

const makeSqlSelect = sqlTableName => {
    return {
        sqlTableName: sqlTableName,
        setFrom(from) { this.from = from },
        getFrom() { return this.from || sqlTableName },
        setColumns(columns) {
            this.columns = columns
            return this
        },
        getColumns() { return this.columns || ' * ' },
        get() { return 'SELECT ' + this.getColumns() + ' FROM ' + this.getFrom() },
    }
}
const selectKassaEntry = makeSqlSelect('kassa.entry')
console.log(selectKassaEntry.get())
console.log(selectKassaEntry.setColumns(' count(*) AS cnt ').get())

ws.onopen = event =>
    executeSelectQuery(selectKassaEntry.get())
        .then(json => {
            console.log('лінія 8 і так написано', json)
        })


//table config container
const tCC = tableName => {
    return {
        tableName: tableName,
        f1() { return 'Hi ' + this.tableName }
    }
}

const centralTable = tCC('centralTable')
const ddTable = tCC('ddTable')
console.log(centralTable.tableName)
console.log(centralTable.f1())
console.log(ddTable.f1())

const makeAdder = x => y => x + y
console.log(makeAdder(1)(2))

const add3 = makeAdder(3)
const add11 = makeAdder(11)
console.log(add3(2)) // 5
console.log(add11(2)) // 13
