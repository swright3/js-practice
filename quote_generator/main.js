async function fetchQuote() {
    try {
        const res = await fetch('https://api.quotable.io/random')
        if (!res.ok) {throw `Response status code: ${res.status}`}
        const data = await res.json()
        document.getElementById('quote').innerText = data.content
        document.getElementById('name').innerText = data.author.toUpperCase()
    } catch(err) {
        console.log(err)
    }
}

const button = document.getElementById('newQuote')
button.addEventListener('click', fetchQuote)
