
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FormToCreateTeamService } from "../../services/FormToCreateService/createTeam"
import { useState } from "react";

const FormToCreateTeamComponent = () => {

  const [responseText, setResponseText ] = useState();

const formSchema = z.object({
  teamName: z.string().min(3, { message: "Team Name must be at least 3 characters.", }),
  teamDescription: z.string().min(2, { message: "Team Description must be at least 2 characters.", }),
  teamType: z.string().min(1, { message: "Team Type is required." }),
  roles: z.string().min(2, { message: "Roles must be at least 2 characters.", }),
  skills: z.array(z.string()).min(1, {
    message: "Select at least one skill.",
  }),
  teamVisibility: z.enum(["private", "public"], {
    required_error: "You need to select a visibility."
  }),
  additionalNotes: z.string().optional(),
});

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teamName: "",
      teamDescription: "",
      teamType: "",
      roles: "",
      skills: [],
      teamVisibility: "",
      additionalNotes: "",
    },
  });
  
  async function onSubmit(values) {
    console.log('test');
    console.log(values);
    const response = await FormToCreateTeamService.createTeam(values);
    console.log(response, `response txt`)
    setResponseText(response.message);

    if(response.success){
       form.reset();
    }
  }

  const Clear = () => {
    form.reset();
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
                <Textarea 
                  placeholder="Research" {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name="teamType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team Type</FormLabel>
              <FormControl>
              <Select>
                <SelectTrigger>
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
        /> */}
        

        <FormField
          control={form.control}
          name="roles"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Roles</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Roles go here" {...field} 
                />
              </FormControl>
              <FormMessage />   
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="skills"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skills Required</FormLabel>
              <FormControl>
                <div className="space-y-2 w-[360px]">
                  {[
                      "JavaScript",
                      "UI Design",
                      "Project Management",
                      "Python",
                      "React",
                      "Node.js",
                      "TypeScript",
                      "Data Analysis",
                      "SQL",
                      "Machine Learning",
                      "HTML/CSS",
                      "Docker",
                      "AWS",
                      "Figma",
                      "Git",
                      "Agile Methodologies",
                      "Java",
                      "C#",
                      "Redux",
                      "Firebase",
                      "MongoDB",
                      "Cybersecurity",
                      "Mobile Development",
                      "Testing/QA",
                      "API Development"
                    ].map(skill => (<div key={skill} className="flex items-center space-x-2">
                    <Checkbox
                      id={skill}
                      checked={field.value?.includes(skill)}
                      onCheckedChange={(checked) => {
                        const selectedSkills = field.value || [];
                        if (checked) {
                          field.onChange([...selectedSkills, skill]);
                        } else {
                          field.onChange(selectedSkills.filter(s => s !== skill));
                        }
                      }}
                    />
                    <label htmlFor={skill} className="text-sm">{skill}</label>
                  </div>
                ))}
              </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="teamVisibility"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Team Visibility</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="private" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Private
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="public" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Public
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="additionalNotes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Notes</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter any additional notes" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
        {responseText}
        <button onClick={Clear}
         style={{marginLeft: `20px`}}
        >Clear</button>
      </form>
    </Form>
  );
}


export default FormToCreateTeamComponent;