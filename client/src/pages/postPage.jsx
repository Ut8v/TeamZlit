import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PostIndexService } from "../services/PostIndexService";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/loading/loader";

const PostPage = () => {
  const { id } = useParams();  // Extract the ID from the URL
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) {
        setError("Invalid post ID.");
        return;
      }
      
      const response = await PostIndexService.getPostById(id);
      if (response.success) {
        setPost(response.data.data);
      } else {
        setError(response.message || "Failed to fetch post.");
      }
    };

    fetchPost();
  }, [id]);

  const handleDeletePost = async () => {
    const response = await PostIndexService.deletePost(id);
    if (response.success) {
      toast({
        title: "Post deleted successfully",
        variant: "success",
      });
      navigate("/postIndex");
    } else {
      toast({
        title: "Error deleting post",
        description: response.error,
        variant: "destructive",
      });
    }
  };

  const formatTeamType = (teamType) => {
    const typeMap = {
      developmentteam: "Development Team",
      researchgroup: "Research Group",
      studygroup: "Study Group"
    };
    return typeMap[teamType.toLowerCase()] || teamType;
  };

  if (error) return <p className="text-red-500">{error}</p>;
  if (!post) return <Loader />;

  if(post.posts.postType === "createTeam") {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl bg-[#2e5669] border-[#0f3445] shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-white">{post.posts.teamName}</CardTitle>
          <p className="text-center text-lg text-white/80 mt-2">{post.posts.teamDescription}</p>
        </CardHeader>
        <CardContent className="p-6">
          {/* Display Skills */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-white mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {post.posts.skills?.map((skill, index) => (
                <Badge 
                  key={index} 
                  className="bg-[#008780] text-white hover:bg-[#008780]/90"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <Separator className="my-4 bg-white/20" />

          {/* Display Team Type */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-white mb-2">Team Type</h3>
            <p className="text-white/80">{formatTeamType(post.posts.teamType)}</p>
          </div>

          <Separator className="my-4 bg-white/20" />

          {/* Display Roles */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-white mb-2">Roles</h3>
            <p className="text-white/80">{post.posts.roles}</p>
          </div>

          {post.posts.additionalNotes && (
            <>
              <Separator className="my-4 bg-white/20" />
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Additional Notes</h3>
                <p className="text-white/80">{post.posts.additionalNotes}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
  }
  else{
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-4xl bg-[#2e5669] border-[#0f3445] shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-white">{post.posts.username}</CardTitle>
            <p className="text-center text-lg text-white/80 mt-2">{post.posts.email}</p>
            <p className="text-center text-lg text-white/80 mt-2">{post.posts.portfolio}</p>
          </CardHeader>
          <CardContent className="p-6">
            {/* Display Skills */}
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-white mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {post.posts.skills?.map((skill, index) => (
                  <Badge 
                    key={index} 
                    className="bg-[#008780] text-white hover:bg-[#008780]/90"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
  
            <Separator className="my-4 bg-white/20" />
  
            {/* Display Roles */}
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-white mb-2">Roles</h3>
              <p className="text-white/80">{post.posts.role}</p>
            </div>

            <Separator className="my-4 bg-white/20" />

            <div className="mb-4">
              <h3 className="text-xl font-semibold text-white mb-2">Experience Level</h3>
              <p className="text-white/80">{post.posts.experienceLevel}</p>
            </div>

            <Separator className="my-4 bg-white/20" />

            <div className="mb-4">
              <h3 className="text-xl font-semibold text-white mb-2">Availability</h3>
              <p className="text-white/80">{post.posts.availability}</p>
            </div>

            <Separator className="my-4 bg-white/20" />

            <div className="mb-4">
              <h3 className="text-xl font-semibold text-white mb-2">Interest Areas</h3>
              <p className="text-white/80">{post.posts.interestAreas}</p>
            </div>
  
            {post.posts.additionalNotes && (
              <>
                <Separator className="my-4 bg-white/20" />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Additional Notes</h3>
                  <p className="text-white/80">{post.posts.additionalNotes}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }
};

export default PostPage;

