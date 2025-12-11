import { useAuth } from "./useAuth";
import { UserProfile } from "./UserProfile";
import { SignInButton } from "./SignInButton";
import { SignOutButton } from "./SignOutButton";

export const AuthSection: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <UserProfile />
      {isAuthenticated ? <SignOutButton /> : <SignInButton />}
    </>
  );
};
