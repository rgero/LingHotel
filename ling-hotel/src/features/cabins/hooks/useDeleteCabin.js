/* eslint-disable no-unused-vars */

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteCabin as deleteCabinAPI } from "../../../services/apiCabins";
import toast from "react-hot-toast";

export const useDeleteCabin = () => {
    const queryClient = useQueryClient();
    const {isLoading: isDeleting, mutate: deleteCabin} = useMutation({
        mutationFn: (id) => deleteCabinAPI(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["cabins"]})
            toast.success("Cabin Deleted");
        },
        onError: (err) => toast.error(err.message)
    })

    return {isDeleting, deleteCabin}
}