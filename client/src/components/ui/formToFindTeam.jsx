
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
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Checkbox } from "./checkbox";
import { FormToFindTeamService } from "../../services/FormToFindService/findTeam"
import { useState } from "react";

const FormToFindTeamComponent = () => {

const [responseText, setResponseText ] = useState();

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email("Invalid email address."),
  skills: z.array(z.string()).min(1, {
    message: "Select at least one skill.",
  }),
  role: z.string().min(1, { message: "Role is required." }),
  experienceLevel: z.string().min(1, { message: "Experience level is required." }),
  availability: z.string().min(1, { message: "Availability is required." }),
  interestAreas: z.string().optional(),
  portfolio: z.string().url("Invalid URL. Please provide a valid link.").optional(),
  preferredTeamType: z.string().min(1, { message: "Preferred team type is required." }),
  additionalNotes: z.string().optional(),
});

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      skills: [],
      role: "",
      experienceLevel: "",
      availability: "",
      interestAreas: "",
      portfolio: "",
      preferredTeamType: "",
      additionalNotes: "",
    },
  });

  async function onSubmit(values) {
    const response = await FormToFindTeamService.findTeam(values);
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
      <p style={
        {fontWeight: `bold`, color: `blue`, marginBottom: `10px`, fontSize: `1em`, textAlign: `center`, textDecoration: `underline`}
        }>Submit this form to find a team. Our system will match you with a team based on information you provide.</p>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
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
            <FormItem>
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
            name="skills"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Skills</FormLabel>
                <FormControl>
                  <div className="space-y-2">
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
                    ].map(skill => (
                      <div key={skill} className="flex items-center space-x-2">
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
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferred Role</FormLabel>
              <FormControl>
                <Select {...field} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Developer">Developer</SelectItem>
                    <SelectItem value="Designer">Designer</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="experienceLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Experience Level</FormLabel>
              <FormControl>
                <Select {...field} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="availability"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Availability</FormLabel>
              <FormControl>
                <Input placeholder="Enter your availability (e.g., Weekdays, 9AM-5PM)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="interestAreas"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Interest Areas</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe your interest areas" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="portfolio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Portfolio/LinkedIn/GitHub</FormLabel>
              <FormControl>
                <Input placeholder="Enter your portfolio link" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="preferredTeamType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferred Team Type</FormLabel>
              <FormControl>
                <Select {...field} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your preferred team type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Study Group">Study Group</SelectItem>
                    <SelectItem value="Development Team">Development Team</SelectItem>
                    <SelectItem value="Research Group">Research Group</SelectItem>
                  </SelectContent>
                </Select>
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

export default FormToFindTeamComponent;

