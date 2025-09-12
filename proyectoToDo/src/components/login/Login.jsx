import React, { useState }  from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import ServicesRegister from "../../services/ServicesRegister";


function Login() {

  const navegar = useNavigate();

    const [nombre,setNombre]=useState("")
    const [password,setPassword]=useState("")

    const iniciarSesion = async () => {

      if (!nombre || !password) {
      toast.error("Debes completar todos los campos");
      return;
    }

    if (nombre.length < 3) {
          toast.error("El nombre debe tener mínimo 3 caracteres");
          return;
        }
    
        // Validación contraseña mínimo 8 caracteres
        if (password.length < 8) {
          toast.error("La contraseña debe tener mínimo 8 caracteres");
          return;
        }
    
        if (!email.includes("@") || !email.includes(".")) {
          toast.error("El correo debe contener '@' y '.'");
          return;
        }

    try {
      const usuarios = await ServicesRegister.getUsers()
      const usuarioEncontrado = usuarios.find(
        (user) => user.nombre === nombre && user.password === password);

        if (usuarioEncontrado) {
          toast.success("Inicio de sesión exitoso");
          navegar("/Home");
        } else {
          toast.error("Usuario o contraseña incorrectos");
        }

    } catch (error) {
      toast.error("Error al conectar con el servidor");
      console.error("Error en login:", error);
    }
  };

  return (
    <div>
      
      <div>
        <div className='auth-contenedor'>

          <h2>Inicio de sesión</h2>

          <label className='nombre' htmlFor="nombre">Nombre de usuario</label>
          <input type="text" id='nombre' placeholder='Nombre de usuario' value={nombre} onChange={(e)=>setNombre(e.target.value)} />
          
          <label className='password' htmlFor="Contraseña">Contraseña</label>
          <input type="password" id='password' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} />
          
          <button className='auth-button' onClick={iniciarSesion} >Iniciar sesión</button>
        </div>
      </div>

  

    </div>
  )
}

export default Login
