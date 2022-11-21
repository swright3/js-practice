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

async function fetchTags() {
    try {
        const res = await fetch('https://api.quotable.io/tags')
        if (!res.ok) {throw `Response status code: ${res.status}`}
        const data = await res.json()
    } catch(err) {
        console.log(err)
    }
}

function logTags(tags) {
    for (const tag of tags) {
        console.log(tag.name)
    }
}

fetchTags()

const button = document.getElementById('newQuote')
button.addEventListener('click', fetchQuote)
