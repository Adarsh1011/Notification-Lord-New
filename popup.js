var tbodyRef = document.querySelector('.table').getElementsByTagName('tbody')[0];
let products = [];

async function fillTable(newProduct) {
    let rowLength = 1;
    tbodyRef.innerHTML = '';
    let vis = new Map();

    chrome.storage.local.get(['key'], function (res) {
        products = res.key;

        if (newProduct) {
            products.push(newProduct);
        }

        if (products) {

            for (cur of products) {
                if (vis[cur.name] == true) continue;
                vis[cur.name] = 1;

                let newRow = tbodyRef.insertRow();
                newRow.scope = 'row';

                let fourthCol = newRow.insertCell(0);
                let deleteBtn = document.createElement('button');
                deleteBtn.innerHTML = 'Del';
                deleteBtn.addEventListener('click', (e) => deleteRow(e));
                fourthCol.appendChild(deleteBtn);

                let thirdCol = newRow.insertCell(0);
                let aTag = document.createElement('a');
                aTag.setAttribute('href', cur.link);
                aTag.innerText = cur.name;
                thirdCol.appendChild(aTag);

                let secondCol = newRow.insertCell(0);
                let secondColInput = document.createElement('input');
                cur.price = cur.price.split('.')[0];
                secondColInput.value = parseInt(cur.price.replace(/\D/g, ''));
                secondColInput.addEventListener('change', (e) => changePrice(e));
                secondCol.appendChild(secondColInput);

                let firstCol = newRow.insertCell(0);
                let firstColText = document.createTextNode(rowLength);
                firstCol.appendChild(firstColText);

                rowLength++;
            }
        }

        chrome.storage.local.set({ key: products }, function () {
            console.log("storage saved");
        });
    });
}

(async () => {
    await fillTable(null);
})()

async function deleteRow(e) {
    let curName = e.path[2].cells[2].innerText;
    console.log(curName);
    // redundant to remove
    // let td = e.target.parentNode;
    // let tr = td.parentNode;
    // tr.parentNode.removeChild(tr);

    chrome.storage.local.get(['key'], function (res) {
        let products = res.key;

        products = products.filter((e) => {
            return ((e.name != curName) && (curName != 'undefined'));
        })

        chrome.storage.local.set({ key: products }, function () {
            // console.log("storage saved");
            (async () => {
                await fillTable(null);
            })()
        });
    });
}

async function changePrice(e) {
    let newValue = e.target.value;
    let productName = e.path[2].cells[2].innerText;

    chrome.storage.local.get(['key'], function (res) {
        let products = res.key;

        for (let i = 0; i < products.length; ++i) {
            if (products[i].name == productName) {
                products[i].price = newValue;
            }
        }

        chrome.storage.local.set({ key: products }, function () {
            (async () => {
                await fillTable(null);
            })()
        })
    })
}