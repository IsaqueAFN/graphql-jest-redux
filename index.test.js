const axios = require('axios')

describe('GraphQL testing', () => {
    it('Should be return a sucessfull GraphQL Query', async() => {
        const query = `query{
            user(name: "Isaque", id: "1"){
                name
                id
            }
        }`

        const response = await axios.post('http://localhost:4000/graphql', {query})
        expect(response.status).toBe(200)
        console.log(response.data)
    })
})