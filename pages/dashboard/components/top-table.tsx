import { ErrorAlert } from "@/components/error-alert";
import CommunityTable from "@/components/ui/community-table";
import { generateUsers, User } from "@/lib/data";
import { useQuery } from "react-query";
import TableSkeleton from "./table-skeleton";

// Type for API response
type ApiUser = {
  id: number;
  name: string;
  email: string;
  emailVerified: string | null;
  image: string;
};

// Get generated user data for enrichment
const generatedUsers = generateUsers(5);

const TopTable = () => {
  // Fetch real users from API
  const {
    data: apiUsers,
    isLoading,
    error,
  } = useQuery<ApiUser[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`);
      if (!response.ok) throw new Error("Failed to fetch users");
      return response.json();
    },
  });

  if (error) {
    return (
      <ErrorAlert message="Failed to load users. Please try again later." />
    );
  }

  // Combine real users with generated data, limiting to the number of generated users
  const enhancedUsers: User[] =
    apiUsers?.slice(0, generatedUsers.length).map((apiUser, index) => ({
      id: apiUser.id.toString(),
      name: apiUser.name,
      community: generatedUsers[index].community,
      carbonReduction: generatedUsers[index].carbonReduction,
      ecoPoints: generatedUsers[index].ecoPoints,
      achievements: generatedUsers[index].achievements,
      lastActivity: generatedUsers[index].lastActivity,
      activityStatus: generatedUsers[index].activityStatus,
    })) || [];

  if (isLoading) {
    return <TableSkeleton />;
  }
  return <CommunityTable paginatedUsers={enhancedUsers} currentPage={1} />;
};

export default TopTable;
