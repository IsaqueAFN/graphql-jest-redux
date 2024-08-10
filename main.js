import crypto from 'crypto'
import axios from 'axios'
let endProgram = false

function types(){
    return new Promise((resolve, reject) => {
        console.log('Type the name of user:')
        process.stdin.on('data', async(data) => {
            const name = data.toString().trim()
            if(name !== ''){
                const id = crypto.randomUUID()
                console.log('Your user ID is: ' + id)
                const query = `
                    query {
                        user(id: "${id}", name: "${(name)}") {
                            id
                            name
                        }
                    }`;

                try{
                    const response = await axios.post('http://localhost:4000/graphql', {query})
                    if(response.status === 200){
                        console.log('Sucess to register a user!')
                        endProgram = true
                        resolve()
                    }else{
                        endProgram = true
                        reject("Error to register...")
                    }   
                }catch(error){
                    console.log('Internal error: ' + error)
                }
            }else{
                console.log('Please enter a name!')
                setTimeout(() => {
                    reject("don't type a correct name...")
                }, 1000)
            }
        })
    })
}

async function startProgram(){
    while(!endProgram){
        try{
            await types()
        }catch(error){
            console.log("Error: " + error)
        }
    }
}

startProgram()