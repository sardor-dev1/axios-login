
export function saveToLocalStorage(name, data) {
    localStorage.setItem(name, JSON.stringify(data))
}

export function getToLocalStorage(name){
    return JSON.parse(localStorage.getItem(name)) ?? []
}