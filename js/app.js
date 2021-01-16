'use strict'

//============ Хранилище ============
class Storage {
    static saveProducts(products) {
        localStorage.setItem("products", JSON.stringify(products));
    }

    static getProduct(id) {
        let product = JSON.parse(localStorage.getItem('products'));
        return product.find(product => product.id == +(id));
    }
    static saveCart(cart) {
        localStorage.setItem("basket", JSON.stringify(cart));
    }
    static getCart() {
        return localStorage.getItem("basket") ? JSON.parse(localStorage.getItem("basket")) : []; // ? если JSON.parse есть то он его возвращает
    }
}

class Product {
    getProducts() {
        return products.map(item => {
            const name = item.name;
            const price = item.price;
            const id = item.id;
            const image = item.image;
            return { id, name, price, image };
        });
    }
}

//===== Класс App ================
class App {
    cart = []; // публичный массив
    cartItems = document.querySelector(".cart-items"); // <div class - в html файле
    clearCart = document.querySelector(".clear-cart"); // <div class - в html файле
    socialGroup = [{
            liClass: '',
            aClass: 'footer-link twitter',
            icon: 'fab fa-twitter',
            capture: ' Twitter'
        },
        {
            liClass: '',
            aClass: 'footer-link facebook',
            icon: 'fab fa-facebook',
            capture: ' Facebook'
        },
        {
            liClass: '',
            aClass: 'footer-link instagram',
            icon: 'fab fa-instagram',
            capture: ' Instagram'
        },
        {
            liClass: '',
            aClass: 'footer-link google-plus',
            icon: 'fab fa-google-plus',
            capture: ' Google'
        },
    ];
    sidebar = document.querySelector(".sidebar");

    constructor() {
        //========================= открыть/закрыть боковую панель ==========================
        const toggleBtn = document.querySelector(".cart-toggle");
        const closeBtn = document.querySelector(".close-btn");


        toggleBtn.addEventListener("click", () => this.openCart());
        closeBtn.addEventListener("click", () => this.closeCart());

        document.querySelector('footer div.row').lastElementChild.innerHTML =
            this.makeLiGroup(this.socialGroup, 'list-unstyled footer-social social-icon', '<h6 class="text-uppercase ">Social media</h6>');

        let data = new Product();
        Storage.saveProducts(data.getProducts());
        this.cart = Storage.getCart();
    }
    openCart() {
        document.querySelector('.overlay').classList.add('active');
        this.sidebar.classList.toggle("show-sidebar");
        this.cartItems.innerHTML = '';
        this.cart = Storage.getCart();

        this.populateCart(this.cart);
        this.setCartTotal(this.cart);
    };

    closeCart() {
        this.sidebar.classList.remove("show-sidebar");
        document.querySelector('.overlay').classList.remove('active');
    };

    populateCart(cart) {
        cart.forEach(item => this.addCartItem(item));
    }
    navbarToggle() {
        //====================== Управление динамикой хедера =============================
        const navToggle = document.querySelector(".nav-toggle");
        const linksContainer = document.querySelector(".links-container");
        const links = document.querySelector(".links");

        navToggle.addEventListener("click", function() {
            const linksHeight = links.getBoundingClientRect().height;
            const containerHeight = linksContainer.getBoundingClientRect().height;
            if (containerHeight === 0) {
                linksContainer.style.height = `${linksHeight}px`;
            } else {
                linksContainer.style.height = 0;
            }
        });
    }
    makeShowcase(products) {
        let result = '';
        products.forEach((item) => {
            result += this.createProductMarkup(item);
        });
        document.querySelector('.showcase').innerHTML = result;
    }
    makeLiGroup = (group, ulClass, header = '') => {
        let lis = '';
        group.forEach(function(item) {
            lis += `<li class = "${item.liClass}">
                            <a class="${item.aClass}" href="#">
                                <i class="${item.icon}"></i>${item.capture}
                            </a>
                        </li>
                `;
        });
        return `
                ${header}
                <ul class="${ulClass}">
                    ${lis}
                </ul>
           `;
    }


    createProductMarkup(data) {
            const overlayGroup = [{
                    liClass: 'list-inline-item m-0 p-0 like-this',
                    aClass: 'btn btn-sm btn-outline-dark',
                    icon: 'fas fa-heart',
                    capture: ''
                },
                {
                    liClass: 'list-inline-item m-0 p-0 add-to-cart',
                    aClass: 'btn btn-sm btn-outline-dark',
                    icon: 'fas fa-dolly-flatbed',
                    capture: 'Add to cart'
                },
                {
                    liClass: 'list-inline-item m-0 p-0 add-to-cart',
                    aClass: 'btn btn-sm btn-outline-dark',
                    icon: 'fas fa-expand',
                    capture: ''
                }
            ]
            return `
                <div class="col-xl-3 col-lg-4 col-sm-6  cart-item">
                    <div class="product text-center" data-id="${data.id}">
                        <div class="position-relative mb-3">
                            <a href="detail.html" class="d-block">
                                <img src="${data.image}" alt="${data.name}" class="img-fluid w-100 product-img">
                            </a>
                            <div class="product-overlay">
                            ${this.makeLiGroup(overlayGroup, "mb-0 list-inline")}
                            </div>
                        </div>
                        <h6>
                            <a href="detail.html" class="reset-anchor product-name">${data.name}</a>
                        </h6>
                        <p class="small text-muted product-price" data-price=${data.price}>${data.price}</p>
                    </div>
                </div> 
                `;
        }
        //============================ Добавление товара в корзину

    getProduct = (id) => products.find(product => product.id === +(id));
    addToCart() {
        // три точки (...) спред оператор - мы можем не знать сколько елементов хранится в коллекции и браузер выполнит конвертацию колекции в массив
        const addToCartButtons = [...document.querySelectorAll(".add-to-cart")];
        addToCartButtons.forEach(button => {
            button.addEventListener('click', event => {

                let product = this.getProduct(event.target.closest('.product').getAttribute('data-id'));
                let exist = this.cart.some(elem => elem.id === product.id);
                if (exist) {
                    this.cart.forEach(elem => {
                        if (elem.id === product.id) {
                            elem.amount += 1;
                        }
                    })
                } else {
                    let cartItem = {...product, amount: 1 };
                    this.cart = [...this.cart, cartItem];
                }
                // this.addCartItem(cartItem); меняем на новый
                Storage.saveCart(this.cart);
                this.setCartTotal(this.cart);
            });
        });
    }

    clear() {
        this.cart = []; //обнуляет корзину
        while (this.cartItems.children.length > 0) { // запускает цыкл если есть дети
            this.cartItems.removeChild(this.cartItems.children[0]);
        }
        this.setCartTotal(this.cart);
        Storage.saveCart(this.cart);
    };
    //=============== Сумма товаров в корзине и их цены ================
    setCartTotal(cart) {
            let tempTotal = 0;
            let itemsTotal = 0;

            cart.map(item => {
                tempTotal += item.price * item.amount;
                itemsTotal += item.amount;
            })
            document.querySelector('.cart-total').textContent = parseFloat(tempTotal.toFixed(2));
            document.querySelector('.count-items').textContent = itemsTotal;
        }
        //============================= Фильтр/Поиск
    filterItem = (cart, currentItem) => cart.filter(item => item.id !== +(currentItem.dataset.id));
    findItem = (cart, currentItem) => cart.find(item => item.id === +(currentItem.dataset.id));
    //================================= Макет товара в корзине
    addCartItem(item) {
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.setAttribute('id', item.id);
        div.innerHTML = `
        <div class="picture product-img">
                <img src="${item.image}" alt="${item.name}" class="img-fluid w-100" style="width: 200px;">
            </div>
            <div class="product-name p-auto">${item.name}</div>
            <div class="remove-btn text-right">
                <a class="reset-anchor m-auto" href="#">
                    <i class="fas fa-trash-alt" data-id=${item.id}></i>
                </a>
            </div>
            <div class="quantity">
                <div class="border d-flex justify-content-around mx-auto">
                    <i class="fas fa-caret-left inc-dec-btn" data-id=${item.id}></i>
                    <span class="border-1 p-1 amount">${item.amount}</span>
                    <i class="fas fa-caret-right inc-dec-btn" data-id=${item.id}></i>
                </div>
            </div>
            <div class="price">
                $<span class="product-price">${item.price}</span>
            </div>
        `;
        this.cartItems.appendChild(div);
    }


    //============================= Обработка товара
    renderCart() {

        this.clearCart.addEventListener('click', () => this.clear()); // удалить товары кнопкой очистить корзину
        this.cartItems.addEventListener('click', event => {
            // Удалить елемент в корзине при нажатии на иконку мусорного ведра
            if (event.target.classList.contains('fa-trash-alt')) {
                this.cart = this.filterItem(this.cart, event.target);
                this.setCartTotal(this.cart);
                Storage.saveCart(this.cart);
                this.cartItems.removeChild(event.target.parentElement.parentElement.parentElement);
                // Увеличить количество товаров на +1 при нажатии на стрелку вправо
            } else if (event.target.classList.contains('fa-caret-right')) {
                let tempItem = this.findItem(this.cart, event.target);
                tempItem.amount = tempItem.amount + 1;
                this.setCartTotal(this.cart);
                Storage.saveCart(this.cart);
                event.target.previousElementSibling.innerText = tempItem.amount;



                // Уменьшить количество товаров на -1 при нажатии на стрелку вправо
            } else if (event.target.classList.contains('fa-caret-left')) {
                let tempItem = this.findItem(this.cart, event.target);
                tempItem.amount = tempItem.amount - 1;
                if (tempItem.amount > 0) {
                    event.target.nextElementSibling.innerText = tempItem.amount;
                    // Удалить товар из корзины когда его значение уходит ниже нуля
                } else {
                    this.cart = this.filterItem(this.cart, event.target);
                    this.cartItems.removeChild(event.target.parentElement.parentElement.parentElement);
                };
                this.setCartTotal(this.cart);
                Storage.saveCart(this.cart);
            }
        })
    };

}
// ==============================
(function() {
    const app = new App();

    //app.makeCarousel - Добавить карусель
    app.makeShowcase(products); // Формирует список продуктов на странице
    app.addToCart(); // Добавляет товары в корзину
    app.renderCart(); // Обрабатывает данные в корзине

})();