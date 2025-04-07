import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PostIndexService } from '@/services/PostIndexService';
import { useNavigate } from 'react-router-dom';
import Loader from '@/components/loading/loader';

const PostIndex = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await PostIndexService.getPosts();
        if (Array.isArray(response.data.data)) {
          setPosts(response.data.data);
        } else {
          console.error("Expected an array, but received:", response);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const handleViewDetails = (postId) => {
    navigate(`/postPage/${postId}`);
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
    return typeMap[teamType?.toLowerCase()] || teamType || "Unknown Team Type";
  };

  const createTeamPosts = posts.filter(
    (post) =>
      post.posts.postType === 'createTeam' &&
      (post.posts.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formatTeamType(post.posts.teamType).toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.posts.teamDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.posts.roles.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.posts.additionalNotes.toLowerCase().includes(searchTerm.toLowerCase())) 
  );

  const findTeamPosts = posts.filter(
    (post) =>
      post.posts.postType === 'findTeam' &&
      (post.posts.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.posts.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.posts.portfolio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.posts.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.posts.experienceLevel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.posts.availability.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.posts.interestAreas.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.posts.additionalNotes.toLowerCase().includes(searchTerm.toLowerCase())) 
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">

      {/* Search Bar */}
      <div className="mb-6 w-full max-w-md">
        <Input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
      </div>

      <h1 className="text-xl font-bold mb-4">Teams Seeking Members</h1>     

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {createTeamPosts.map((post) => (
            <Card
              key={post.id}
              className="bg-[#2e5669] border-[#0f3445] shadow-lg"
            >
              <CardContent className="p-6 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {post.posts.teamName}
                </h2>

                <Badge className="mb-4 bg-[#008780] text-white hover:bg-[#008780]/90">
                  {formatTeamType(post.posts.teamType)}
                </Badge>

                <p className="text-white/80 text-center mt-2 mb-4">
                  {post.posts.teamDescription}
                </p>

                <Separator className="my-4 bg-white/20" />

                <div className="text-white/80 mb-4">
                  <strong>Looking for:</strong> {post.posts.roles}
                </div>

                <div className="text-white/80 mb-4">
                  <strong>Notes:</strong> {post.posts.additionalNotes}
                </div>

                <Button
                  className="w-full bg-[#008780] hover:bg-[#3fb182] transition-colors duration-300"
                  onClick={() => handleViewDetails(post.id)}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>

      <Separator className="my-4 bg-white/20" />
      <h1 className="text-xl font-bold mb-4">Users Seeking Teams</h1>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {findTeamPosts.map((post) => (
            <Card
              key={post.id}
              className="bg-[#2e5669] border-[#0f3445] shadow-lg"
            >
              <CardContent className="p-6 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {post.posts.username}
                </h2>

                <p className="text-white/80 text-center mt-2 mb-4">
                  {post.posts.email}
                </p>

                <p className="text-white/80 text-center mt-2 mb-4">
                  {post.posts.portfolio}
                </p>

                <Separator className="my-4 bg-white/20" />

                <div className="text-white/80 mb-4">
                  <strong>Preferred Role:</strong> {post.posts.role}
                </div>

                <div className="text-white/80 mb-4">
                  <strong>Experience Level:</strong> {post.posts.experienceLevel}
                </div>

                <div className="text-white/80 mb-4">
                  <strong>Availability:</strong> {post.posts.availability}
                </div>

                <div className="text-white/80 mb-4">
                  <strong>Interest Areas:</strong> {post.posts.interestAreas}
                </div>

                <div className="text-white/80 mb-4">
                  <strong>Notes:</strong> {post.posts.additionalNotes}
                </div>

                <Button
                  className="w-full bg-[#008780] hover:bg-[#3fb182] transition-colors duration-300"
                  onClick={() => handleViewDetails(post.id)}
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

export default PostIndex;