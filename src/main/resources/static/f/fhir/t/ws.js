'use strict'
//----------def
const ct = {}, sp = singlePage, inJs = {}

class PageLogicFactory {
    constructor(dataFactory) {
        this.ct = ct; this.session = session
        inJs.dataFactory = dataFactory
        dataFactory.sqlRowLimit = 200
    }
    getSqlApp = name => sql_app[name]
}; app.factory('pageLogic', PageLogicFactory)

class InitPageController {
    constructor(pageLogic, wsDbSt) { this.pl = pageLogic }
}; app.controller('InitPageController', InitPageController)

//----frtm------def
class WsDbSelect1 {}
class WsDbSelect {
    onmessageDefer
    stack = []
    ws = new WebSocket("ws://localhost:8007/dbSelect")
    send = data => {
        data = JSON.stringify(data);
        if (this.ws.readyState == 1) {
            this.ws.send(data);
        } else {
            stack.push(data);
        }
    }
    onmessage = callback => {
        if (this.ws.readyState == 1) {
            this.ws.onmessage = callback;
        } else {
            this.onmessageDefer = callback;
        }
    }
    constructor() {
        this.ws.onopen = event => {
            for (i in this.stack)
                this.ws.send(stack[i])
            this.stack = []
            if (this.onmessageDefer) {
                this.ws.onmessage = this.onmessageDefer;
                this.onmessageDefer = null;
            }
        }
    }
}; app.factory('wsDbSt', WsDbSelect1)

inJs.wsDbSelect = new WebSocket("ws://localhost:8007/dbSelect")
inJs.wsDbSelect.onmessage = event => {
    let obj = JSON.parse(event.data)
    session[obj.sqlName] = obj.list
    if ('ValueSetTitle' == obj.sqlName)
        ar.forEach(session[obj.sqlName], item => session
            .eMap[item.doc_id] = item)
}

ct.echo = () => {
    ar.forEach(["ValueSetTitle", "UseValueSet", "CodeSystemTitle"], sqlName => {
        const jn = { sqlName: sqlName, sql: lib1.replaceSql(sql_app[sqlName].sql) }
        inJs.wsDbSelect.send(JSON.stringify(jn))
    })
}

class FTerminologyPageController extends InitPageController {
    constructor(pageLogic) {
        super(pageLogic)
        console.log(53)
        if (!session.CodeSystemTitle) {
            inJs.dataFactory.readSql(sql_app.CodeSystemTitle.sql, r => session.CodeSystemTitle = r.list)
            inJs.dataFactory.readSql(sql_app.ValueSetTitle.sql, r => session.ValueSetTitle = r.list
                && ar.forEach(r.list, item => session.eMap[item.doc_id] = item))
            inJs.dataFactory.readSql(lib1.replaceSql(sql_app.UseValueSet.sql), r => session.UseValueSet = r.list)
        }
    }
}; ar.forEach(['frtm',]
    , v => singlePage[v] = routeController(FTerminologyPageController, 'ie/frtm.html'))

//----fcpt---FConceptPageController---def
inJs.readSql = 'DomainResource01 BackboneElement01 BackboneElement02 \n\
Element01 Resource01 CanonicalResource01 MetadataResource01 \n\
Logical01 Definition01 Event01 Request01'.split(/\s+/)

class FConceptPageController extends InitPageController {
    constructor(pageLogic, wsDbSt) {
        super(pageLogic, wsDbSt)
        console.log(50, wsDbSt, pageLogic, 11, wsDbSt.onmessage)
        // if (!inJs.wsDbFcptSelect) inJs.wsDbFcptSelect = new WebSocket("ws://localhost:8007/dbSelect")
        wsDbSt.onmessage && wsDbSt.onmessage(event => {
            const obj = JSON.parse(event.data);
            session[obj.sqlName] = obj.list
        })
        ar.forEach(inJs.readSql, sqlName => {
            console.log(sqlName)
            if (sql_app[sqlName]) {
                console.log(64)
                if (!session[sqlName]) {
                    console.log(67)
                    const jn = { sqlName: sqlName, sql: lib1.replaceSql(sql_app[sqlName].sql) }
                    inJs.wsDbSelect.send(JSON.stringify(jn))
                    wsDbSt.send && wsDbSt.send(jn)
                }
            }
        })
    }
}; angular.forEach(['fcpt',]
    , v => singlePage[v] = routeController(FConceptPageController, 'ie/fcpt.html'))



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

