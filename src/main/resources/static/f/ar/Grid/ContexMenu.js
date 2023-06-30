new Vue({
    el: '#demo',

    data: {
        viewMenu: false,
        top: '0px',
        left: '0px'
    },

    methods: {
        setMenu: function(top, left) {
          
            largestHeight = window.innerHeight - this.$$.right.offsetHeight - 25;
            largestWidth = window.innerWidth - this.$$.right.offsetWidth - 25;

            if (top > largestHeight) top = largestHeight;

            if (left > largestWidth) left = largestWidth;

            this.top = top + 'px';
            this.left = left + 'px';
        },

        closeMenu: function() {
            this.viewMenu = false;
        },

        openMenu: function(e) {
            this.viewMenu = true;

            Vue.nextTick(function() {
                this.$$.right.focus();

                this.setMenu(e.y, e.x)
            }.bind(this));
            e.preventDefault();
        }
    }
})
