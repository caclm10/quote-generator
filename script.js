function showNotif(message, type) {
    const notif = {
        container: document.getElementById(`notif-container`),
        content: document.getElementById(`notif-content`)
    }

    notif.container.classList.add(`notif-container-${type}`)
    notif.container.classList.add('show')
    notif.content.textContent = message
}

function listenCloseNotif() {
    const btn = document.getElementById(`notif-close-button`)
    const notifContainer = document.getElementById(`notif-container`)

    btn.addEventListener('click', () => {
        notifContainer.classList.remove('show')
    })
}

function runButton() {
    const buttons = document.querySelectorAll(`button`)

    for (const button of buttons) {
        const box = button.getBoundingClientRect()

        button.addEventListener('click', event => {
            const buttonPos = {
                left: box.left + window.scrollX + document.documentElement.clientLeft,
                top: box.top + window.scrollY + document.documentElement.clientTop,
            }

            const relative = {
                x: event.pageX - buttonPos.left,
                y: event.pageY - buttonPos.top
            }

            const ripple = document.createElement('span')
            ripple.classList.add('ripple')
            ripple.style.left = `${relative.x}px`
            ripple.style.top = `${relative.y}px`

            button.appendChild(ripple)

            setTimeout(() => {
                ripple.remove()
            }, 900)
        })
    }
}

async function fetchQuote() {
    const url = `https://api.quotable.io/random`

    const resp = await fetch(url)

    if (!resp.ok) throw resp

    const { author, content } = await resp.json()

    return { author, content }
}

async function generateQuote() {
    const loaderContainer = document.getElementById(`loader-container`)

    loaderContainer.classList.add('show')
    try {
        const { author, content } = await fetchQuote()

        document.getElementById(`author-name`).textContent = author
        document.getElementById(`quote-content`).textContent = content
    } catch (error) {
        showNotif(error.message, 'error')
    }
    loaderContainer.classList.remove('show')
}

window.addEventListener('DOMContentLoaded', () => {
    const newQuoteButton = document.getElementById(`new-quote-button`)

    runButton()

    listenCloseNotif()

    generateQuote()

    newQuoteButton.addEventListener('click', generateQuote)
})