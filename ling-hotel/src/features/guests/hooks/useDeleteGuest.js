/* eslint-disable no-unused-vars */

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteGuest as deleteGuestAPI } from "../../../services/apiGuests";
import toast from "react-hot-toast";

export const useDeleteGuest = () => {
    const queryClient = useQueryClient();
    const {isLoading: isDeleting, mutate: deleteGuest} = useMutation({
        mutationFn: (id) => deleteGuestAPI(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["guests"]})
            toast.success("Guest Deleted");
        },
        onError: (err) => toast.error(err.message)
    })

    return {isDeleting, deleteGuest}
}