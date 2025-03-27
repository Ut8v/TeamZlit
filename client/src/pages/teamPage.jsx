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

  const handleJoinTeam = async () => {
    console.log("Joining team...");
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">{team.teamName}</CardTitle>
          <p className="text-center text-lg text-gray-600 mt-2">{team.teamDescription}</p>
        </CardHeader>
        <CardContent>
          {/* Display Skills */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700">Skills</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {team.skills?.map((skill, index) => (
                <Badge key={index} variant="outline" className="text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <Separator className="my-4" />

          {/* Display Team Type */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700">Team Type</h3>
            <p className="mt-1 text-gray-600">{formatTeamType(team.teamType)}</p>
          </div>

          <Separator className="my-4" />

          {/* Display Roles */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700">Roles</h3>
            <p className="mt-1 text-gray-600">{team.roles}</p>
          </div>

          {team.additionalNotes && (
            <>
              <Separator className="my-4" />
              <div>
                <h3 className="text-xl font-semibold text-gray-700">Additional Notes</h3>
                <p className="mt-1 text-gray-600">{team.additionalNotes}</p>
              </div>
            </>
          )}

          <div className="mt-6 text-center">
            {
              team.isMyTeam ? (
                <Button className="px-4 py-2 btn btn-danger" onClick={handleDeleteTeam}>
                  Delete Team
                </Button>
              ) : (
                <Button variant="default" className="px-4 py-2" onClick={handleJoinTeam}>
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
