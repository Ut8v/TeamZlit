import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { TeamIndexService } from '@/services/TeamIndexService';
import { useNavigate } from 'react-router-dom';
import Loader from '@/components/loading/loader';

const TeamIndex = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        const response = await TeamIndexService.getTeams();
        if (Array.isArray(response.data.data)) {
          setTeams(response.data.data);
        } else {
          console.error("Expected an array, but received:", response);
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
      setLoading(false);
    };
    fetchTeams();
  }, []);

  const handleViewDetails = (teamId) => {
    navigate(`/teamPage/${teamId}`);
  };

  const formatTeamType = (teamType) => {
    const typeMap = {
      developmentteam: "Development Team",
      researchgroup: "Research Group",
      studygroup: "Study Group"
    };
    return typeMap[teamType.toLowerCase()] || teamType;
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Team Directory</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {teams.map((team) => (
          <Card key={team.id} className="shadow-lg hover:shadow-xl transition duration-300 rounded-2xl overflow-hidden cursor-pointer">
            <CardHeader className="bg-blue-600 text-white p-4">
              <CardTitle className="text-xl font-bold">{team.teamName}</CardTitle>
            </CardHeader>
            <CardContent className="p-5">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Badge variant="outline" className="bg-blue-600 text-white px-3 py-1 rounded-full">
                      {formatTeamType(team.teamType)}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>{team.teamDescription}</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <p className="text-gray-700 text-sm mb-2 mt-3">{team.teamDescription}</p>
              <Separator className="my-3" />
              <div className="flex justify-between text-gray-600 text-sm">
                <span><strong>Looking for:</strong> {team.roles}</span>
              </div>
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  fullWidth 
                  onClick={() => handleViewDetails(team.id)}
                  className="bg-blue-600 text-white hover:bg-blue-700 transition duration-300 w-full py-2 rounded-lg">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeamIndex;