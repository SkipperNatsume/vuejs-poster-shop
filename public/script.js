var LOAD_NUM = 10;
new Vue({
    el: '#app',
    data: {
        total: 0,
        items: [],
        cart: [],
        results: [],
        newSearch: 'fluffy',
        lastSearch: '',
        searching: false,
        searched: false,
        price: 5
    },
    methods: {
        addItem: function (index) {
            var item = this.items[index];
            var found = false;
            for (var i = 0; i < this.cart.length; i++) {
                if (this.cart[i].id === item.id) {
                    this.cart[i].quantity++;
                    found = true;
                    break;
                }
            }
            if (!found) {
                this.cart.push({
                    id: item.id,
                    title: item.title,
                    price: this.price,
                    quantity: 1
                });
            }
            this.total += this.price;
        },
        inc: function (product) {
            product.quantity++;
            this.total += this.price;
        },
        dec: function (product) {
            product.quantity--;
            this.total -= this.price;
            if (product.quantity <= 0) {
                for (var i = 0; this.cart.length; i++) {
                    if (this.cart[i].id === product.id) {
                        this.cart.splice(i, 1);
                        break;
                    }
                }
            }
        },
        onSubmit: function () {
            if (this.newSearch.length) {
                this.items = [];
                this.searching = true;
                this.$http.get('/search/'
                    .concat(this.newSearch))
                    .then(function (res) {
                        this.results = res.data;
                        this.appendItems();
                        this.searching = false;
                    });
                this.lastSearch = this.newSearch;
                this.searched = true;
            }
        },
        appendItems: function () {
            if (this.items.length < this.results.length) {
                var append = this.results.slice(this.items.length, this.items.length + LOAD_NUM);
                this.items = this.items.concat(append);
            }
        }
    },
    computed: {
        noMoreItems: function () {
            return this.results.length === this.items.length && this.results.length > 0
        }
    },
    filters: {
        currency: function (price) {
            return '$'.concat(price.toFixed(2));
        }
    },
    mounted: function () {
        this.onSubmit();
        var self = this;
        var bottomElement = document.getElementById('product-list-bottom')
        var watcher = scrollMonitor.create(bottomElement);
        watcher.enterViewport(function () {
            self.appendItems();
        });
    }
});

