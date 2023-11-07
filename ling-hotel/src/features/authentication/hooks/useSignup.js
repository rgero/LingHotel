import { signup as signupApi } from "../../../services/apiAuthentication";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

export const useSignup = () => {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      toast.success(
        "Account successfully created! Please verify the new account from the user's email address."
      );
    },
  });

  return { signup, isLoading };
}
