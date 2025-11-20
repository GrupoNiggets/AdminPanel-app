export function getPosts() {
    const apiUrl = import.meta.env.VITE_API_URL + '/posts'
    console.log(apiUrl)
    return fetch(apiUrl)
      .then(response => response.json())
      .then(json => json.data)
      .catch(error => {
        console.error('Error fetcheando:', error)
        return []
      })
}

export function getPost(postId) {
    const apiUrl = import.meta.env.VITE_API_URL + '/posts/' + postId
    return fetch(apiUrl)
      .then(response => response.json())
      .then(json => json.data)
      .catch(error => {
        console.error('Error fetcheando:', error)
        return null
      })
}

export function createPost(post) {
    const apiUrl = import.meta.env.VITE_API_URL + '/posts'
    return fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    })
      .then(response => response.json())
      .then(json => json.data)
      .catch(error => {
        console.error('Error creando:', error)
        return null
      })
}

export function updatePost(postId, post) {
    const apiUrl = import.meta.env.VITE_API_URL + '/posts/' + postId
    return fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    })
      .then(response => response.json())
      .then(json => json.data)
      .catch(error => {
        console.error('Error actualizando:', error)
        return null
      })
}

export function deletePost(postId) {
    const apiUrl = import.meta.env.VITE_API_URL + '/posts/' + postId
    return fetch(apiUrl, {
      method: 'DELETE'
    })
      .then(async response => {
        if (response.status === 204) {
          return true
        }
        const json = await response.json().catch(() => null)
        if (!response.ok) {
          throw new Error('Error')
        }
        return json?.data ?? true
      })
      .catch(error => {
        console.error('Error eliminando:', error)
        return null
      })
}