new Vue({
    el: '#app',
    data: {
        total: 0,
        items: [{
            id: 1,
            title: 'Item 1',
            price: 10
        },
        {
            id: 2,
            title: 'Item 2',
            price: 11.11
        },
        {
            id: 3,
            title: 'Item 3',
            price: 12.22
        },
        {
            id: 4,
            title: 'Item 4',
            price: 13.33
        },
        {
            id: 5,
            title: 'Item 5',
            price: 14.44
        }
        ],
        cart: [],
        search: ' '
    },
    methods: {
        addItem: function (index) {
            this.total = 0;
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
                    price: item.price,
                    quantity: 1
                });
            }
            for (var i = 0; i < this.cart.length; i++) {
                this.total += this.cart[i].price * this.cart[i].quantity;
            }
        },
        inc: function (product) {
            product.quantity++;
            this.total += product.price;
        },
        dec: function (product) {
            product.quantity--;
            this.total -= product.price;
            if (product.quantity <= 0) {
                for (var i = 0; this.cart.length; i++) {
                    if (this.cart[i].id === product.id) {
                        this.cart.splice(i, 1);
                        break;
                    }
                }
            }
        },
        onSubmit: function(){
            console.log(this.search);
        }
    },
    filters: {
        currency: function (price) {
            return '$'.concat(price.toFixed(2));
        }
    }
});