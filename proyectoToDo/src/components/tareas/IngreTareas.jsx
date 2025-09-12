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

      toast.success('Tarea agregada con éxito');

      setTarea(""); 
      } catch (error) {

        console.error("Error al agregar la tarea", error);
      };
    
  };

const eliminar = (id) => {

  toast.info(
    <div className="toastConfirm">
      <p>¿Seguro que quieres eliminar esta tarea?</p>
      <div className="toastButtons">
       
        <button className="btnConfirm" onClick={async () => {

            try {
              await ServicesTareas.deleteTareas(id); // elimina en backend
              setTareasT((prev) => prev.filter((t) => t.id !== id)); // actualiza lista
              toast.dismiss(); // cierra modal
              toast.success("Tarea eliminada con éxito");

            } catch (error) {
              toast.error("No se pudo eliminar la tarea");
            }
          }}

        >Sí</button>

        <button className="btnCancel" onClick={() => toast.dismiss()}>No</button>
      </div>
    </div>,
    {autoClose: false, closeOnClick: false, draggable: false}
  );
};


  const editar = (tarea) => {
  let nuevoTexto = tarea.tarea;

  toast.info(
    <div className="toastConfirm">
      
      <p>Editar tarea:</p>
      <input type="text" className="editInputToast" defaultValue={tarea.tarea} onChange={(e) => (nuevoTexto = e.target.value)}/>

        <div className="toastButtons">

          <button className="btnConfirm" onClick={async () => {

              if (!nuevoTexto || nuevoTexto.trim() === "") {
                toast.error("No puedes dejar espacios vacíos");
                return;
              }

              try {
                const tareaEditada = await ServicesTareas.patchTareas(tarea.id, { tarea: nuevoTexto });
                setTareasT(tareasT.map((t) => (t.id === tarea.id ? tareaEditada : t)));
                toast.dismiss(); // cierra el toast de edición
                toast.success("Tarea editada con éxito");

              } catch (error) {
                toast.error("No se pudo editar la tarea");
              }
            }}
          >Guardar</button>
          
          <button className="btnCancel" onClick={() => toast.dismiss()}>Cancelar</button>
        </div>
    </div>,
    { autoClose: false, closeOnClick: false, draggable: false }
  );
};

const toggleCompletada = async (tarea) => {
  
  try {
    const tareaActualizada = await ServicesTareas.patchTareas(tarea.id, {
      completada: !tarea.completada,
      fechaCompletada: !tarea.completada ? new Date().toISOString() : null,
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
                    <span className={tarea.completada ? "completada" : ""}>{tarea.tarea}</span>

                  

                    {tarea.completada && tarea.fechaCompletada && (
                      <div className="fechaCompletada">
                        Completada: {new Date(tarea.fechaCompletada).toLocaleString()}
                      </div>
                    )}
                  </label>
                  
                  <div className='botonesIngreT'>
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
