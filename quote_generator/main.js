async function fetchQuote(url) {
    try {
        console.log(url)
        const res = await fetch(url)
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
        const outerTagContainer = document.querySelector('.outerTagContainer')
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
            outerTagContainer.appendChild(tagContainer)
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

function constructUrl() {
    const allTags = Array.from(document.getElementsByName('tags'))
    const selectedTags = allTags.filter(tag => tag.checked)
    if (selectedTags.length > 0) {
        const url = 'https://api.quotable.io/random?tags='
        return selectedTags.reduce((newUrl,tag) => newUrl.concat(tag.value).concat('|'), url).slice(0,-1)
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const newQuoteButton = document.getElementById('newQuote')
    newQuoteButton.addEventListener('click', () => fetchQuote('https://api.quotable.io/random'))

    const optionsForm = document.getElementById('optionsForm')
    fetchTags()
    optionsForm.addEventListener('submit', (event) => {
        event.preventDefault()
        const apiUrl = constructUrl()
        fetchQuote(apiUrl)
    })

    const options = document.getElementById('options')
    options.classList.add('options')
    options.classList.add('offpage')
    options.classList.remove('invisible')
    const optionsButton = document.getElementById('optionsButton')
    optionsButton.addEventListener('click', () => {
        const options = document.querySelector('.options')
        options.matches('.offpage') 
            ? options.classList.remove('offpage')
            : options.classList.add('offpage')
    })

    const toggleTagButton = document.getElementById('toggleTags')
    toggleTagButton.addEventListener('click', () => {
        const tagContainer = document.querySelector('.outerTagContainer')
        tagContainer.matches('.hidden') 
            ? tagContainer.classList.remove('hidden')
            : tagContainer.classList.add('hidden')
    })
})