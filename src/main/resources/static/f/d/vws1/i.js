const { createApp } = Vue
    , sql_app = {}
    , session = { eMap: {} }
    , d = {
        message: 'Hello Vue 3.2!',
        rawHtml: '<b class="w3-red">t1.html</b>',
        list: [{ x: 1 }, { x: 2 }, { x: 3 },],
        session: { eMap: {} },
        readSqlList: ["CodeSystemTitle"
            , "ValueSetTitle"
            , "UseValueSet"],
        count: 0,
        isBoolean: true,
        isEvenOdd: function () { return (d.count % 2) == 0 },
    }, inJs = {}


inJs.wsDbSelect = new WebSocket("ws://localhost:8007/dbSelect")
inJs.wsDbSelect.onopen = event => {
    d.readSqlList.forEach(sqlName => {
        if (sql_app[sqlName]) {
            const jn = { sqlName: sqlName, sql: lib1.replaceSql(sql_app[sqlName].sql) }
            inJs.wsDbSelect.send(JSON.stringify(jn))
        }
    })
}
inJs.wsDbSelect.onmessage = event => {
    let obj = JSON.parse(event.data)
    d.session[obj.sqlName] = obj.list
    if ('ValueSetTitle' == obj.sqlName)
        d.session[obj.sqlName]
            .forEach(item => d.session.eMap[item.doc_id] = item)
    //app.mount('#app')
    app.config.methods
}

// app.component('TodoDeleteButton', TodoDeleteButton)

sql_app.DomainResource01 = {
    name: 'DomainResource',
    sql: 'SELECT * FROM doc \n\
        LEFT JOIN string ON string_id=doc_id \n\
        WHERE reference= 369789 \n\
        ORDER BY value',
}

sql_app.CodeSystemTitle = {
    name: 'CodeSystem.title',
    sql: 'SELECT s.value title, d.* FROM doc d \n\
    LEFT JOIN string s ON s.string_id=d.doc_id \n\
    WHERE d.reference = 373575',
}

sql_app.UseValueSet = {
    name: 'Використання ValueSet в атрибутах FHIR класів',
    sql: 'SELECT c.value c, sr.value sr, srr.value srr \n\
    , vs.doc_id vs_id, d.doc_id usevs_id, dr.*, d.reference2 c_id \n\
    FROM doc p, doc d \n\
    LEFT JOIN string c ON d.reference2=c.string_id \n\
    LEFT JOIN doc dr ON dr.doc_id=d.reference \n\
    LEFT JOIN string sr ON dr.doc_id=sr.string_id \n\
    LEFT JOIN string srr ON dr.reference=srr.string_id \n\
    , (:sql_app.ValueSetTitle ) vs \n\
    WHERE vs.doc_id=p.reference2 \n\
    AND p.doc_id=d.parent',
}

sql_app.ValueSetTitle = {
    name: 'ValueSet.title',
    sql: 'SELECT s.value title, d.* FROM doc d \n\
    LEFT JOIN string s ON s.string_id=d.doc_id \n\
    WHERE d.reference = 372045',
}

const lib1 = {}
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

function f01() {
    let tt01 = document.getElementById('tt01');
    var clon = tt01.content.cloneNode(true)
    console.log("-31-", clon)
    let ttadd01 = document.getElementById('ttadd01');
    console.log("-22-", ttadd01)
    ttadd01.appendChild(clon);
}

const focus = {
    mounted: (el) => el.focus()
}

const app = createApp({
    data() {
        return d
    },
    direct11ives: {
        focus
    },
    created: () => {
        console.log("Starting created of Vue")


    },
    mounted: () => {
        console.log("Mounted of Vue")

    },
    methods: {
        getLength: lName => d.session[lName] && d.session[lName].length,
        getSqlAppName: sqlName => sql_app[sqlName] && sql_app[sqlName].name,
        increment() {
            this.count++
        },
        isLogic() { return d.isEvenOdd }
    },
})
app.directive('focus', focus)
app.mount('#app')
app.config.errorHandler = (err) => {
    console.error(err)
}
