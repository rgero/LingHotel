import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addGuest as addGuestAPI } from "../../../services/apiGuests";
import toast from "react-hot-toast";

export const useAddGuest = () => {
    const queryClient = useQueryClient();

    const {mutate: addGuest, isLoading: isWorking} = useMutation({
        mutationFn: addGuestAPI,
        onSuccess: () => {
            toast.success("New Guest created!");
            queryClient.invalidateQueries({queryKey: ['guest']});
        },
        onError: (err) => {toast.error(err.message)}
    });

    return {isWorking, addGuest};
}