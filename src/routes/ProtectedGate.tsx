import { RootState } from "@/store/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

interface ProtectedGateProps {
  protect: boolean;
}

const ProtectedGate: React.FC<ProtectedGateProps> = ({ protect }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth/sign-in");
    }
  }, [isAuthenticated, navigate]);

  return !protect ? <Outlet /> : isAuthenticated ? <Outlet /> : null;
};

export default ProtectedGate;
