import React, { useEffect, useState } from 'react'
import ServicesTareas from '../../services/ServicesTareas';
import { toast } from 'react-toastify'

import './Tareas.css'


function IngreTareas() {

  const [tarea, setTarea] = useState("");
  const [tareasT, setTareasT] = useState([]);
  const [completadas, setCompletadas] = useState(0);

  useEffect(()=>{
    const fetchTareas = async () =>{
      
      try {
        
        const tareasTraidas = await ServicesTareas.getTareas()
        console.log(tareasTraidas);
        
        setTareasT(tareasTraidas);

        const totalCompletadas = tareasTraidas.filter((t) => t.completada).length;
        setCompletadas(totalCompletadas);

      } catch (error) {
        
        console.log("Error al traer las tareas de los servicios");
      }
    };

      fetchTareas()

  },[]);

  const agregarTarea = async () => {
    if(tarea.trim() === "") {
      toast.error('Ingrese un texto')
      return;
    }
      
      try {

        const infoTarea = {
        tarea: tarea,
        completada: false,
      };

      const tareaRespuesta = await ServicesTareas.postTareas(infoTarea);
      
      setTareasT([...tareasT, tareaRespuesta]);

      console.log(tareaRespuesta);
      console.log("Tarea agregada:", tarea);

      toast.success('Tarea agregada');

      setTarea(""); 
      } catch (error) {

        console.error("Error al agregar la tarea", error);
      };
    
  };

  const eliminar = async (id) => {
    try {

      await ServicesTareas.deleteTareas(id);

      setTareasT((prev) => prev.filter((t) => t.id !== id));

      toast.success('Tarea eliminada');

    } catch (error) {

      console.log("No se pudo eliminar la tarea", error);
      alert('No se pudo eliminar la tarea');
    }
  };

  const editar = async (tarea) => {
    const nuevoTexto = prompt("Editar tarea:", tarea.tarea);

      if (nuevoTexto && nuevoTexto.trim() !== "") {
        try {
          const tareaEditada = await ServicesTareas.patchTareas(tarea.id, { tarea: nuevoTexto });
      
          setTareasT(
            tareasT.map((t) => (t.id === tarea.id ? tareaEditada : t))
          );
        } catch (error) {
          alert("No se pudo editar la tarea");
        }
      }
};

const toggleCompletada = async (tarea) => {
  
  try {
    const tareaActualizada = await ServicesTareas.patchTareas(tarea.id, {
      completada: !tarea.completada,
    });

    const nuevasTareas = tareasT.map((ta) => ta.id === tarea.id ? tareaActualizada : ta);
    setTareasT(nuevasTareas);

    const totalCompletadas = nuevasTareas.filter((ta) => ta.completada).length;
    setCompletadas(totalCompletadas);

  } catch (error) {
    console.log("Error al marcar la tarea como completada");
  }
};
  

  return (
    <div>
      
      <div className='contenedorPrincipal' >
        
          <div className='input-contenedor'>
            
            <input type="text" id='tareas' placeholder='Tareas' value={tarea} onChange={(e)=>setTarea(e.target.value)}

            onKeyDown={(e) => e.key === 'Enter' && agregarTarea()} />

            <button className='btnAgregar' onClick={agregarTarea}>Agregar</button>

            <div className='contador-contenedor'>
              <span className='contador-texto'>Tareas completadas</span>
              <span className='contador'>{completadas}</span>
            </div>

          </div>

      </div>

      <div className='contenedor2'>

        {tareasT.length === 0 ? (
          <p className="noTareas">No existen tareas</p>
        ) : (

          <ul>
            <h1 className='titulo1' >Tareas por hacer</h1>
              {tareasT.map((tarea) => (
                <li key={tarea.id} className='tarea'>
                  
                  <label>

                    <input id='checkbox' type="checkbox" checked={tarea.completada} onChange={() => toggleCompletada(tarea)}/>
                    <span className={tarea.completada ? "tareaTexto tareaCompletada" : "tareaTexto"}>{tarea.tarea}</span>

                  </label>

                  <div className='botones'>
                    <button className='btnEditar' onClick={() => editar(tarea)}>Editar</button>
                    <button className='btnEliminar' onClick={() => eliminar(tarea.id)}>Eliminar</button>
                  
                  </div>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default IngreTareas
