import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { TeamIndexService } from "../services/TeamIndexService";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/loading/loader";

const TeamPage = () => {
  const { id } = useParams();  // Extract the ID from the URL
  const [team, setTeam] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchTeam = async () => {
      if (!id) {
        setError("Invalid team ID.");
        return;
      }
      
      const response = await TeamIndexService.getTeamById(id);
      if (response.success) {
        setTeam(response.data.data);
      } else {
        setError(response.message || "Failed to fetch team.");
      }
    };

    fetchTeam();
  }, [id]);

  const handleDeleteTeam = async () => {
    const response = await TeamIndexService.deleteTeam(id);
    if (response.success) {
      toast({
        title: "Team deleted successfully",
        variant: "success",
      });
      navigate("/teamIndex");
    } else {
      toast({
        title: "Error deleting team",
        description: response.error,
        variant: "destructive",
      });
    }
  };

  const formatTeamType = (teamType) => {
    const typeMap = {
      developmentteam: "Development Team",
      researchgroup: "Research Group",
      studygroup: "Study Group"
    };
    return typeMap[teamType.toLowerCase()] || teamType;
  };

  if (error) return <p className="text-red-500">{error}</p>;
  if (!team) return <Loader />;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl bg-[#2e5669] border-[#0f3445] shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-white">{team.teamName}</CardTitle>
          <p className="text-center text-lg text-white/80 mt-2">{team.teamDescription}</p>
        </CardHeader>
        <CardContent className="p-6">
          {/* Display Skills */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-white mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {team.skills?.map((skill, index) => (
                <Badge 
                  key={index} 
                  className="bg-[#008780] text-white hover:bg-[#008780]/90"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <Separator className="my-4 bg-white/20" />

          {/* Display Team Type */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-white mb-2">Team Type</h3>
            <p className="text-white/80">{formatTeamType(team.teamType)}</p>
          </div>

          <Separator className="my-4 bg-white/20" />

          {/* Display Roles */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-white mb-2">Roles</h3>
            <p className="text-white/80">{team.roles}</p>
          </div>

          {team.additionalNotes && (
            <>
              <Separator className="my-4 bg-white/20" />
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Additional Notes</h3>
                <p className="text-white/80">{team.additionalNotes}</p>
              </div>
            </>
          )}

          <div className="mt-6 text-center">
            {
              team.isMyTeam ? (
                <Button 
                  className="w-full bg-red-600 hover:bg-red-700 transition-colors duration-300"
                  onClick={handleDeleteTeam}
                >
                  Delete Team
                </Button>
              ) : (
                <Button 
                  className="w-full bg-[#008780] hover:bg-white/90 transition-colors duration-300"
                >
                  Join Team
                </Button>
              )
            }
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamPage;