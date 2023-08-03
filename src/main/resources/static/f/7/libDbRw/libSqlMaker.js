'use strict'
/**
 * Algoritmed ©, Licence EUPL-1.2 or later.
 * 
 */
const sqlMakerContainer = {}
console.log(sqlMakerContainer)

/**
 * Block of functions to generate the SQL select with it init data collection
 * Блок функцій для генерації SQL select з його ініціальним набором даних
 * @param {*} smContainer 
 * @param {*} sqlTableName 
 * @returns 
 */
const SqlSelectMaker = (smContainer, sqlTableName) => {
    return {
        getColumns: () => smContainer.columns || ' * ',
        getFrom: () => smContainer.from || sqlTableName,
        sqlTableName: sqlTableName,
        initFrom(from) {
            smContainer.from = from
            return this
        }, initColumns(columns) {
            smContainer.columns = columns
            return this
        }, initLeftJoin(fromTable, on) {
            smContainer.leftJoin = { fromTable: fromTable, on: on }
            return this
        }, initWhere(where) {
            smContainer.where = where
            return this
        }, get() {
            let sql = 'SELECT '.concat(this.getColumns())
                .concat(' FROM ').concat(this.getFrom())
            smContainer.leftJoin && (sql +=
                '\n LEFT JOIN ' + smContainer.leftJoin.fromTable
                + ' ON ' + smContainer.leftJoin.on)
            smContainer.where && (sql += ' WHERE ' + smContainer.where)
            return sql
        },
    }
}

/**
 * Initialize and return SQL Select Maker
 * Ініціалізація та повернення SQL Select виробника
 * 
 * @param {*} smContainer 
 * @param {*} sqlTableName 
 * @returns 
 */
export const initSelectMaker = (key, sqlTableName) =>
    SqlSelectMaker(sqlMakerContainer[key] || (sqlMakerContainer[key] = {}), sqlTableName)
