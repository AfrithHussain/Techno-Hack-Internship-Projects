const apiKey = '53225da27932f217de70fd1a';


fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/codes`)
    .then(response => response.json())
    .then(data => {
        const fromCurrency = document.getElementById('fromCurrency');
        const toCurrency = document.getElementById('toCurrency');
        
        data.supported_codes.forEach(code => {
            const option1 = document.createElement('option');
            const option2 = document.createElement('option');
            option1.value = option2.value = code[0];
            option1.textContent = option2.textContent = code[0] + ' - ' + code[1];
            fromCurrency.appendChild(option1);
            toCurrency.appendChild(option2);
        });
    });

function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    if (!amount || isNaN(amount)) {
        alert('Please enter a valid amount');
        return;
    }

    fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}/${amount}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('result').textContent = `${amount} ${fromCurrency} = ${data.conversion_result} ${toCurrency}`;
        })
        .catch(error => {
            console.error('Error fetching the conversion data:', error);
            alert('Failed to convert currency.');
        });
}
