let productName = document.querySelector('#productTitle').textContent.trim();

let ourPrice = document.querySelector('#priceblock_ourprice');
let dealPrice = document.querySelector('#priceblock_dealprice')
let productPrice;

if (dealPrice) {
    productPrice = dealPrice.textContent.trim();
} else {
    productPrice = ourPrice.textContent.trim();
}

let btn = document.createElement("BUTTON");
btn.innerHTML = 'Add';
btn.style.backgroundColor = '#ff8d14';
btn.style.borderRadius = '10px';
btn.style.height = 'min-content';


document.querySelector('#productTitle').appendChild(btn);
btn.addEventListener("click", (e) => addProduct(e));

function addProduct(e) {
    let product = {
        productName: productName,
        productPrice: productPrice
    };

    console.log(product);

    chrome.runtime.sendMessage(product, (res) => {
        // console.log(res);
    });
}