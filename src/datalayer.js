const datalayer = {
  serviceUrl: 'https://newclassrooms20181207022247.azurewebsites.net/api/values/',
  get (path) {
    if (path) {
      this.serviceUrl += path
    }
    const response = fetch(this.serviceUrl)
    return response.json()
  },
  async post (path, data) {
    if (path != null) {
      this.serviceUrl += path
    }
    // Default options are marked with *
    const response = await fetch(this.serviceUrl, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*'
      },
      body: data
    })
    return response.json() // parses response to JSON
  }
}

export default datalayer
