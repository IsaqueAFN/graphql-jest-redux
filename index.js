import express from 'express'
import { graphql, buildSchema } from 'graphql'
const app = express()
import { store, setUser } from "./redux-store/store.js"
app.use(express.json())

const schema = buildSchema(`
    type User{
        name: String!
        id: String!
    },
    type Query{
        user(name: String!, id: String!): User!
    }    
`)

const root = {
    user: ({name, id}) => {
        store.dispatch(setUser({id, name}))
        const state = store.getState()
        console.log(state)
        return {name, id}
    }
}

app.post('/graphql', async(req, res) => {
    const {query} = req.body
    const response = await graphql({
        schema,
        source: query,
        rootValue: root
    })

    if(response.errors){
        console.log('Error in GraphQL requisition...')
        console.log(response.errors)
        return
    }

    res.send(response.data)
})

app.listen(4000, () => {
    console.log('GraphQL running at 4000...')
})