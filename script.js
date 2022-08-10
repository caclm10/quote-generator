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


window.addEventListener('DOMContentLoaded', () => {
    runButton()
})