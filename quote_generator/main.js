function fetchQuote() {
    fetch('https://api.quotable.io/random')
    .then(res => res.json())
    .then(data => {
        document.getElementById('quote').innerText = data.content
        document.getElementById('name').innerText = data.author.toUpperCase()
    })
    .catch(err => console.log(err))
}

const button = document.getElementById('newQuote')
button.addEventListener('click', fetchQuote)
