'use strict'
/**
 * Algoritmed ©, Licence EUPL-1.2 or later.
 * 
 */

const uri_wsDbRw = "ws://" + window.location.host + "/dbRw"
export const ws = new WebSocket(uri_wsDbRw)

/**
 * Execute SQL SELECT query
 * @param {*} sql 
 * @returns results row list
 */
export const executeSelectQuery = sql => execute_SQL_API({ sql: sql, cmd: 'executeQuery' })

/**
 * Execute some SQL with WebSocket API from REST: /dbRw
 * @param {*} sqlApi 
 * @returns result
 */
export const execute_SQL_API = sqlApi => {
    ws.send(JSON.stringify(sqlApi))
    return new Promise((thenFn, reject) => ws.onmessage = event => thenFn(JSON.parse(event.data)))
}