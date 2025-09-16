import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import ServicesRegister from '../../services/ServicesRegister'
import { toast } from 'react-toastify'

import './Register.css'


function Register() {

const navegar = useNavigate()

  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    const usuario = localStorage.getItem("usuario")
    if (usuario) {
      navegar("/Home", { replace: true }) // reemplaza el historial
    }
  }, [navegar])

  const cargarDatos = async () => {

    if (!nombre || !email || !password) {
      toast.error("No puedes dejar espacios vacíos")
      return
    }

    if (nombre.length < 3) {
      toast.error("El nombre debe tener mínimo 3 caracteres")
      return
    }

    if (password.length < 8) {
      toast.error("La contraseña debe tener mínimo 8 caracteres")
      return
    }

    if (!email.includes("@") || !email.includes(".")) {
      toast.error("El correo debe contener '@' y '.'")
      return
    }

    try {

      const usuariosActuales = await ServicesRegister.getUsers()

      const nombreExistente = usuariosActuales.find(
        (user) => user.nombre.toLowerCase() === nombre.toLowerCase()
      )
      const emailExistente = usuariosActuales.find(
        (user) => user.email.toLowerCase() === email.toLowerCase()
      )

      if (nombreExistente) {
        toast.error("El nombre de usuario ya existe")
        return
      }

      if (emailExistente) {
        toast.error("El correo ya está registrado")
        return
      }

      const nuevoUsuario = { nombre, email, password }
      await ServicesRegister.postUsers(nuevoUsuario)

      toast.success("Registro guardado con éxito")
      setNombre("")
      setEmail("")
      setPassword("")
      navegar("/Login")

    } catch (error) {
      toast.error("Error al registrar el usuario")
      console.error("Error en registro:", error)
    }
  }

  return (
    <div>
        <div>

          

          <div className='auth-contenedor' >

            <h2>Registro de Usuarios</h2>

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
