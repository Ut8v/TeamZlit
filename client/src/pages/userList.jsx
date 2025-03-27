import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import UserList from "@/services/UserList/getUserList";
import { useEffect, useState } from "react";
import Loader from "@/components/loading/loader";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const UserListPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await UserList.getUserList();
            if (response.success) {
                setUsers(response.data.data);
            } else {
                toast({
                    title: "Error fetching users",
                    description: response.error,
                    variant: "destructive",
                });
                setUsers([]);
                return;
            }
            setLoading(false);
        };
        fetchUsers();
    }, []);

    const handleUserDetails = (userId) => {
        try {
            navigate(`/userPage/${userId}`);
        } catch (error) {
            toast({
                title: "Error navigating to user profile",
                description: error.message,
                variant: "destructive",
            });
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-white">Users You May Know</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {users.map((user) => (
                        <Card 
                            key={user.id} 
                            className="bg-[#2e5669] border-[#0f3445] shadow-lg"
                        >
                            <CardContent className="p-6 text-center">
                                <Avatar className="w-24 h-24 mx-auto mb-4">
                                    <AvatarImage src={user.profilePic} alt={user.username} />
                                    <AvatarFallback className="text-xl font-bold text-white">
                                        {user.username.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>

                                <h2 className="text-2xl font-bold text-white">{user.username}</h2>
                                <p className="text-white/80 text-center mt-2 mb-4">
                                    {user.bio ? user.bio : "Bio not available"}
                                </p>

                                <Button 
                                    className="w-full bg-[#008780] hover:bg-[#3fb182] transition-colors duration-300"
                                    onClick={() => handleUserDetails(user.id)}
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

export default UserListPage;