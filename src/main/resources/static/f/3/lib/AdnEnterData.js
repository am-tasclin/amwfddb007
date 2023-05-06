'use strict'
export default {
    props: { adnId: Number,},
    template:`
    <div class="w3-container">
        <span class="w3-tiny">
            Edit & Enter Adn Content Data
        </span>
        <div>
            <textarea class="am-width-100pr" />
        </div>
        <button class="w3-btn w3-border">OK</button>
        {{adnId}}
    </div>
    `,
}