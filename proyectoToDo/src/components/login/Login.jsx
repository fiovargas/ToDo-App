import React, { useState }  from 'react'
import { Link,useNavigate } from 'react-router-dom'

function Login() {

  const navegar = useNavigate()

    const [nombre,setNombre]=useState("")
    const [password,setPassword]=useState("")

    const iniciarsesión = () =>{

      console.log(nombre,password);
    
      // Aqui se llamario el servicio de Post para guardar la info a la DB o al Json server

      setMensaje("Inicio de sesión exitoso")

      navegar("/IngreTareas")

  };

  return (
    <div>
      
      <div>
        <div>
          <label htmlFor="Nombre de usuario">Nombre de usuario</label><br />
          <input type="text" id='nombre' placeholder='Nombre de usuario' value={nombre} onChange={(e)=>setNombre(e.target.value)} />
          <br />
          <label htmlFor="Contraseña">Contraseña</label><br />
          <input type="text" id='password' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} />
          <br />
        </div>
      </div>

        <button onClick={iniciarsesión} >Iniciar sesión</button>

        <p>Si desea hacer tareas ve a <Link to ="/Home">Home</Link> </p>

    </div>
  )
}

export default Login
