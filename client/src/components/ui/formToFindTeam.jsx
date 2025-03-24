import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/auth/authContext";
import { useEffect, useState } from "react";

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
import { 
  Select, 
  SelectTrigger, 
  SelectContent, 
  SelectItem, 
  SelectValue,
  SelectGroup
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { FormToFindTeamService } from "../../services/FormToFindService/findTeam";
import PopupModal from "../models/popup";

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

const FormToFindTeamComponent = () => {
  const { toast } = useToast();
  const [isModalShown, setIsModalShown] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', body: '' });
  const { userEmail, user } = useAuth();
  const [hasActiveForm, setHasActiveForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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
      username: user,
      email: userEmail,
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

  useEffect(() => {
    async function checkActiveForm() {
      const response = await FormToFindTeamService.activeFormCheck();
      setHasActiveForm(response.data);
    }
    checkActiveForm();
  }, []);

  async function onSubmit(values) {
    const response = await FormToFindTeamService.findTeam(values);
    if (response.success) {
      setModalContent({
        title: 'Your Matches',
        body: response.data.data.map((match, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow-md mb-3 border border-gray-200">
            <h2 className="text-xl font-bold mb-2">{match.team.teamName}</h2>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <p><span className="font-semibold">Description:</span> {match.team.teamDescription}</p>
              <p><span className="font-semibold">Team Type:</span> {match.team.teamType}</p>
            </div>
            <p className="mb-2"><span className="font-semibold">Skills Needed:</span> {match.team.skills.join(', ')}</p>
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
        title: "Profile Submitted",
        description: "Your profile has been submitted. Check your matches!",
      });
      form.reset();
      setSearchTerm("");
    } else {
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: `${response.message}`,
      });
    }
  }

  const handleClear = () => {
    form.reset();
    setSearchTerm("");
  };

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

  // Common skill suggestions
  const commonSkills = ["JavaScript", "React", "Python", "SQL", "UI Design", "HTML/CSS"];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Find Your Ideal Team</h1>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Top Row: User Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Username</FormLabel>
                  <FormControl>
                    <Input {...field} defaultValue={field.value} readOnly className="bg-gray-50 rounded-md" />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Email</FormLabel>
                  <FormControl>
                    <Input {...field} defaultValue={field.value} readOnly className="bg-gray-50 rounded-md" />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="portfolio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Portfolio/LinkedIn/GitHub</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your portfolio link" className="rounded-md" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
          </div>

          {/* Second Row: Role, Experience, Availability */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Preferred Role</FormLabel>
                  <FormControl>
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger className="rounded-md">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="Frontend Developer">Frontend Developer</SelectItem>
                          <SelectItem value="Backend Developer">Backend Developer</SelectItem>
                          <SelectItem value="Full Stack Developer">Full Stack Developer</SelectItem>
                          <SelectItem value="UI/UX Designer">UI/UX Designer</SelectItem>
                          <SelectItem value="Data Scientist">Data Scientist</SelectItem>
                          <SelectItem value="DevOps Engineer">DevOps Engineer</SelectItem>
                          <SelectItem value="Project Manager">Project Manager</SelectItem>
                          <SelectItem value="Product Manager">Product Manager</SelectItem>
                          <SelectItem value="QA Engineer">QA Engineer</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
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
              name="experienceLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Experience Level</FormLabel>
                  <FormControl>
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger className="rounded-md">
                        <SelectValue placeholder="Select your experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="Beginner">Beginner</SelectItem>
                          <SelectItem value="Intermediate">Intermediate</SelectItem>
                          <SelectItem value="Advanced">Advanced</SelectItem>
                          <SelectItem value="Expert">Expert</SelectItem>
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
              name="availability"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Availability</FormLabel>
                  <FormControl>
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger className="rounded-md">
                        <SelectValue placeholder="Select your availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="Full-time">Full-time</SelectItem>
                          <SelectItem value="Part-time">Part-time</SelectItem>
                          <SelectItem value="Weekends only">Weekends only</SelectItem>
                          <SelectItem value="Evenings only">Evenings only</SelectItem>
                          <SelectItem value="Flexible">Flexible</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
          </div>

          {/* Interest Areas */}
          <FormField
            control={form.control}
            name="interestAreas"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Interest Areas</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe your areas of interest, projects you'd like to work on, or technologies you want to learn" 
                    className="rounded-md resize-none h-24"
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />

          {/* Preferred Team Type */}
          <FormField
            control={form.control}
            name="preferredTeamType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Preferred Team Type</FormLabel>
                <FormControl>
                  <Select {...field} onValueChange={field.onChange}>
                    <SelectTrigger className="rounded-md">
                      <SelectValue placeholder="Select your preferred team type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
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

          {/* Skills - Search and category display */}
          <FormField
            control={form.control}
            name="skills"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center mb-2">
                  <FormLabel className="text-sm font-medium">Skills</FormLabel>
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
                    placeholder="Add any other information that might help us match you with the right team" 
                    className="rounded-md resize-none h-24"
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />

          {/* Active Form Warning */}
          {hasActiveForm && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-800">
              <p className="flex items-center text-sm">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                You already have an active profile. Submitting a new one will update your existing profile.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-2">
            <Button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
            >
              Submit Profile
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

export default FormToFindTeamComponent;