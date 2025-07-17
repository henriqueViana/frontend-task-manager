import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return <h1>Dash</h1>;
};

export default Dashboard;
