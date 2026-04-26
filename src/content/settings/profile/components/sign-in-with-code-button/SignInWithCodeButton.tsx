import { useState } from "react";
import { Button } from "@ionic-input/button/Button";
import { SignInWithCodeModal } from "./components/sign-in-with-code-modal/SignInWithCodeModal";

/**
 * Profile-page button that opens the {@link SignInWithCodeModal}. Used
 * when an admin has delivered an OTP out-of-band (SMS / read aloud).
 */
export const SignInWithCodeButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Sign in with code</Button>
      <SignInWithCodeModal
        isOpen={isOpen}
        onDismiss={() => setIsOpen(false)}
      />
    </>
  );
};
