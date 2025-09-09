export default {getTareas, postTareas, deleteTareas, patchTareas}


async function getTareas() { //Función para Get
    
    try {
        
        const response = await fetch('http://localhost:3001/Tareas', {
            method: 'GET',
            headers :{
                'Content-Type': 'application/json'
            }
        })

        const tareas = await response.json()

        return tareas    
        
    } catch (error) {

        console.error("Error al obtener las tareas", error)
        throw error
    }
}

async function postTareas(infoTarea) {
    try {
            
            const response = await fetch('http://localhost:3001/Tareas', {
                method: 'POST',
                headers :{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(infoTarea)          
            })

            const tarea = await response.json()

            return tarea    
            
        } catch (error) {

            console.error("Error al crear la tarea ", error)
            throw error
        }
}

async function patchTareas(id, nuevaTarea) { //Función para put
    
    try {
        console.log(id);
        const response = await fetch(`http://localhost:3001/Tareas/${id}`,{
            method: 'PATCH',
            headers :{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(nuevaTarea)        
        });

        if (!response.ok) {
        throw new Error("Error al editar la tarea");
        }

        const tareaEditada = await response.json();
        
        

        return tareaEditada;    
        
    } catch (error) {

        console.error("Error al editar la tarea", error)
        throw error 
    }
}


async function deleteTareas(id) { //Función para Delete
    
    try {
        
        const response = await fetch(`http://localhost:3001/Tareas/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },       
        });

        if (!response.ok) {
        throw new Error("Error al eliminar la tarea");
        }

        return true;  
        
    } catch (error) {

        console.error("Error al eliminar la tareas ", error)
        throw error
    }
} 