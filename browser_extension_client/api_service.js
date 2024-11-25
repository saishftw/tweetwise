
async function generateResponse(data) {
    const api_url = API_URL;

    return await fetch(api_url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => data)
        .catch(error => console.error('Error:', error));
}