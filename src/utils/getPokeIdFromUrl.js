export const getPokeIdFromUrl = (url) => {
    if(!url) return

    const urlLength =  url.split('/').length
    return url.split('/')[urlLength - 2]
}