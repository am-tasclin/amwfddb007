export default {
    props: { adnId: Number, pp:String }, data() { return { count: 1, } },
    template:`
<span class="w3-dropdown-hover w3-white w3-leftbar">
    <span class="w3-tiny am-b am-u w3-btn w3-padding-small">buildJSON</span>
    <div class="w3-border w3-dropdown-content w3-container w3-hover-shadow">
        buildJson - {{pp}} - {{adnId}}
    </div> <span class="w3-hide"> {{count}} </span>
</span>
<span class="w3-small">
    <button class="w3-btn w3-padding-small am-u">Structure</button>
</span>
`,
}