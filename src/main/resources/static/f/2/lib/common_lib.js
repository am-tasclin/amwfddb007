'use strict'
export const
    cl = {}//common lib

cl.W3ShowOnOff = eId => !document.getElementById(eId) && true
    || (!document.getElementById(eId).className.includes('w3-show')
        && (document.getElementById(eId).className += ' w3-show')
        || (document.getElementById(eId).className =
            document.getElementById(eId).className.replace(' w3-show', ''))
    )
