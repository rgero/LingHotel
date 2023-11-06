import { useMutation, useQueryClient } from "@tanstack/react-query"

import { login as loginAPI } from "../../../services/apiAuthentication"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"

export const useLogin = () => {
  const queryClient = useQueryClient();
  let navigate = useNavigate();

  const {mutate: login, isLoading} = useMutation({
    mutationFn: ({email, password}) => loginAPI({email, password}),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user.user);
      navigate('/dashboard');
    },
    onError: (error) => {
      console.log("ERROR: ", error);
      toast.error("Provided email and password are not correct");
    }
  });

  return {login, isLoading};
}