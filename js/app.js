const toggleBtn = document.querySelector(".cart-toggle");
const closeBtn = document.querySelector(".close-btn");
const sidebar = document.querySelector(".sidebar");

function addProductToCart(content, item) {
    content.querySelector('.product-name').textContent = item.querySelector(".product-name").textContent;
    content.querySelector('.product-price').textContent = item.querySelector(".product-price").textContent;
    content.querySelector('.product-img img').setAttribute('src', item.querySelector(".product-img").getAttribute('src'));
    return content;

}

// ==============================
(function() {
    toggleBtn.addEventListener("click", function() {
        sidebar.classList.toggle("show-sidebar");
    });

    closeBtn.addEventListener("click", function() {
        sidebar.classList.remove("show-sidebar");
    });

    // ********** close links ************
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

    let content = document.getElementById("cartItem").content;
    const addToCarts = document.getElementsByClassName("add-to-cart");

    // for (let i=0; i<addToCarts.length; i++) {
    //     addToCarts[i].addEventListener('click', function(){
    //         document.querySelector('.cart-items').append(document.importNode(content, true));
    //     })
    // }
    const template = document.getElementById("cartItem").content;
    for (let i = 0; i < addToCarts.length; i++) {
        addToCarts[i].addEventListener('click', function(e) {
            let item = e.target.closest('.product');
            let content = addProductToCart(template, item);
            document.querySelector('.cart-items').append(document.importNode(content, true));
        })
    }
})();