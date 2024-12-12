const API_KEY = 'FPX61ZlCBlBtjRPVEg9ryzMElDx3XquH'


async function generateResponse(data) {
    const api_url = CONFIG.API_URL;
    const endpoint = `${api_url}/ai/generate`
    return await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-API-KEY': API_KEY
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => data)
        .catch(error => console.error('Error:', error));
}

async function query(data) {
    const api_url = CONFIG.API_URL;
    const endpoint = `${api_url}/ai/query`

    return await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-API-KEY': API_KEY
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => data)
        .catch(error => console.error('Error:', error));
}