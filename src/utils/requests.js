
export const fetchData = async word => {

  try {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const targetUrl = `https://od-api.oxforddictionaries.com:443/api/v1/entries/en/${word}`
    const response = await fetch(proxyUrl + targetUrl, {
      method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Accept": "application/json",
          "app_id": "d640fc4c",
          "app_key": "53661a86618c5c8ed3ee6986bdef1002"
        },
    })
    const blob = await response.json()
    const searchWord = blob.results[0].word
    return searchWord
    } catch(e) {
      console.log('not a word')
      return 'non-word'
    }

  }



