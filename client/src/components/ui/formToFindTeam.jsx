
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast"

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
import PopupModal from "../models/popup";

const FormToFindTeamComponent = () => {
const { toast } = useToast()
const [isModalShown, setIsModalShown] = useState(false);
const [modalContent, setModalContent] = useState({ title: '', body: '' });

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
    if(response.success){
      setModalContent({
        title: 'Your Matches',
        body: response.data.data.map((match, index) => (
          console.log(match),
          <div key={index}>
            <h2>Team Name: {match.team.teamName}</h2>
            <p>Team Description: {match.team.teamDescription}</p>
            <p>Team Type: {match.team.teamType}</p>
            <p>Recommended Skills: {match.team.skills}</p>
            <p>Match Percentage: {match.matchPercentage > 90 ? 'Great Match': 'Good Match'}</p>
          </div>
        ))
      });
      setIsModalShown(true);
      console.log(isModalShown);
      console.log(modalContent);
      toast({
        variant: `success`,
        title: "Success",
        description: "Form submitted successfully.",
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

  const Clear = () => {
     form.reset();
  }

  return (
    <Form {...form}>
      <p style={
        {fontWeight: `bold`, color: `blue`, marginBottom: `10px`, fontSize: `1em`, textAlign: `center`, textDecoration: `underline`}
        }>Submit this form to find a team. Our system will match you with a team based on information you provide.</p>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 grid-cols-1 md:grid-cols-2">
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
            name="skills"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Skills</FormLabel>
                <FormControl>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2">
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
      <div className="col-span-full flex justify-start space-x-4 mt-4">
        <Button type="submit">Submit</Button>
        <button onClick={Clear} >Clear</button>
      </div>
      </form>

      <PopupModal
        isShown={isModalShown}
        title={modalContent.title}
        body={modalContent.body}
        onClose={() => setIsModalShown(false)}
      />
    </Form>
  );
}

export default FormToFindTeamComponent;

