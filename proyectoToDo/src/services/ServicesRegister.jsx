async function getUsers() { 
    
    try {
        
        const response = await fetch('http://localhost:3001/Usuarios', {
            method: 'GET',
            headers :{
                'Content-Type': 'application/json'
            }
        })

        const users = await response.json()

        return users    
        
    } catch (error) {

        console.error("Existe un error al obtener los usuarios", error)
        throw error
        
    }
}

export default {getUsers}