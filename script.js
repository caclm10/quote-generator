const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.querySelector('.loader')

let quote = null

const toggleLoading = () => {
    loader.classList.toggle('hidden')
    quoteContainer.classList.toggle('hidden')
}

const printQuote = () => {
    authorText.textContent = quote.author
    quoteText.textContent = quote.content

    if (quote.content.length > 120) quoteText.classList.add('long-quote')
    else quoteText.classList.remove('long-quote')
}

const tweetQuote = () => {
    const twiterURL = `https://twitter.com/intent/tweet?text=${quote.content} - ${quote.author}`
    window.open(twiterURL, '_blank')
}

// Get quotes from API
const getQuote = async () => {
    const url = `https://api.quotable.io/random`

    toggleLoading()
    try {
        const resp = await fetch(url)

        if (!resp.ok) throw resp

        quote = await resp.json()

        if (twitterBtn.disabled) twitterBtn.disabled = false
    } catch (error) {
        switch (error.status) {
            case undefined:
                quote = {
                    content: 'Something went wrong, please try again later.',
                    author: ''
                }
                break;

            default:
                quote = {
                    content: error.statusText + '.',
                    author: error.status
                }
                break;
        }
        twitterBtn.disabled = true
    }
    printQuote()
    toggleLoading()
}

getQuote()

newQuoteBtn.addEventListener('click', getQuote)
twitterBtn.addEventListener('click', tweetQuote)