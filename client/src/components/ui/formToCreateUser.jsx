import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormToCreateUserService } from "../../services/FormToCreateUserService/createUser"
import { useState } from "react";
import { useToast } from "@/hooks/use-toast"
import {Link} from 'react-router-dom'

const FormToCreateUserComponent = () => {

  const [responseText, setResponseText ] = useState();

  const { toast } = useToast()
  
  const formSchema = z.object({
    username: z.string().min(2, { message: "Username must be at least 2 characters.", }),
    email: z.string().email("Invalid email address."),
    password: z.string().min(6, { message: "Password must be at least 6 characters.", }),
  });
  
    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: "",
        email: "",
        password: "",        
      },
    });

    async function onSubmit(values) {
      const response = await FormToCreateUserService.createUser(values);
      console.log(response, `response txt`)
      setResponseText(response.message);
  
      if(response.success){
        toast({
          variant: `success`,
          title: "Success",
          description: "Account created successfully.",
        })
         form.reset();
      }else {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: `${response.message}`,
        })
      }
    }

  return (
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8"> 
      <div>
        <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>

          Already have an account?<Link to='/'>Login</Link>
      </div>
      </form>
    </Form>
  )
}

export default FormToCreateUserComponent