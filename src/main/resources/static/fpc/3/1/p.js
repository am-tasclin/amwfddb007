'use strict'

const { createApp, nextTick } = Vue
    , pd = {} //pd: Page Data

pd.sn = {}//sn: session
pd.sn.hashVrVl = window.location.hash.split(',')
fd.sn = pd.sn

console.log(pd.sn.hashVrVl[1], sql_app);

const sqlFn = (adnId, sqlName) => l1.replaceSql(sql_app[sqlName].sql)
    .replace(':adnId', adnId)

const adnId = 1 * pd.sn.hashVrVl[1]
    , sqlName = 'adn01OneNode'
    , sql = sqlFn(adnId, sqlName)

l1.wsDbSelect = new WebSocket("ws://" + window.location.host + "/dbSelect");
l1.wsDbSelect.onopen = event => {
    console.log(adnId, sqlName)
    l1.wsDbSelect.send(JSON.stringify(
        { sqlName: sqlName, adnId: adnId, sql: sql }))
}

l1.wsDbSelect.onmessage = event => {
    console.log(event)
};

(async () => {
    try {
        // await l1.wsDbSelect.open(adnId);
    } catch (e) {
        console.error(e)
    }
})()

const app =
    createApp({
        methods: {
            async increment2() {
                this.count++

                // DOM not yet updated
                console.log(document.getElementById('increment2').textContent) // 

                await nextTick()
                // DOM is now updated
                console.log(document.getElementById('increment2').textContent) // 
            },
            increment() {
                this.count++
            },
        },
        // `mounted` is a lifecycle hook which we will explain later
        mounted() {
            // `this` refers to the component instance.
            console.log(this.count) // => 1
            // data can be mutated as well
            this.count = 2
            this.increment()

            const newObject = {}
            this.someObject = newObject

            console.log(newObject === this.someObject) // false
        },
        data() {
            return {
                sn: pd.sn,
                someObject: {},
                message: 'Hello Vue!',
                count: 0,
                rawHtml: '<span style="color: red">This should be red.</span>',
                dynamicId: 11,
                dynamicId2: 22,
                isButtonDisabled: true,
                objectOfAttrs: {
                    id: 'container',
                    class: 'w3-yellow'
                },
            }
        }
    }).mount('#app')

console.log(app)

app.config = {}
app.config.errorHandler = err => {
    /* handle error */
    console.error(err)
}

