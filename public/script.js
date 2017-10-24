new Vue({
    el: '#app',
    data: {
        total: 0,
        items: [],
        cart: [],
        newSearch: 'Anime',
        lastSearch: '',
        searching: false,
        searched: false,
        price: 5
    },
    methods: {
        addItem: function (index) {
            //this.total = 0;
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
            /*for (var u = 0; u < this.cart.length; u++) {
                this.total += this.cart[i].price * this.cart[i].quantity;
            }*/
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
            this.items = [];
            this.searching = true;
            this.$http.get('/search/'
                .concat(this.newSearch))
                .then(function (res) {
                    this.items = res.data;
                    this.searching = false;
                });
            this.lastSearch = this.newSearch;
            this.searched = true;
        }
    },
    filters: {
        currency: function (price) {
            return '$'.concat(price.toFixed(2));
        }
    },
    mounted: function () {
        this.onSubmit();
    }
});