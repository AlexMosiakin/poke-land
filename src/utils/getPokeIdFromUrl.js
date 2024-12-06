export const getPokeIdFromUrl = (url) => {
    if(!url) return

    const urlLength =  url.split('/').length
    console.log(urlLength)
    return url.split('/')[urlLength - 2]
}