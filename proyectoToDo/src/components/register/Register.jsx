import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import ServicesRegister from '../../services/ServicesRegister'
import { toast } from 'react-toastify'

import './Register.css'


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
 
    const cargarDatos = async () =>{

      if (!nombre || !email || !password) {
        toast.error("No puedes dejar espacios vacíos");
        return;
    }

    if (nombre.length < 3) {
      toast.error("El nombre debe tener mínimo 3 caracteres");
      return;
    }

    if (password.length < 8) {
      toast.error("La contraseña debe tener mínimo 8 caracteres");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      toast.error("El correo debe contener '@' y '.'");
      return;
    }

      console.log(nombre, email, password);
      
       try {
        const nuevoUsuario = {
          nombre: nombre,
          email: email,
          password: password
        };

          await ServicesRegister.postUsers(nuevoUsuario);

          toast.success('Registro guardado con éxito');
          navegar("/Login")
        
       } catch (error) {
          toast.error("Error al registrar el usuario");
          console.error(error);
       }
    };

  return (
    <div>
        <div>

          

          <div className='auth-contenedor' >

            <h2>Regitro de Usuarios</h2>

            <label className='nombre' htmlFor="Nombre">Nombre de usuario</label>
            <input type="text" id='nombre' placeholder='Nombre' value={nombre} onChange={(e)=>setNombre(e.target.value)} />
            
            <label className='email' htmlFor="Email">Email</label>
            <input type="email" id='email' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
            
            <label className='password' htmlFor="Password">Password</label>
            <input type="password" id='password' placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)} />

            <button className='auth-button' onClick={cargarDatos}>Registrarse</button>

            <Link to ="/Login">Ya tengo cuenta</Link>
          </div>
          
        </div>

    </div>     
  )
}

export default Register
