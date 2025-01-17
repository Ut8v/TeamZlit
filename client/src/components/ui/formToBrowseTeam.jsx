import React, { useEffect, useState } from "react";
import { browseTeams } from "@/services/FormToBrowseTeam/browseTeam"; // Import the service
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const FormToBrowseTeamComponent = () => {
  const [teams, setTeams] = useState([]); // State to store team data
  const [error, setError] = useState(null); // State to store errors
  const { toast } = useToast(); // Custom toast hook for notifications

  // Fetch teams on component mount
  useEffect(() => {
    const fetchTeams = async () => {
      const response = await browseTeams();
      if (response.success) {
        setTeams(response.data);
      } else {
        setError(response.error);
        toast({
          title: "Error fetching teams",
          description: response.error,
          variant: "destructive",
        });
      }
    };

    fetchTeams();
  }, [toast]);

  // Render error state
  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  // Render the list of teams
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Browse Teams</h1>
      {teams.length > 0 ? (
        <ul className="list-disc pl-6">
          {teams.map((team) => (
            <li key={team.id} className="mb-2">
              <div className="font-semibold">{team.teamName || "Unnamed Team"}</div>
              <p className="text-gray-600">{team.teamDescription || "No description available."}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No teams available at the moment.</p>
      )}
      <Button onClick={() => window.location.reload()} className="mt-4">
        Refresh Teams
      </Button>
    </div>
  );
};

export default FormToBrowseTeamComponent;