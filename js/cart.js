document.addEventListener("DOMContentLoaded", () => {
    let test = JSON.parse(window.localStorage.getItem('cart'));
    let result = test.map(a => a.price);
    var sum = result.reduce(function (a, b) {
        return a + b;
    }, 0);

    let cartD = ""
    test.forEach(x => {
        cartD += `<div class="product">
        <img src="${x.image}">
        <div class="product-info" data-id = ${x.id}>
            <h3 class="product-name">${x.title}</h3>
            <h4 class="product-price">$ ${x.price}</h4>
            
            <p class="product-quantity">Qnt: <input onblur="qnt1(${x.price})" value="${x.amount}" name="qnt">
            <p class="product-remove">
                <i class="fa fa-trash" aria-hidden="true"></i>
                <span class="remove"data-id1 = ${x.id}>Remove</span>
            </p>
        </div>
    </div>`
    });
    cartT = ""

    cartT = `
    <p>
        <span>Total Price</span>
        <span id="total_price">$ ${sum}</span>
    </p>
    <p>
        <span>Number of Items</span>
        <span id="total_amount"> ${test.length}  </span>
    </p>
    <a href="#"  onclick="alert('Thank you')">Proceed to Checkout</a>
    <br>
    <a href="#" onclick="clearlist()">Clear List</a>`
    document.getElementById("total").innerHTML = cartT
    document.getElementById("details").innerHTML = cartD
})



let qnt = document.getElementsByTagName("input")
console.log(qnt)
function clearlist() {
    window.localStorage.removeItem("cart")
    location.reload()
}
