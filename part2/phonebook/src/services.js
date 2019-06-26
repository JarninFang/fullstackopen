import axios from 'axios';

const baseUrl = "/api/persons";

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => {
        return response.data
    })
}

const add = (person) => {
    const request = axios.post(baseUrl, person)
    return request.then(response => {
        return response.data
    })
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => {
        return response.data
    })
}

const update = (person) => {
    const request = axios.put(`${baseUrl}/${person.id}`, person)
    return request.then(response => {
        return response.data
    })
}

export default { getAll, add, remove, update }