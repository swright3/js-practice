/*Sends an async fetch request to the Quotable API and extracts the quote text and author from the response.*/
async function fetchQuote(url) {
    try {
        /*console.log(url)*/
        const res = await fetch(url)
        if (!res.ok) {throw `Response status code: ${res.status}`}
        const data = await res.json()
        document.getElementById('quote').innerText = data.content
        document.getElementById('name').innerText = data.author.toUpperCase()
    } catch(err) {
        console.log(err)
    }
}

/*Gets a list of all the tags that can be appended to the fetch request to change the search results of the
API call. Then it creates a list element for each one and appends them to the form in the options menu.*/
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

/*Appends the user's chosen tags to the end of the API url by extracting the input values from the options form.*/
function constructUrl() {
    const allTags = Array.from(document.getElementsByName('tags'))
    const selectedTags = allTags.filter(tag => tag.checked)
    var url = 'https://api.quotable.io/random'
    if (selectedTags.length > 0) {
        url += '?tags='
        return selectedTags.reduce((newUrl,tag) => newUrl.concat(tag.value).concat('|'), url).slice(0,-1)
    }
    return url
}

/*Toggles the options menu on and off the screen by adding and removing css classes. options is the menu
itself and darkener is the filter that applies to the rest of the screen.*/
function optionsMenuToggle() {
    const darkener = document.getElementById('darkener')
    if (darkener.matches('.darkener-visible')) {
        darkener.classList.remove('darkener-visible')
        darkener.classList.add('darkener-invisible')
    } else {
        darkener.classList.remove('darkener-invisible')
        darkener.classList.add('darkener-visible')
    }
    const options = document.querySelector('.options')
    if (options.matches('.options-appear')) {
        options.classList.remove('options-appear')
        options.classList.add('options-disappear')
    } else {
        options.classList.add('options-appear')
        options.classList.remove('options-disappear')
    }
}

/*Only runs once the dom and the styles have loaded.*/
window.addEventListener('load', () => {
    /*Populates the tags part of the options menu.*/
    fetchTags()

    /*When user clicks new quote button, a request is sent using the tags the user has/hasn't selected.*/
    const newQuoteButton = document.getElementById('newQuote')
    newQuoteButton.addEventListener('click', () => {
        const apiUrl = constructUrl()
        fetchQuote(apiUrl)
    })

    /*When the user clicks the cog in the bottom right, the options menu will be displayed.*/
    const optionsButton = document.getElementById('optionsButton')
    optionsButton.addEventListener('click', optionsMenuToggle)
    const exitOptionsButton = document.querySelector('.submitOptions')
    exitOptionsButton.addEventListener('click', optionsMenuToggle)

    /*Implements show/hide tag functionality in the options menu.*/
    const tagContainer = document.querySelector('.outerTagContainer')
    tagContainer.classList.remove('no-transition')
    const toggleTagButton = document.getElementById('toggleTags')
    toggleTagButton.addEventListener('click', () => {
        const toggleTagButtonSpan = document.querySelector('.arrow')
        const tagContainer = document.querySelector('.outerTagContainer')
        if (tagContainer.matches('.hidden')) {
            tagContainer.classList.remove('hidden')
            toggleTagButtonSpan.innerText = 'ᐯ Hide'
        } else {
            tagContainer.classList.add('hidden')
            toggleTagButtonSpan.innerText = 'ᐳ Show'
        }
    })

    /*Implements changing the background image depending on which one the user selects.*/
    const themeButtonContainer = document.querySelector('.themeContainer')
    const themeButtons = themeButtonContainer.children
    for (const button of themeButtons) {
        button.addEventListener('click', (event) => {
            const body = document.getElementsByTagName('body')[0]
            body.classList.remove(...body.classList)
            body.classList.add(event.target.id)
            const themeButtonContainer = document.querySelector('.themeContainer')
            const themeButtons = themeButtonContainer.children
            for (const button of themeButtons) {
                if (button.classList.contains('selectedTheme')) {
                    button.classList.remove('selectedTheme')
                }
                if (button.getAttribute('id') === event.target.id) {
                    button.classList.add('selectedTheme')
                    const attribution = document.querySelector('.attributionName')
                    attribution.innerText = event.target.alt
                }
            }
        })
    }
})