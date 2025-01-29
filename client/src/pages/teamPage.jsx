import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";


const timeSlots = {
  Morning: { icon: "🌅", label: "Morning (5 AM - 12 PM)" },
  Afternoon: { icon: "☀️", label: "Afternoon (12 PM - 5 PM)" },
  Evening: { icon: "🌆", label: "Evening (5 PM - 9 PM)" },
  Night: { icon: "🌙", label: "Night (9 PM - 4 AM)" },
};

const GroupPage = () => {
  // Sample data; this would be dynamically fetched
  const team = {
    name: "2D Souls-Like",
    type: "Game Development",
    roles: [
      { name: "Lead Developer", filled: 0, total: 1 },
      { name: "Game Developer", filled: 1, total: 2 }, // 1 out of 2 filled
      { name: "2D Artist", filled: 1, total: 1 },
      { name: "Network Engineer", filled: 0, total: 1 },
    ],
    skills: ["C#", "Unity Engine", "Pixel Art", "Game Physics", "AI Behavior Scripting", "Multiplayer Networking", "Boss Design"],
    visibility: "Public",
    notes: "A challenging 2D Souls-like game with fluid combat, deep lore, and a dark, atmospheric world. Players must master precise dodging, parrying, and stamina management to defeat powerful foes.",
    schedule: {
      Monday: ["Afternoon", "Evening"],
      Tuesday: ["Morning", "Night"],
      Wednesday: ["Evening"],
      Thursday: ["Afternoon"],
      Friday: ["Morning", "Evening"],
      Saturday: ["Night"],
      Sunday: [],
    },
  };

  const handleRequestRole = (role) => {
    if (role.filled < role.total) {
      console.log(`User requested to join as: ${role.name}`);
      alert(`Request to join as "${role.name}" sent!`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-3xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">{team.name}</CardTitle>
          <p className="text-center text-gray-500 mt-2">{team.type}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Roles</h2>
            <div className="mt-2 space-y-2">
              {team.roles.map((role, index) => (
                <div 
                  key={index} 
                  className={`flex items-center justify-between p-2 rounded-lg shadow-sm border ${
                    role.filled === role.total ? "bg-gray-200 text-gray-500 line-through" : "bg-white"
                  }`}
                >
                  <Badge variant="outline" className="text-sm">
                    {role.name} ({role.filled}/{role.total})
                  </Badge>
                  {role.filled < role.total ? (
                    <Button variant="secondary" className="text-sm" onClick={() => handleRequestRole(role)}>
                      Request Role
                    </Button>
                  ) : (
                    <span className="text-sm italic">Filled</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h2 className="text-lg font-semibold text-gray-700">Schedule</h2>
            <div className="mt-2 grid grid-cols-7 gap-2 text-center">
              {Object.entries(team.schedule).map(([day, times]) => (
                <div key={day} className="p-2 border rounded-lg shadow-sm">
                  <p className="font-medium text-gray-700">{day.slice(0, 3)}</p>
                  <div className="flex flex-wrap justify-center gap-1 mt-1">
                    {times.length > 0 ? (
                      times.map((time) => (
                        <TooltipProvider>
                          <Tooltip key={time}>
                            <TooltipTrigger asChild>
                              <span className="cursor-pointer text-lg">{timeSlots[time].icon}</span>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="bg-gray-900 text-white text-xs p-2 rounded-md">
                              {timeSlots[time].label}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ))
                    ) : (
                      <p className="text-xs text-gray-400 italic">-</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h2 className="text-lg font-semibold text-gray-700">Skills</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {team.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h2 className="text-lg font-semibold text-gray-700">Visibility</h2>
            <p className="mt-1 text-gray-600">{team.visibility}</p>
          </div>

          <Separator />

          <div>
            <h2 className="text-lg font-semibold text-gray-700">Additional Notes</h2>
            <p className="mt-1 text-gray-600 leading-relaxed">{team.notes}</p>
          </div>

          <div className="mt-6 flex justify-center">
            <Button variant="default" className="px-4 py-2">
              Join Team
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GroupPage;
