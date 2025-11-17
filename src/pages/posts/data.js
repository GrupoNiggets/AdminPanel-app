export function getPosts() {
    const apiUrl = import.meta.env.VITE_API_URL + '/posts'
    console.log(apiUrl)
    return fetch(apiUrl)
      .then(response => response.json())
      .then(json => json.data)
      .catch(error => {
        console.error('Error fetching posts:', error)
        return []
      })
}

export function getPost(postId) {
    const apiUrl = import.meta.env.VITE_API_URL + '/posts/' + postId
    return fetch(apiUrl)
      .then(response => response.json())
      .then(json => json.data)
      .catch(error => {
        console.error('Error fetching post:', error)
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
        console.error('Error creating post:', error)
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
        console.error('Error updating post:', error)
        return null
      })
}

export function deletePost(postId) {
    const apiUrl = import.meta.env.VITE_API_URL + '/posts/' + postId
    return fetch(apiUrl, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(json => json.data)
      .catch(error => {
        console.error('Error deleting post:', error)
        return null
      })
}