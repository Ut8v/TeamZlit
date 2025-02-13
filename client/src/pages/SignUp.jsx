import  { useState } from 'react'
import {Link} from 'react-router-dom'
import '../styles/signup.css';
import { useAuth } from '../auth/authContext'
import { createClient } from '@supabase/supabase-js'
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const SignUp = () => {
  const { login } = useAuth(); 
  const navigate = useNavigate();
  const { toast } = useToast()
  const [formData,setFormData] = useState({
    username:'',email:'',password:''
  })

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
      const { data, error } = await supabase.auth.signUp(
        {
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.username,
            }
          }
        }
      )

      const isLoggedIn = await login(data);

      if (isLoggedIn) {
          navigate("/home");
      } 
      else {
          toast({
              variant: "destructive",
              title: "signup failed",
              description: error.message,
            })
      }
    } catch(error) {
        toast({
          variant: "destructive",
          title: "signup failed",
          description: error.message,
        })
    }  
  }

  return (
    
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder='Username'
          name='username'
          onChange={handleChange}
        />

        <input
          placeholder='Email'
          name='email'
          onChange={handleChange}
        />

        <input
          placeholder='Password'
          name='password'
          type='password'
          onChange={handleChange}
        />

        <button type='submit'>
          Submit
        </button>

      </form>
      <div className="login">Already have an account? <Link to='/'>Login</Link></div>
    </div>
  )
}

export default SignUp

