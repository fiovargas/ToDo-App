import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import ServicesRegister from '../../services/ServicesRegister'


function Register() {

 const navegar = useNavigate()

    const [nombre,setNombre] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [mensaje, setMensaje] = useState("")

    useEffect(() =>{

      const fecthUsuarios = async () =>{ 

        try {
          
          const usuariosTraidos = await ServicesRegister.getUsuarios();
          
          console.log(usuariosTraidos);

        } catch (error) {
          
          console.log("Error al traer los usuarios del servicio", error)
        }
      };

      fecthUsuarios();

    }, []);
 
    const cargarDatos = () =>{

      if (!nombre || !email || !password) {
        setMensaje("Todos los campos son obligatorios");
        return;
    }
      console.log(nombre, email, password);
      
       // Aqui se llamario el servicio de Post para guardar la info a la DB o al Json server

      setMensaje("Registro exitoso")

      navegar("/Login")
    };

  return (
    <div>
        <div>

          <h2>Regitro de Usuarios</h2>

          <div>
            <label htmlFor="Nombre">Nombre de usuario</label>
            <input type="text" id='nombre' placeholder='Nombre' value={nombre} onChange={(e)=>setNombre(e.target.value)} />
            <br />
            <label htmlFor="Email">Email</label>
            <input type="email" id='email' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
            <br />
            <label htmlFor="Password">Password</label>
            <input type="password" id='password' placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)} />

          </div>

          <button onClick={cargarDatos}>Registrarse</button>

          {mensaje && <p className="mensaje">{mensaje}</p>}

          <p>Si desea iniciar sesión ve a <Link to ="/Login">Login</Link> </p>
          
        </div>

    </div>

        
  )
}

export default Register
