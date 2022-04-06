const selectElements = document.querySelectorAll('select')
const input = document.querySelector('.val_input')
const output = document.querySelector('.val_output')
const btn = document.querySelector('button')

get_currencies()
async function get_currencies () {
    const resp = await fetch('https://api.frankfurter.app/currencies')
    const respData = await resp.json()

    show_to_dom(respData)
}

function show_to_dom (data) {
    const entries = Object.entries(data)
    for(let i = 0; i < entries.length; i++) {
        const option = document.createElement('option')
        option.value = `${entries[i][0]}`
        option.innerText = `${entries[i][0]}`

        selectElements[0].appendChild(option)
        selectElements[1].appendChild(option.cloneNode(option))
    }
}

btn.addEventListener('click', () => {
    let currency1 = selectElements[0].value;
    let currency2 = selectElements[1].value;
    let value = input.value;

    if (currency1 != currency2) {
        completeConversion(currency1, currency2, value)
    } else {
        const p = document.createElement('p')
        p.innerText = `ALERT: Choose a different currency`
        p.classList.add('alert')
        document.querySelector('.container').appendChild(p)
        setTimeout(() => {
            p.style.display = 'none'
        }, 3000)
    }
})

async function completeConversion(currency1, currency2, value) {
    const host = 'api.frankfurter.app'
    const resp = await fetch(`https://${host}/latest?amount=${value}&from=${currency1}&to=${currency2}`)
    const respData = await resp.json()
    output.value = Object.values(respData.rates)[0]
}