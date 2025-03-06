import GetFormContent from "@/services/getFormContent/getFormContent";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/loading/loader";
import { useToast } from "@/hooks/use-toast"

const MyForm = () => {
    const [formContent, setFormContent] = useState(null);
    const [matchedTeamsData, setMatchedTeamsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { toast } = useToast();

    useEffect(() => {
        const getFormContent = async () => {
            try {
                const response = await GetFormContent.getFormContent();
                const matchedTeams = await GetFormContent.getMyMatches();
                if (response.success) {
                    setFormContent(response.data);
                    setMatchedTeamsData(matchedTeams.data);
                }else {
                    setFormContent(null);
                }
            } catch (error) {
                toast({
                    title: "Error fetching form content",
                    description: `something went wrong ${error.message}`,
                    variant: "destructive",
                });
            } finally {
                setLoading(false);
            }
        };
        getFormContent();
    }, []);

    if (loading) {
        return <Loader />;
    }

    if (!formContent) {
        return (
            <div className="flex flex-col items-center bg-white p-6 border border-gray-200 rounded-md shadow-md">
                <p className="text-gray-600 mb-4">
                    You do not have an active form filled out.
                </p>
                <button
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
                    onClick={() => navigate('/findTeam')}
                >
                    Fill Out Find Team Form
                </button>
            </div>
        );
    }

    const deleteForm = async () => {
        try {
            const response = await GetFormContent.deleteFindTeamForm();
  
            if (response.status === 204) {
                toast({
                    title: "Form deleted successfully",
                    description: "Your form has been deleted.",
                    variant: "success",
                });
                navigate('/home');
                setFormContent(null);
            }
        } catch (error) {
            toast({
                title: "Error deleting form",
                description: error.message,
                variant: "destructive",
            });
        } 
    };

    return (
        <>
        <div className="flex justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>{formContent.username}</CardTitle>
                    <p className="text-sm text-muted-foreground">{formContent.email}</p>
                </CardHeader>
                <CardContent>
                    <p><strong>Role:</strong> {formContent.role}</p>
                    <p><strong>Experience Level:</strong> {formContent.experienceLevel}</p>
                    <p><strong>Availability:</strong> {formContent.availability}</p>
                    <p><strong>Preferred Team Type:</strong> {formContent.preferredTeamType}</p>
                    <p><strong>Portfolio:</strong> <a href={formContent.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-500">View Portfolio</a></p>
                    <p><strong>Additional Notes:</strong> {formContent.additionalNotes}</p>
                    <div className="mt-2">
                        <p><strong>Skills:</strong></p>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {formContent.skills.map((skill, index) => (
                                <Badge key={index} variant="outline">
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button variant="danger" onClick={deleteForm}>Delete</Button>
                </CardFooter>
            </Card>
        </div>
        <div className="flex justify-center p-4">
            <h1 className="text-2xl font-bold">{ matchedTeamsData.length > 0 ? `My Matches: ` : `No Matches`}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4 relative">
        {matchedTeamsData.map((team, index) => (
        <div key={index} className="relative group">
            <Card
                className="w-full cursor-pointer"
                onClick={() => navigate(`/teamPage/${team.id}`)}
            >
                <CardHeader className="p-2">
                    <CardTitle className="text-sm font-semibold">{team.teamName}</CardTitle>
                </CardHeader>
                <CardContent className="p-2">
                    <p className="text-xs">{team.teamDescription}</p>
                </CardContent>
                <CardFooter className="p-2">
                    <Button variant="primary" size="sm" className="w-full">
                        View Team
                    </Button>
                </CardFooter>
            </Card>

            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-muted text-primary text-xs px-2 py-1 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                Match Percentage: {team.match_percentage}%
            </div>
        </div>
        ))}
    </div>
    </div>
    </>  
    );
};

export default MyForm;
