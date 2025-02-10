import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Users, UserPlus, Search } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <Card className="w-full max-w-md shadow-lg p-6">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Welcome to TeamZlit</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-gray-600 mb-6">Find or create teams that match your interests.</p>
                    <Separator className="mb-6" />
                    <div className="flex flex-col space-y-4">
                        <Link to="/findTeam">
                            <Button className="w-full flex items-center gap-3 py-3 text-lg" variant="default">
                                <UserPlus className="w-6 h-6" /> Find a Team
                            </Button>
                        </Link>
                        <Link to="/createTeam">
                            <Button className="w-full flex items-center gap-3 py-3 bg-green-600 hover:bg-green-700 text-white text-lg" variant="secondary">
                                <Users className="w-6 h-6" /> Create a Team
                            </Button>
                        </Link>
                        <Link to="/teamIndex">
                            <Button className="w-full flex items-center gap-3 py-3 text-lg" variant="outline">
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
