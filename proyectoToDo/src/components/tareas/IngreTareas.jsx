import React, { useEffect, useState } from 'react'
import './Tareas.css'
import ServicesTareas from '../../services/ServicesTareas';
import { toast } from 'react-toastify'

function IngreTareas() {

  const [tarea, setTarea] = useState("");
  const [tareasT, setTareasT] = useState([]);

  useEffect(()=>{
    const fetchTareas = async () =>{
      
      try {
        
        const tareasTraidas = await ServicesTareas.getTareas()

        console.log(tareasTraidas);
        
        setTareasT(tareasTraidas)
        
      } catch (error) {
        
        console.log("Error al traer las tareas de los servicios");
      }
    }

      fetchTareas()

  },[])

  const agregarTarea = async () => {
    if(tarea.trim() === "") {
      toast.error('Ingrese un texto')
      return;
    }
      
      try {

        const infoTarea = {
        tarea: tarea
        
      }
      const tareaRespuesta = await ServicesTareas.postTareas(infoTarea)
      
      setTareasT([...tareasT, tareaRespuesta])

      console.log(tareaRespuesta);
      console.log("Tarea agregada:", tarea);

      toast.success('Tarea agregada')

      setTarea(""); 
      } catch (error) {
        console.error("Error al agregar la tarea", error);
        
      }
    
  };

  const editar = async (tarea) => {
    const nuevoTexto = prompt("Editar tarea:", tarea.tarea);

      if (nuevoTexto && nuevoTexto.trim() !== "") {
        try {
          const tareaEditada = await ServicesTareas.patchTareas(tarea.id, { tarea: nuevoTexto });
      
          setTareasT(
                    tareasT.map((t) =>
                      t.id === tarea.id ? tareaEditada : t
                    )
                  );
        } catch (error) {
          alert("No se pudo editar la tarea");
        }
      }
}
  

  return (
    <div>
      
        <div className='contenedorPrincipal' >

            <h1>Tareas por hacer</h1>

            <input type="text" id='tareas' placeholder='Tareas' value={tarea} onChange={(e)=>setTarea(e.target.value)}

            onKeyDown={(e) => e.key === 'Enter' && agregarTarea()} />

            <button className='btnAgregar' onClick={agregarTarea}>Agregar</button>
            
        </div>

        <div>
          <h1 className='titulo1' >Lista de tareas</h1>

          <ul>

            {tareasT.map((tarea)=>(

              <li key={tarea.id} className='tarea' >
                {/* <input type="checkbox" disabled/> */}
                {tarea.tarea}

                

                <div className='botones' >
                  <button className='btnEliminar' onClick={async () => {
                    try {

                      await ServicesTareas.deleteTareas(tarea.id);

                      setTareasT(tareasT.filter(t => t.id !== tarea.id));

                    } catch (error) {
                      alert('No se pudo eliminar la tarea');
                    }
                    
                  }}> Eliminar </button>

                  <button className='btnEditar' onClick={() => editar(tarea)}
                  > Editar</button>
                </div>

              </li>
            ))}
            
          </ul>
        </div>
    </div>
  )
}

export default IngreTareas
