//LISTAR USUARIOS listUsers()
export function listUsers() {
    const apiUrl = import.meta.env.VITE_API_URL + '/users'
    console.log(apiUrl)
    return fetch(apiUrl)
        .then(response => response.json())
        .then(json => json.data)
        .catch(error => {
            console.error('Error fetching users:', error)
            return []
        })
}

//OBTENER UN USUARIO getUser(id)
export function getUser(id) {
    const apiUrl = import.meta.env.VITE_API_URL + '/users/' + id
    return fetch(apiUrl)
        .then(response => response.json())
        .then(json => json.data)
        .catch(error => {
            console.error('Error fetching user:', error)
            return null
        })
}

//CREAR UN USUARIO createUser(payload)
export function createUser(payload) {
    const apiUrl = import.meta.env.VITE_API_URL + '/users'
    return fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
        .then(response => response.json())
        .then(json => json.data)
        .catch(error => {
            console.error('Error creating user:', error)
            return null
        })
}

//ACTUALIZAR UN USUARIO updateUser(id, payload)
export function updateUser(id, payload) {
    const apiUrl = import.meta.env.VITE_API_URL + '/users/' + id
    return fetch(apiUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
        .then(response => response.json())
        .then(json => json.data)
        .catch(error => {
            console.error('Error updating user:', error)
            return null
        })
}

//ELIMINAR UN USUARIO deleteUser(id)
export function deleteUser(id) {
    const apiUrl = import.meta.env.VITE_API_URL + '/users/' + id
    return fetch(apiUrl, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(json => json.data)
        .catch(error => {
            console.error('Error deleting user:', error)
            return null
        })
}