import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Users, UserPlus, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from '../auth/authContext';

const Home = () => {
    const {userName} = useAuth();
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <Card className="w-full max-w-md bg-[#2e5669] border-[#0f3445] shadow-lg">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold text-white">
                        Welcome to TeamZlit {userName}
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6 text-center">
                    <p className="text-white/80 mb-6">Find or create teams that match your interests.</p>
                    <Separator className="mb-6 bg-white/20" />
                    <div className="flex flex-col space-y-4">
                        <Link to="/findTeam">
                            <Button 
                                className="w-full flex items-center gap-3 py-3 text-lg bg-[#008780] hover:bg-[#3fb182] transition-colors duration-300" 
                                variant="default"
                            >
                                <UserPlus className="w-6 h-6" /> Find a Team
                            </Button>
                        </Link>
                        <Link to="/createTeam">
                            <Button 
                                className="w-full flex items-center gap-3 py-3 text-lg bg-[#008780] hover:bg-[#3fb182] transition-colors duration-300" 
                            >
                                <Users className="w-6 h-6" /> Create a Team
                            </Button>
                        </Link>
                        <Link to="/teamIndex">
                            <Button 
                                className="w-full flex items-center gap-3 py-3 text-lg bg-[#008780] hover:bg-[#3fb182] transition-colors duration-300" 
                            >
                                <Search className="w-6 h-6" /> View Existing Teams
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Home;