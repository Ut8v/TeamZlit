import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createClient } from '@supabase/supabase-js'
import { useAuth } from '../auth/authContext'
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const Login = () => {
  const { toast } = useToast()
  const { login } = useAuth(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(event) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      const isLoggedIn = await login(data);

      if (isLoggedIn) {
        navigate("/home");
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: error.message,
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-[#0f3445] border-[#0f3445] shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-white">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                className="bg-[#0f3445] text-white border-white/30 focus:border-white/60 placeholder-white/50"
                placeholder='Enter your email'
                name='email'
                type='email'
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Input
                className="bg-[#0f3445] text-white border-white/30 focus:border-white/60 placeholder-white/50"
                placeholder='Enter your password'
                name='password'
                type='password'
                onChange={handleChange}
                required
              />
            </div>
            <Button 
              type='submit' 
              className="w-full bg-[#008780] hover:bg-[#3fb182] transition-colors duration-300"
            >
              Sign In
            </Button>
          </form>
          <div className="text-center mt-6">
            <p className="text-white/80">
              Don't have an account? {' '}
              <Link 
                to='/signup' 
                className="text-white underline hover:text-white/70 transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login;