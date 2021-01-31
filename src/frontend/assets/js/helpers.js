export const baseUrl = 'http://localhost:3000'

export const backgroundColor = '#fff'

export const makeElement = (html, setElement, att = null) => {

    const newElement = document.createElement(html)

    if (att && att.setClass) newElement.setAttribute('class', att.setClass)
    if (att && att.setId) newElement.setAttribute('id', att.setId)
    if (att && att.setContent) newElement.textContent = att.setContent
    if (att && att.setData && att.dataValue)
        newElement.dataset[att.setData] = att.dataValue
    if (html == 'input' && att && att.setContent || html == 'textarea' && att && att.setContent) newElement.value = att.setContent

    setElement.append(newElement)

    return newElement


}