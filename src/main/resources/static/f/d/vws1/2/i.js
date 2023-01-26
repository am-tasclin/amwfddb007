//'use strict'
const { createApp } = Vue
    , allPagesApp = {}
console.log(123, createApp)

const app1 = createApp({
    data: () => d
})

app1.component('am-ct01', {
    template: `<span>Hi am-ct01 World!</span>`,
})
app1.component('am-tt01', {
    template: "#tt01",
    props: {
        adnId: Number
    },
    data() {
        return {
            count: 11
        }
    }
})

app1.mount('#app1')

allPagesApp.app2 = createApp({
    data: () => d
})
allPagesApp.app2.mount('#app2')

const pageApp = {
    data: () => d,
    methods: {
        increment: () => this.count++
    }

}
allPagesApp.pageApp = createApp(pageApp)
allPagesApp.pageApp.mount('#pageApp')
