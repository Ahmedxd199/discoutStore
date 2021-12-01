// cart 
let cart = [];

// getting the products
class Products {
    async getProducts() {
        try {
            let result = await fetch("js/products.json");
            let data = await result.json();
            let products = data.items;
            products = products.map(item => {
                const { title, price } = item.fields;
                const { id } = item.sys;
                const image = item.fields.image.fields.file.url;
                return { title, price, id, image }
            })
            return products;
        } catch (error) {
            console.log(error);

        }
    }
}
//display product
class UI {
    displayProducts(products) {
        let result = "";
        products.forEach(product => {
            result += `
                <div class="product">
                    <div class="product-content">
                        <div class="product-img">
                            <img src=${product.image} alt="product image">
                        </div>
                        <div class="product-btns">
                            <button class="btn-cart" data-id=${product.id}> 
                                add to cart
                                <span><i class = "fas fa-shopping-cart"></i></span>
                            </button>
                            <button type = "button" class = "btn-buy" id=${product.id} onclick="setData(this);"> More
                                </button>
                        </div>
                    </div>

                    <div class="product-info">
                        <div class="product-info-top">
                            <h2 class="sm-title"></h2>
                            <div class="rating">
                                <span><i class="fas fa-star"></i></span>
                                <span><i class="fas fa-star"></i></span>
                                <span><i class="fas fa-star"></i></span>
                                <span><i class="fas fa-star"></i></span>
                                <span><i class="far fa-star"></i></span>
                            </div>
                        </div>
                        <a href="#" class="product-name">${product.title}</a>
                        <p class="product-price">$ ${product.price}</p>
                        
                    </div>
                </div>`;
        });
        document.getElementById("mydata").innerHTML = result;
    }

    getBagButtons() {
        const buttons = [...document.querySelectorAll(".btn-cart")];
        buttons.forEach(button => {
            let id = button.dataset.id;
            let inCart = cart.find(product => product.id === id);
            if (inCart) {
                button.innerText = "In cart";
                button.disabled = true;
            }

            button.addEventListener('click', (event) => {
                event.target.innerText = "In cart";
                event.target.disabled = true;
                //get product from products
                let cartItem = { ...Storage.getProduct(id), amount: 1 };
                //add product to the cart
                cart = [...cart, cartItem];
                //save cart in local storage
                Storage.saveCart(cart);
            });
        });
    }
    
}

//local storage 
class Storage {
    static saveProducts(products) {
        localStorage.setItem("products", JSON.stringify(products));
    }

    static getProduct(id) {
        let products = JSON.parse(localStorage.getItem('products'));
        return products.find(product => product.id === id);
    }
    static saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart))
    }

}

document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const products = new Products();
    //get all products
    products.getProducts().then(products => {
        ui.displayProducts(products)
        Storage.saveProducts(products);
    }).then(() => {
        ui.getBagButtons();
        // ui.cartLogic();
    });
});





function setData(datax , check) {

 //   console.log(datax.id);
    fetch('js/products.json')
        .then(function (response) {
            return response.json();

        })
        .then(function (data) {
            //console.log(data);
            var res = data.items;
  //          console.log(res);

            
            for (let x in res) {
                if (x == datax.id) {
                    localStorage.setItem("product_id", res[x].sys.id);
                    localStorage.setItem("product_name", res[x].fields.title);
                    localStorage.setItem("product_price", res[x].fields.price);
                    localStorage.setItem("product_image", res[x].fields.image.fields.file.url);
                    window.open('product20Log.html', '_self');
                }
            }
        })
}




function getData() {
    if (localStorage.product_name) {
        prodN = localStorage.getItem("product_name");
        document.getElementById('name').innerHTML = prodN;
        //document.getElementById('prodName').value = prodN;
        // document.getElementById("un").value = localStorage.getItem("user");
    }
    if (localStorage.product_price) {
        prodP = localStorage.getItem("product_price");
        document.getElementById('price').innerHTML ="$"+prodP;
        // document.getElementById("un").value = localStorage.getItem("user");
    }
    if (localStorage.product_image) {
        prodImg = localStorage.getItem("product_image");
        document.getElementById('img').innerHTML = `<img src='${prodImg}' style="height:200px" align="center" >`;
        // document.getElementById("un").value = localStorage.getItem("user");
    }
}
getData();
 