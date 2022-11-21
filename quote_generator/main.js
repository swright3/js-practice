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
        const optionsForm = document.getElementById('optionsForm')
        for (const tag of data) {
            const tagContainer = document.createElement('div')
            tagContainer.classList.add('tagContainer')
            const newTagInput = document.createElement('input')
            newTagInput.setAttribute('type', 'checkbox')
            newTagInput.setAttribute('name', 'tags')
            newTagInput.classList.add('tag')
            newTagInput.setAttribute('value', tag.name)
            newTagInput.setAttribute('id', `${tag.name}Tag`)
            const newTagLabel = document.createElement('label')
            newTagLabel.classList.add('tagLabel')
            newTagLabel.innerText = tag.name
            newTagLabel.setAttribute('for', `${tag.name}Tag`)
            tagContainer.append(newTagInput, newTagLabel)
            optionsForm.appendChild(tagContainer)
        }
    } catch(err) {
        console.log(err)
    }
}

function logTags(tags) {
    console.log(tags.length)
    for (const tag of tags) {
        console.log(tag.name)
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const newQuoteButton = document.getElementById('newQuote')
    newQuoteButton.addEventListener('click', fetchQuote)

    const optionsForm = document.getElementById('optionsForm')

    fetchTags()

    optionsForm.addEventListener('submit', (event) => {
        event.preventDefault()
        fetchQuote()
    })
})