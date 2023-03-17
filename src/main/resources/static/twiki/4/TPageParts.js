'use strict'
export default {
    props: { adnId: Number }, 
    template:`
<div class="w3-border-bottom">
    <span class="w3-tiny am-b"> FHIR parts </span> ➾
    {{adnId}}
    </div>
    `,
}