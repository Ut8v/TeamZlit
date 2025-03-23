import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Users You May Know</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {users.map((user) => (
                    <Card key={user.id} className="shadow-lg hover:shadow-xl transition duration-300 rounded-2xl overflow-hidden cursor-pointer">
                        <CardHeader className="flex flex-col items-center p-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white relative">
                            <Avatar className="w-16 h-16 border-2 border-white shadow-md">
                                <AvatarImage src={user.profilePic} alt={user.username} />
                                <AvatarFallback className="bg-gray-700 text-white font-bold">{user.username.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <CardTitle className="mt-3 text-lg font-bold text-white">{user.username}</CardTitle>
                            <CardDescription className="text-sm text-gray-200 mt-1 text-center px-4">
                                {user.bio ? user.bio : "Bio not available"}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 flex justify-center">
                            <Button variant="outline" className="w-full hover:bg-indigo-600 hover:text-white transition duration-300 font-semibold" onClick={() => handleUserDetails(user.id)}>
                                View Details
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default UserListPage;
