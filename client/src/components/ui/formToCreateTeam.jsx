
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { z } from "zod";
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"

// We'll want to later pull these options from a table
const roleOptions = ["Developer", "Designer", "Manager"];

const formSchema = z.object({
  teamName: z.string().min(3, { message: "Team Name must be at least 3 characters.", }),
  teamDescription: z.string().min(2, { message: "Team Description must be at least 2 characters.", }),
  date: z.object({
    from: z.date(),
    to: z.date(),
  })
});

export function FormToCreateTeam() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teamName: "",
      teamDescription: "",
    },
  });

  

  function onSubmit(values) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="teamName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Capstone Team" {...field} 
                  className="w-[360px]" 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="teamDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="A team to develop a web application" {...field} 
                  className="w-[360px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="teamType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team Type</FormLabel>
              <FormControl>
              <Select>
                <SelectTrigger className="w-[360px]">
                  <SelectValue placeholder="Select a team type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="developmentteam">Development Team</SelectItem>
                    <SelectItem value="researchgroup">Research Group</SelectItem>
                    <SelectItem value="studygroup">Study Group</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="skillsRequired"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skills Required</FormLabel>
              <FormControl>
                <div className="flex items-center space-x-2">
                  <Checkbox id="javascript" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" >
                    JavaScript
                  </label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
