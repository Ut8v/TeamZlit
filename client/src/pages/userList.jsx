
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
        }
        fetchUsers();

    }, []);

    const handleUserDetails = (userId) => {
        try{
            navigate(`/userPage/${userId}`);
        }
        catch (error) {
            toast({
                title: "Error navigating to user profile",
                description: error.message,
                variant: "destructive",
            });
        }
    }

    if (loading) {
        return <Loader />;
    }

    return (
        <><p className="text-bold">Users you may know</p><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {users.map((user) => (
                <Card key={user.id} className="p-4">
                    <CardHeader className="flex items-center gap-4">
                        <Avatar className="w-12 h-12">
                            <AvatarImage src={user.profilePic} alt={user.username} />
                            <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle>Name: {user.username}</CardTitle>
                            <CardDescription>Bio: {user.bio ? user.bio : `Bio not availabe`}</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="mt-4">
                        <Button variant="outline" onClick={() => handleUserDetails(user.id)}>View Details</Button>
                    </CardContent>
                </Card>
            ))}
        </div></>
    );
};

export default UserListPage;
