import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { useAuth } from "@/auth/authContext";
import { useToast } from "@/hooks/use-toast";
import { FormToCreateTeamService } from "../../services/FormToCreateService/createTeam";
import PopupModal from "../models/popup";

// UI Components
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
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Expanded skills by category (alphabetically sorted within each category)
const SKILLS_BY_CATEGORY = {
  "Frontend": [
    "Angular", "Bootstrap", "CSS Animation", "Figma", "GraphQL Client", 
    "HTML/CSS", "JavaScript", "Material UI", "Next.js", "Progressive Web Apps", 
    "React", "Responsive Design", "SASS/SCSS", "Svelte", "Tailwind CSS", 
    "TypeScript", "UI Design", "Vue.js", "Web Accessibility", "Redux"
  ].sort(),
  "Backend": [
    "API Development", "ASP.NET", "C#", "Django", "Express.js", 
    "Firebase", "Flask", "GraphQL Server", "Java", "Laravel", 
    "MongoDB", "MySQL", "Node.js", "PHP", "PostgreSQL", 
    "Python", "REST API Design", "Ruby on Rails", "Spring Boot", "SQL"
  ].sort(),
  "DevOps & Infrastructure": [
    "Ansible", "AWS", "Azure", "CI/CD", "Cybersecurity", 
    "Docker", "Elasticsearch", "Git", "Google Cloud", "Grafana", 
    "Jenkins", "Kubernetes", "Linux", "Networking", "Nginx", 
    "Prometheus", "Redis", "Serverless", "Terraform", "Testing/QA"
  ].sort(),
  "Data & AI": [
    "Big Data", "Business Intelligence", "Computer Vision", "Data Analysis", "Data Engineering", 
    "Data Mining", "Data Visualization", "Deep Learning", "ETL", "Machine Learning", 
    "Natural Language Processing", "NumPy", "Pandas", "Power BI", "PyTorch", 
    "R", "Reinforcement Learning", "Statistical Analysis", "Tableau", "TensorFlow"
  ].sort(),
  "Product & Management": [
    "Agile Methodologies", "Business Analysis", "Client Communication", "Content Strategy", "Digital Marketing", 
    "Growth Hacking", "JIRA", "Market Research", "Product Management", "Product Strategy", 
    "Project Management", "Sales", "Scrum", "SEO/SEM", "Stakeholder Management", 
    "Team Leadership", "Technical Writing", "User Testing", "UX Research", "Wireframing"
  ].sort(),
  "Mobile & Other": [
    "Accessibility Testing", "Android Development", "AR/VR", "Blockchain", "Cross-platform Development", 
    "Desktop Applications", "Electron", "Embedded Systems", "Flutter", "Game Development", 
    "iOS Development", "IoT", "Kotlin", "Mobile UI Design", "React Native", 
    "Swift", "Technical Support", "Unity", "WebRTC", "Xamarin"
  ].sort()
};

// Alphabetically sorted categories
const SORTED_CATEGORIES = Object.keys(SKILLS_BY_CATEGORY).sort();

const FormToCreateTeamComponent = () => {
  const { toast } = useToast();
  const { userEmail } = useAuth();
  const [isModalShown, setIsModalShown] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', body: '' });
  const [searchTerm, setSearchTerm] = useState("");

  // Schema definition for form validation
  const formSchema = z.object({
    email: z.string().email("Invalid email address."),
    teamName: z.string().min(3, { message: "Team Name must be at least 3 characters." }),
    teamDescription: z.string().min(2, { message: "Team Description must be at least 2 characters." }),
    teamType: z.string().min(1, { message: "Team Type is required." }),
    roles: z.string().min(2, { message: "Roles must be at least 2 characters." }),
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
      email: userEmail,
      teamName: "",
      teamDescription: "",
      teamType: "",
      roles: "",
      skills: [],
      teamVisibility: "",
      additionalNotes: "",
    },
  });

  // Filter skills based on search term
  const getFilteredSkills = () => {
    if (!searchTerm.trim()) {
      // Return all skills but maintain the original structure
      const result = {};
      SORTED_CATEGORIES.forEach(category => {
        result[category] = SKILLS_BY_CATEGORY[category];
      });
      return result;
    }
    
    const filtered = {};
    SORTED_CATEGORIES.forEach(category => {
      const matchedSkills = SKILLS_BY_CATEGORY[category].filter(skill => 
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      if (matchedSkills.length > 0) {
        filtered[category] = matchedSkills;
      }
    });
    
    return filtered;
  };

  const filteredSkills = getFilteredSkills();
  const filteredCategories = Object.keys(filteredSkills);

  async function onSubmit(values) {
    const response = await FormToCreateTeamService.createTeam(values);
    
    if (response.success) {
      setModalContent({
        title: 'Your Matches',
        body: response.data.data.map((match, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow-md mb-3 border border-gray-200">
            <h2 className="text-xl font-bold mb-2">{match.user.username}</h2>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <p><span className="font-semibold">Role:</span> {match.user.role}</p>
              <p><span className="font-semibold">Experience:</span> {match.user.experienceLevel}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <p><span className="font-semibold">Availability:</span> {match.user.availability}</p>
              <p><span className="font-semibold">Email:</span> <a href={`mailto:${match.user.email}`} className="text-blue-600 hover:underline">{match.user.email}</a></p>
            </div>
            <p className="mb-2"><span className="font-semibold">Skills:</span> {match.user.skills.join(', ')}</p>
            <p className="mb-2"><span className="font-semibold">Portfolio:</span> <a href={match.user.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{match.user.portfolio}</a></p>
            <p className="mb-2"><span className="font-semibold">Notes:</span> {match.user.additionalNotes}</p>
            <p className={`font-bold text-lg ${
              match.matchPercentage > 90 
                ? 'text-green-600' 
                : match.matchPercentage >= 70 
                  ? 'text-blue-600' 
                  : 'text-orange-600'
            }`}>
              {match.matchPercentage > 90 
                ? '✓ Great Match' 
                : match.matchPercentage >= 70 
                  ? '✓ Good Match' 
                  : '⚠ Possible Match'} 
              <span className="ml-2">({match.matchPercentage}%)</span>
            </p>
          </div>
        ))
      });
      
      setIsModalShown(true);
      toast({
        variant: "success",
        title: "Success",
        description: "Team created successfully!",
      });
      form.reset();
      setSearchTerm("");
    } else {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: `${response.message}`,
      });
    }
  }

  const handleClear = () => {
    form.reset();
    setSearchTerm("");
  };

  // Get all unique skills for quick selection feature
  const getAllSkills = () => {
    const allSkills = [];
    Object.values(SKILLS_BY_CATEGORY).forEach(skills => {
      allSkills.push(...skills);
    });
    return allSkills.sort();
  };

  const allSkillsSorted = getAllSkills();

  // Common skill suggestions
  const commonSkills = ["JavaScript", "React", "Python", "SQL", "UI Design", "HTML/CSS"];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Create a New Team</h1>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Top Row: Team Name, Type, and Visibility */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="teamName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Team Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Capstone Team" className="rounded-md" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="teamType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Team Type</FormLabel>
                  <FormControl>
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger className="rounded-md">
                        <SelectValue placeholder="Select a team type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {/* Alphabetically sorted team types */}
                          <SelectItem value="airesearch">AI Research Team</SelectItem>
                          <SelectItem value="datascience">Data Science Team</SelectItem>
                          <SelectItem value="designteam">Design Team</SelectItem>
                          <SelectItem value="developmentteam">Development Team</SelectItem>
                          <SelectItem value="marketingteam">Marketing Team</SelectItem>
                          <SelectItem value="productteam">Product Team</SelectItem>
                          <SelectItem value="researchgroup">Research Group</SelectItem>
                          <SelectItem value="studygroup">Study Group</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="teamVisibility"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Team Visibility</FormLabel>
                  <FormControl>
                    <RadioGroup 
                      onValueChange={field.onChange} 
                      defaultValue={field.value} 
                      className="flex items-center space-x-6 pt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="private" id="private" />
                        <label htmlFor="private" className="text-sm">Private</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="public" id="public" />
                        <label htmlFor="public" className="text-sm">Public</label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
          </div>

          {/* Team Description */}
          <FormField
            control={form.control}
            name="teamDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Team Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe your team's purpose and goals" 
                    className="rounded-md resize-none h-24"
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />

          {/* Roles */}
          <FormField
            control={form.control}
            name="roles"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Roles Needed</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g., Frontend Developer, UI Designer, Project Manager" 
                    className="rounded-md"
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />

          {/* Skills - Search and category display */}
          <FormField
            control={form.control}
            name="skills"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center mb-2">
                  <FormLabel className="text-sm font-medium">Skills Required</FormLabel>
                  <div className="text-xs text-gray-500">
                    {field.value?.length || 0} skills selected
                  </div>
                </div>
                
                {/* Skills Search Box */}
                <div className="mb-4">
                  <Input
                    type="search"
                    placeholder="Search skills..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="rounded-md"
                  />
                </div>
                
                {/* Common Skills Quick Selection */}
                {!searchTerm && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">Common skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {commonSkills.map(skill => (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => {
                            const isSelected = field.value?.includes(skill);
                            const updatedSkills = isSelected
                              ? field.value.filter(s => s !== skill)
                              : [...(field.value || []), skill];
                            field.onChange(updatedSkills);
                          }}
                          className={`px-2 py-1 text-xs rounded-full ${
                            field.value?.includes(skill)
                              ? 'bg-blue-100 text-blue-700 border border-blue-300'
                              : 'bg-gray-100 text-gray-700 border border-gray-200'
                          }`}
                        >
                          {skill} {field.value?.includes(skill) && '✓'}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                <FormControl>
                  <div className="border rounded-md p-4 bg-gray-50 max-h-96 overflow-y-auto">
                    {filteredCategories.length === 0 ? (
                      <p className="text-center text-gray-500 py-4">No skills match your search</p>
                    ) : (
                      filteredCategories.map(category => (
                        <div key={category} className="mb-4">
                          <h3 className="font-medium text-sm mb-2 text-gray-700 flex items-center">
                            <span>{category}</span>
                            <span className="ml-2 text-xs text-gray-500">({filteredSkills[category].length})</span>
                          </h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {filteredSkills[category].map(skill => (
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
                                  className="h-4 w-4"
                                />
                                <label htmlFor={skill} className="text-sm">{skill}</label>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </FormControl>

                {/* Selected Skills Summary */}
                {field.value?.length > 0 && (
                  <div className="mt-2 p-2 bg-gray-50 rounded-md">
                    <p className="text-xs font-medium mb-1">Selected skills:</p>
                    <div className="flex flex-wrap gap-1">
                      {field.value.sort().map(skill => (
                        <span 
                          key={skill} 
                          className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => {
                              field.onChange(field.value.filter(s => s !== skill));
                            }}
                            className="ml-1 text-blue-500 hover:text-blue-700"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />

          {/* Additional Notes */}
          <FormField
            control={form.control}
            name="additionalNotes"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Additional Notes</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Any other information that might be helpful" 
                    className="rounded-md resize-none h-20"
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />

          {/* Email - Read-only */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="max-w-md">
                <FormLabel className="text-sm font-medium">Contact Email</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    defaultValue={field.value} 
                    readOnly 
                    className="bg-gray-100 rounded-md"
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-2">
            <Button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
            >
              Create Team
            </Button>
            <Button 
              type="button" 
              onClick={handleClear}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-md"
            >
              Clear Form
            </Button>
          </div>
        </form>
      </Form>

      <PopupModal
        isShown={isModalShown}
        title={modalContent.title}
        body={modalContent.body}
        onClose={() => setIsModalShown(false)}
      />
    </div>
  );
};

export default FormToCreateTeamComponent;