import { login as loginAPI } from "../../../services/apiAuthentication"
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

export const useLogin = () => {
  let navigate = useNavigate();

  const {mutate: login, isLoading} = useMutation({
    mutationFn: ({email, password}) => loginAPI({email, password}),
    onSuccess: () => {
      navigate('/dashboard');
    },
    onError: (error) => {
      console.log("ERROR: ", error);
      toast.error("Provided email and password are not correct");
    }
  });

  return {login, isLoading};
}