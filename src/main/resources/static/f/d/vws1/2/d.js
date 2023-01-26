'use strict'

const jsLib1 = {}
jsLib1.tree = { l: [], r: [] }
jsLib1.hash = window.location.hash
jsLib1.isTreeHash = jsLib1.hash.includes('tree_')
jsLib1.tree.l = jsLib1.isTreeHash && jsLib1.hash.split('tree_')[1].split(',')[0].split('_')
jsLib1.tree.r = jsLib1.isTreeHash && jsLib1.hash.split('tree_')[1].split(',')[1].split('_')

const myPort = window.location.port
jsLib1.wsDbSelect = new WebSocket("ws://localhost:"+myPort+"/dbSelect")
console.log(jsLib1.wsDbSelect)

const d = {
    count: 4,
    tree: jsLib1.tree,
    siteTitle: 'Vue02WebSocket: (vws1/2) ',
    hw: 'Hello World!',
    eMap: {
        "369864": {
            "doc_id": 369864, "doctype": null, "reference": 369789
            , "parent": 373473, "reference2": 369767, "r_doctype": null, "value_22": "ServiceRequest"
            , "value_u_22": null, "value_24": null, "value_25": null, "rr_value_22": "Resource", "r_value_22": "DomainResource"
            , "r2_doctype": null, "r2_value_22": "Request", "sort": 11
        }
        , "373530": {
            "doc_id": 373530, "doctype": 14, "reference": null, "parent": 45, "reference2": null
            , "r_doctype": null, "value_22": "eHealth in ua", "value_u_22": null, "value_24": null, "value_25": null
            , "rr_value_22": null, "r_value_22": null, "r2_doctype": null, "r2_value_22": null, "sort": 1
        }
    }
}