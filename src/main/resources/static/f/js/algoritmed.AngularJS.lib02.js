/**
 * @license Algoritmed.AngularJS v0.1.024
 * (c) 2021-2023 Algoritmed Ltd. http://algoritmed.com
 * License: Apache-2.0 license 
 */
'use strict'
//----------def
const btn = {}, lib1 = {}, sql_app = {}, session = { eMap: {} }, singlePage = {}
const ar = angular, app = ar.module("app", ['ngRoute'])
ar.element(() => angular.bootstrap(document, ['app']))

class RouteProviderConfig {
    constructor($routeProvider) {
        console.log('RouteProviderConfig', Object.keys(singlePage))
        // v.controller && $routeProvider.when("/" + k, v)))
        angular.forEach(singlePage, (v, k) => {
            if (v.controller) {
                // console.log(k, v)
                $routeProvider.when("/" + k, v)
            }
        })
        // if (singlePage.index_template) $routeProvider.otherwise({ templateUrl: singlePage.index_template })
        // else
        $routeProvider.otherwise({ template: "<div class='w3-tiny am-b w3-right'>Hey You, API</div>" })
    }
}; app.config(RouteProviderConfig)

const routeController = (controllerClass, htmlName) => {
    if (!htmlName) htmlName = 'HiAPI.html'
    const controllerName = controllerClass.toString().split(' ')[1]
    app.controller(controllerName, controllerClass)
    return { templateUrl: htmlName, controller: controllerName, }
}

class RWData0Factory {
    constructor($http, $q) { this.$http = $http; this.$q = $q }
    urlSql = '/r/url_sql_read_db1'
    sqlRowLimit = 50

    httpPostSql = params => {
        let deferred = this.$q.defer()
        this.$http.post(this.urlSql, params)
            .then(response => deferred.resolve(response.data)
                , response => console.error(response.status))
        return deferred.promise
    }

    httpGetSql = params => {
        let deferred = this.$q.defer()
        if (params.sql) {
            if (params.limit) sqlRowLimit = params.limit
            params.sql = params.sql + ' LIMIT ' + this.sqlRowLimit
            this.$http.get(this.urlSql, { params: params })
                .then(response => deferred.resolve(response.data)
                    , response => console.error(response.status))
        } else deferred.resolve({ hello: 'Hello World! no SQL' })
        return deferred.promise
    }
    // deferred.reject(response.status)
    // https://metanit.com/web/angular/3.3.php

    readSql = (sql, fn) => this.httpGetSql({ sql: sql }).then(fn)
    writeSql = (sql, fn) => this.httpPostSql({ sql: sql }).then(fn)
}; app.factory('dataFactory', RWData0Factory)



lib1.replaceSql = sql => {

    while (sql.includes(':fn_sql_app.')) {
        const sql_fnStr = sql.split(':fn_sql_app.')[1].split(' ')[0]
        let sql_fnPath = sql_fnStr.split('.')
        const fnName = firstFunctionName(sql_fnPath)
        // console.log(sql_fnStr, fnName)
        const fnParamsStr = sql_fnStr.split(fnName + '(')[1].split(')')[0]
        // console.log(sql_fnStr, fnName, '\n-fn(PARAMS)->\n', fnParamsStr)
        sql_fnPath = sql_fnStr.split('.')
        // console.log(sql_fnStr, sql_fnPath, 1)
        const fnObj = firstFunctionObj(sql_app[sql_fnPath.shift()], sql_fnPath)
        sql_fnPath = fnParamsStr.split('.')
        // console.log(sql_fnPath)
        const fnParamObj = pathValue(sql_app[sql_fnPath.shift()], sql_fnPath)
        // console.log(fnObj, fnParamObj)
        let fnSql = fnObj(fnParamObj)
        sql = sql.replace(':fn_sql_app.' + sql_fnStr, fnSql)
        // console.log(sql)
    }

    while (sql.includes(':var_sql_app.')) {
        const sql_varName = sql.split(':var_sql_app.')[1].split(' ')[0],
            sql_varPath = sql_varName.split('.'),
            sql_varVal = pathValue(sql_app[sql_varPath.shift()], sql_varPath)
        // console.log(sql_varName, '=', sql_varVal)
        sql = sql.replace(':var_sql_app.' + sql_varName, sql_varVal)
    }

    // let sql_app = ':sql_app'
    let sql_app = ':sql_app.'
    while (sql.includes(sql_app)) {
        let sql_name = sql.split(sql_app)[1].split(' ')[0]
        // console.log(sql_name)
        let sql_inner = lib1.readSql2R(sql_name)
        sql = sql.replace(sql_app + sql_name, sql_inner)
    }
    return '' + sql
}

lib1.readSql2R = sqlN => sql_app[sqlN] && lib1.replaceSql(sql_app[sqlN].sql)
