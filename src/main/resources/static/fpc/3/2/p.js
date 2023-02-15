'use strict'
import { sql_app, l1 } from './l1.js'
console.log(123, l1)

var promiseCount = 0

const log = document.getElementById('log')

const testPromise = () => {
    var thisPromiseCount = ++promiseCount

    log.insertAdjacentHTML('beforeend', '<br>' + thisPromiseCount +
        ') Запуск (запуск синхронного кода)')

    var p1 = new Promise((resolve, reject) => {
        const d = Math.random() * 2000 + 1000
        log.insertAdjacentHTML('beforeend'
            , '<br>' + thisPromiseCount + ') Запуск промиса (запуск асинхронного кода) ' + d)
        console.log(d)
        window.setTimeout(() => resolve({n:thisPromiseCount, d:d}), d)
    })

    log.insertAdjacentHTML('beforeend'
        , thisPromiseCount + ') Промис создан (синхронный код завершён) ')
        
    p1.then((val) => log.insertAdjacentHTML('beforeend'
        , '<br><br>' + val.n + ') Промис исполнен (асинхронный код завершён) ' + val.d))
    return p1
}

//execute asinchron

document.getElementById("btn").addEventListener("click", testPromise)
