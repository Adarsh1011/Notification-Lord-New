const sgMail = require('@sendgrid/mail');
const SENDGRID_API_KEY = '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';
sgMail.setApiKey(SENDGRID_API_KEY);

async function fillTable(newProduct) {
    chrome.storage.local.get(['key'], function (res) {
        products = res.key;

        console.log(newProduct);

        if (!products) {
            products = [];
        }

        if (newProduct) {
            products.push(newProduct);
        }

        console.log(products);

        chrome.storage.local.set({ key: products }, function () {
            console.log("storage saved");
        });
    });
}

chrome.runtime.onMessage.addListener(
    function (product, sender, sendResponse) {

        let newProduct = {
            price: product.productPrice,
            link: sender.tab.url,
            name: product.productName
        }

        fillTable(newProduct);
        sendResponse();
    }
);

function checkPrices() {
    chrome.storage.local.get(['key'], function (res) {
        let allProducts = res.key;

        for (let i = 0; i < allProducts.length; ++i) {
            let p = allProducts[i];
            let url = p.link;

            fetch(url)
                .then(res => { return res.text(); })
                .then(res => {
                })
                .catch(err => console.log(err));


            // axios.get(url)
            //     .then(res => {
            // const $ = cheerio.load(JSON.stringify(res.request));
            //         console.log($);
            // let ourPrice = $('#priceblock_ourprice').text().trim();
            // console.log(ourPrice);
            //         // let dealPrice = $('#priceblock_dealprice').text().trim();
            //         // let expectedPrice = parseInt(p.price);
            //         // let curPrice = (dealPrice ? dealPrice : ourPrice);
            //         // curPrice = curPrice.split('.')[0];
            //         // curPrice = parseInt(curPrice.replace(/\D/g, ''));

            //         // if (curPrice <= expectedPrice) {
            //         //     console.log('Low Price');
            //         // }
            //     })
            //     .catch(err => console.log(err));
        }
    })
}

checkPrices();