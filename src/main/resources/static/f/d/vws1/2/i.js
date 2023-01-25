//'use strict'
const { createApp } = Vue
    , allPagesApp = {}
console.log(123, createApp)

const app1 = createApp({
    data() {
        return {
            count: 0
        }
    }
})
app1.mount('#app1')

allPagesApp.app2 = createApp({
    data: () => d
})

allPagesApp.app2.mount('#app2')
allPagesApp.pageApp = createApp()
allPagesApp.pageApp.data = () => d
allPagesApp.pageApp.mount('#pageApp')