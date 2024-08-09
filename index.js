import express from 'express'
import { graphql, buildSchema } from 'graphql'
const app = express()
import { store, setInformation } from "./redux-store/store.js"
app.use(express.json())

const schema = buildSchema(`
    type Query{
        informations: String
    }    
`)

const root = {
    informations: ({id}) => {
        store.dispatch(setInformation('duzia'))
        const state = store.getState()
        return state.informations.value
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