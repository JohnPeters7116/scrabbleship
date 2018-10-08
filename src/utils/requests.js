export const fetchData = async word => {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const targetUrl = `https://glosbe.com/gapi/translate?from=eng&dest=eng&format=json&phrase=${word}&pretty=true`
    const searchWord = await fetch(proxyUrl + targetUrl)
      .then(blob => blob.json())
    return searchWord
  }



