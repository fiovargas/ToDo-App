import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'

function Register() {
  return (
    <div>
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

        <div>
            <p>Si desea iniciar sesión ve a <Link to ="/Login">Login</Link> </p>
        </div>




    </div>

        
  )
}

export default Register
