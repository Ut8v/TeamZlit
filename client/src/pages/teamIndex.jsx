import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
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
      studygroup: "Study Group",
      airesearch: "AI Research Team",
      datascience: "Data Science Team",
      designteam: "Design Team",
      marketingteam: "Marketing Team",
      productteam: "Product Team",
      other: "Other",
    };
    return typeMap[teamType.toLowerCase()] || teamType;
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team) => (
            <Card 
              key={team.id} 
              className="bg-[#2e5669] border-[#0f3445] shadow-lg"
            >
              <CardContent className="p-6 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">{team.teamName}</h2>
                
                <Badge 
                  className="mb-4 bg-[#008780] text-white hover:bg-[#008780]/90"
                >
                  {formatTeamType(team.teamType)}
                </Badge>

                <p className="text-white/80 text-center mt-2 mb-4">
                  {team.teamDescription || "Description not available"}
                </p>

                <Separator className="my-4 bg-white/20" />

                <div className="text-white/80 mb-4">
                  <strong>Looking for:</strong> {team.roles}
                </div>

                <Button 
                  className="w-full bg-[#008780] hover:bg-[#3fb182] transition-colors duration-300"
                  onClick={() => handleViewDetails(team.id)}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </div>
  );
};

export default TeamIndex;