const DataBaseUrl = '';

export const createUser = (userData) => {
    fetch(DataBaseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(userData)
    })
}

export const updateUser = (userId, userData) => {
    fetch(`${DataBaseUrl}/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(userData)
    })
}

export const deleteUser = (userId) => {
    fetch(`${DataBaseUrl}/${userId}`, {
        method:'DELETE',
    })
}

const mapUsers = (users) => {
    users.map(({_id, ...rest}) => ({id: _id, ...rest}))
};

export const getUsersList = () => {
    fetch(DataBaseUrl)
    .then(response => response.json())
    .then(mapUsers);
}