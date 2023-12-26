const purchasePriceIp = document.querySelector('.purchase-price');
const stockQuantityIp = document.querySelector('.stock-quantity');
const currentPriceIp = document.querySelector('.current-price');
const main = document.querySelector('.main');
const btnCheck = document.querySelector('.btn-check');
const btnReset = document.querySelector('.btn-reset');
const message = document.querySelector('.message');
const progressBarContainer = document.querySelector('.progress-bar-container');
const progressBar = document.querySelector('.progress-bar');
let totalInvestedMoney = 0;

btnCheck.addEventListener('click', checkProfitLoss);
btnReset.addEventListener('click', resetFields);

function resetFields() {
    purchasePriceIp.value = '';
    stockQuantityIp.value = '';
    currentPriceIp.value = '';
    message.innerHTML = '';
    message.classList.remove('shake', 'fadeIn', 'error', 'profit', 'loss', 'no-gain-loss');
    progressBarContainer.style.display = 'none';
    main.classList.remove('profit-theme', 'gain-loss-theme', 'loss-theme');
    totalInvestedMoney = 0;
}

function checkProfitLoss(e) {
    let stockQuantity = stockQuantityIp.value;
    let purchasePrice = purchasePriceIp.value;
    let stockPrice = currentPriceIp.value;

    progressBarContainer.style.display = 'block';
    progressBar.style.width = '100%';

    setTimeout(() => {
        progressBarContainer.style.display = 'none';

        if (properValues(stockQuantity, purchasePrice, stockPrice)) {
            stockQuantity = Number(stockQuantity);
            purchasePrice = Number(purchasePrice);
            stockPrice = Number(stockPrice);

            const priceDifference = Math.abs(purchasePrice - stockPrice).toFixed(2);
            const profitLoss = (priceDifference * stockQuantity).toFixed(2);
            const profitLossPercentage = ((priceDifference / purchasePrice) * 100).toFixed(2);

            // Update total invested money
            totalInvestedMoney = purchasePrice * stockQuantity;

            if (purchasePrice > stockPrice) {
                message.className = 'message loss';
                message.innerHTML = `You lost ${profitLossPercentage}%.<br/>Your loss is: ${priceDifference} &#x20B9;/ stock.<br> Total loss is: ${profitLoss} &#x20B9;. <br>Total invested money: ${totalInvestedMoney} &#x20B9;`;

                if (profitLossPercentage > 50) {
                    changeTheme('loss-theme');
                } else {
                    changeTheme('gain-loss-theme');
                }
            } else if (purchasePrice < stockPrice) {
                message.className = 'message profit';
                message.innerHTML = `You gained ${profitLossPercentage}%.<br/>Your profit is: ${priceDifference} &#x20B9;/ stock. <br>Total profit is: ${profitLoss} &#x20B9;. <br>Total invested money: ${totalInvestedMoney} &#x20B9;`;

                if (profitLossPercentage > 50) {
                    changeTheme('profit-theme');
                } else {
                    changeTheme('gain-loss-theme');
                }
            } else {
                changeTheme('gain-loss-theme');
                message.className = 'message no-gain-loss';
                message.innerHTML = `You gained 0%.<br/>Your profit is: 0 &#x20B9;/ stock.<br> Total profit is: 0 &#x20B9;.<br> Total invested money: ${totalInvestedMoney} &#x20B9;`;
            }
        }
        message.classList.remove('shake');
        void message.offsetWidth;
        message.classList.add('shake', 'fadeIn');
        const result = `Your result message here...`;
        showModal(result);
    }, 2000);
}

function showModal(result) {
    const modal = document.querySelector('.modal');
    const modalMessage = modal ? modal.querySelector('.message') : null;

    if (modalMessage) {
        modalMessage.innerHTML = result;
        modal.style.display = 'block';

        window.onclick = function (event) {
            if (event.target === modal) {
                modal.style.display = 'none';
                modal.style.color = black;
            }
        };
    }
}

function properValues(stockQuantity, purchasePrice, stockPrice) {
    if (purchasePrice === '' || stockQuantity === '' || stockPrice === '') {
        message.className = 'message error';
        message.innerText = 'Please enter all the values';
        return false;
    } else if (Number.parseInt(stockQuantity) <= 0 || Number.parseInt(purchasePrice) <= 0 || Number.parseInt(stockPrice) <= 0) {
        message.className = 'message error';
        message.innerText = 'Please enter values greater than 0';
        return false;
    } else if (!Number.isInteger(Number(stockQuantity))) {
        message.className = 'message error';
        message.innerText = 'Please enter a valid value for quantity';
        return false;
    }
    return true;
}

function changeTheme(theme) {
    main.classList.remove('profit-theme', 'gain-loss-theme', 'loss-theme');
    main.classList.add(theme);
}
