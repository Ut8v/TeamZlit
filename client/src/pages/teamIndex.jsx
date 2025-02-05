import { useEffect, useState } from 'react';
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { TeamIndexService } from '@/services/TeamIndexService';

const TeamIndex = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await TeamIndexService.getTeams();
        if (Array.isArray(response.data.data)) {
          setTeams(response.data.data);
        } else {
          console.error("Expected an array, but received:", response);
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, []);

  const handleCardClick = (teamId) => {
    console.log("Clicked on team ID:", teamId);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {teams.map((team) => (
        <Card key={team.id} className="cursor-pointer" onClick={() => handleCardClick(team.id)}>
          <CardHeader>
            <CardTitle>{team.teamName}</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Badge variant="outline">{team.teamType}</Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <span>{team.teamDescription}</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardHeader>
          <CardContent>
            <p>{team.teamDescription}</p>
            <Separator className="my-2" />
            <div className="flex justify-between">
              <span>Roles: {team.roles}</span>
              <span>Visibility: {team.visibility}</span>
            </div>
            <div className="mt-4">
              <Button variant="outline" fullWidth>
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TeamIndex;
