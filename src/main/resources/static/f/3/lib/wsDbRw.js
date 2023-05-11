'use strict'
export const
    wsDbRw = {} // WebSocket dbRw ➾ DbRwWebSocketHandler.java

wsDbRw.exchangeRwMessage = sendJson => {
    // wsDbRw.ws.onopen = event => wsDbRw.ws.send()
    wsDbRw.ws.send(JSON.stringify(sendJson))
    return new Promise((thenFn, reject) => wsDbRw.ws.onmessage = event => thenFn(event))
}

const uri_wsDbRw = "ws://" + window.location.host + "/dbRw"
wsDbRw.ws = new WebSocket(uri_wsDbRw)
