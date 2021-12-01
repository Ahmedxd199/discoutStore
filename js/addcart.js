

class Storage {
    static saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart))
    }
}

let prd_bttn = document.getElementById("addCart")
let cart = []
prd_bttn.addEventListener('click', (event) => {
    event.target.innerText = "In cart";
    event.target.disabled = true;
    //get product from products
    let prd_price = localStorage.getItem("product_price")
    let prd_image = localStorage.getItem("product_image")
    let prd_name = localStorage.getItem("product_name")
    let prd_id = localStorage.getItem("product_id")
    let arrT = new Object();
    arrT = {id: prd_id,image: prd_image , price:prd_price, title: prd_name}
    let test45 = {...arrT}

    //add product to the cart
    cart = [...cart, test45];

    //add product to cart
    // cart.push(temp)
    // save cart in local storage
    Storage.saveCart(cart);
});

function getData() {
    if (localStorage.product_name) {
        prodN = localStorage.getItem("product_name");
        document.getElementById('name').innerHTML = prodN;
        //document.getElementById('prodName').value = prodN;
        // document.getElementById("un").value = localStorage.getItem("user");
    }
    if (localStorage.product_price) {
        prodP = localStorage.getItem("product_price");
        document.getElementById('price').innerHTML = "$" + prodP;
        // document.getElementById("un").value = localStorage.getItem("user");
    }
    if (localStorage.product_image) {
        prodImg = localStorage.getItem("product_image");
        document.getElementById('img').innerHTML = `<img src='${prodImg}' style="height:200px" align="center" >`;
        // document.getElementById("un").value = localStorage.getItem("user");
    }
}

getData();


