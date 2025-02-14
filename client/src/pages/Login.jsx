import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import '../styles/signup.css';
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const Login = ({setToken}) => {
    let navigate = useNavigate()

  const [formData,setFormData] = useState({
        email:'',password:''
  })

  console.log(formData)

  function handleChange(event){
    setFormData((prevFormData)=>{
      return{
        ...prevFormData,
        [event.target.name]:event.target.value
      }
    })
  }

  async function handleSubmit(e){
    e.preventDefault()
    
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
          })
          
      if (error) throw error
      setToken(data)
      navigate('/home')

    } catch(error) {
        alert(error)
    }  
  }

  return (
    <div>   
      <form onSubmit={handleSubmit} className="space-y-8">    
        <input
         className="w-1/2"
          placeholder='Enter your email'
          name='email'
          onChange={handleChange}
        />

        <input
         className="w-1/2"
          placeholder='Enter your password'
          name='password'
          type='password'
          onChange={handleChange}
        />

        <button type='submit'>
          Submit
        </button>

      </form>
      <div className="signup"><p>Don't have an account? <Link to='/signup'>Sign Up</Link></p></div>
    </div>
  )
}

export default Login
