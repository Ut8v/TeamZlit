import GetFormContent from "@/services/getFormContent/getFormContent";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/loading/loader";
import { useToast } from "@/hooks/use-toast"

const MyForm = () => {
    const [formContent, setFormContent] = useState(null);
    const [matchedTeamsData, setMatchedTeamsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { toast } = useToast();

    useEffect(() => {
        const getFormContent = async () => {
            try {
                const response = await GetFormContent.getFormContent();
                const matchedTeams = await GetFormContent.getMyMatches();
                if (response.success) {
                    setFormContent(response.data);
                    setMatchedTeamsData(matchedTeams.data);
                }else {
                    setFormContent(null);
                }
            } catch (error) {
                toast({
                    title: "Error fetching form content",
                    description: `something went wrong ${error.message}`,
                    variant: "destructive",
                });
            } finally {
                setLoading(false);
            }
        };
        getFormContent();
    }, []);

    if (loading) {
        return <Loader />;
    }

    if (!formContent) {
        return (
            <div className="flex flex-col items-center bg-white p-6 border border-gray-200 rounded-md shadow-md">
                <p className="text-gray-600 mb-4">
                    You do not have an active form filled out.
                </p>
                <button
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
                    onClick={() => navigate('/findTeam')}
                >
                    Fill Out Find Team Form
                </button>
            </div>
        );
    }

    const deleteForm = async () => {
        try {
            const response = await GetFormContent.deleteFindTeamForm();
  
            if (response.status === 204) {
                toast({
                    title: "Form deleted successfully",
                    description: "Your form has been deleted.",
                    variant: "success",
                });
                navigate('/home');
                setFormContent(null);
            }
        } catch (error) {
            toast({
                title: "Error deleting form",
                description: error.message,
                variant: "destructive",
            });
        } 
    };

    return (
        <>
  <div className="container py-5">
    <div className="row justify-content-center mb-5">
      <div className="col-md-8">
        <div className="card shadow">
          <div className="card-header text-center">
            <h3 className="mb-0">{formContent.username}</h3>
            <p className="text-muted mb-0">{formContent.email}</p>
          </div>
          <div className="card-body">
            <p><strong>Role:</strong> {formContent.role}</p>
            <p><strong>Experience Level:</strong> {formContent.experienceLevel}</p>
            <p><strong>Availability:</strong> {formContent.availability}</p>
            <p><strong>Preferred Team Type:</strong> {formContent.preferredTeamType}</p>
            <p>
              <strong>Portfolio:</strong>{" "}
              <a href={formContent.portfolio} target="_blank" rel="noopener noreferrer">
                View Portfolio
              </a>
            </p>
            <p><strong>Additional Notes:</strong> {formContent.additionalNotes}</p>

            <div className="mt-3">
              <p><strong>Skills:</strong></p>
              <div className="d-flex flex-wrap gap-2">
                {formContent.skills.map((skill, index) => (
                  <span key={index} className="badge bg-secondary">{skill}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="card-footer text-center">
            <button className="btn btn-danger" onClick={deleteForm}>Delete Form</button>
          </div>
        </div>
      </div>
    </div>

    <div className="text-center mb-4">
      <h2>{matchedTeamsData.length > 0 ? "My Matches" : "No Matches"}</h2>
    </div>
    <div className="row g-4">
      {matchedTeamsData.map((team, index) => (
        <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3">
          <div
            className="card h-100 shadow-sm position-relative"
            onClick={() => navigate(`/teamPage/${team.id}`)}
            style={{ cursor: "pointer" }}
          >
            <div className="card-header text-center py-2">
              <h5 className="mb-0">{team.teamName}</h5>
            </div>
            <div className="card-body">
              <p className="card-text small">{team.teamDescription}</p>
            </div>
            <div className="card-footer bg-transparent">
              <button className="btn btn-primary w-100">View Team</button>
            </div>
            <div className="position-absolute top-7 start-50 translate-middle badge bg-info text-dark p-2 rounded shadow">
              {team.match_percentage}% Match
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</>

    );
};

export default MyForm;
