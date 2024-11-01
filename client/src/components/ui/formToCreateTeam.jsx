
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
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


const formSchema = z.object({
  teamName: z.string().min(3, { message: "Team Name must be at least 3 characters.", }),
  teamDescription: z.string().min(2, { message: "Team Description must be at least 2 characters.", }),
  roles: z.array(
    z.object({
      role: z.string().nonempty("Please select a role"),
      numberOfPeople: z
        .number()
        .min(1, { message: "Must be at least 1 person" })
        .int("Must be a whole number"),
    })
  ).min(1, { message: "At least one role is required." })
   .refine(roles => roles.reduce((acc, curr) => acc + curr.numberOfPeople, 0) > 2, {
     message: "Total number of people in all roles must be greater than two."
   }),
  date: z.object({
    from: z.date(),
    to: z.date(),
  }),
  teamVisibility: z.enum(["private", "public"], {
    required_error: "You need to select a visibility."
  }),
  skills: z.array(z.string()).min(1, {
    message: "Select at least one skill.",
  }),
  additionalNotes: z.string().optional(),
});

export function FormToCreateTeam() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teamName: "",
      teamDescription: "",
      roles: [{ role: "", numberOfPeople: 1 }],
      skills: [],
      additionalNotes: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "roles",
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
        />
        

        {fields.map((field, index) => (
          <FormItem key={field.id} className="flex items-center space-x-4">
            <FormField
              control={form.control}
              name={`roles.${index}.role`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Roles Required</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-[360px]">
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Roles</SelectLabel>
                          <SelectItem value="Developer">Developer</SelectItem>
                          <SelectItem value="Designer">Designer</SelectItem>
                          <SelectItem value="Manager">Manager</SelectItem>
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
              name={`roles.${index}.count`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      placeholder="How many?"
                      {...field}
                      className="w-[125px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="button"
              onClick={() => remove(index)}
              className="bg-red-500"
            >
              Remove
            </Button>
          </FormItem>
        ))}

        <Button
          type="button"
          onClick={() => append({ role: "", count: 1 })}
          className="mt-2"
        >
          Add Role
        </Button>

        <FormField
          control={form.control}
          name="skillsRequired"
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
      </form>
    </Form>
  );
}