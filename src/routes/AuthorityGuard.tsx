import { Outlet } from "react-router-dom";

interface AuthorityGuardProps {
  authority: string;
}

const AuthorityGuard: React.FC<AuthorityGuardProps> = () => {
  return <Outlet />;
};

export default AuthorityGuard;
