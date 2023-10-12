import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addOrEditCabin } from "../../../services/apiCabins";
import toast from "react-hot-toast";

export const useAddCabin = () => {
    const queryClient = useQueryClient();

    const {mutate: addCabin, isLoading: isCreating} = useMutation({
        mutationFn: addOrEditCabin,
        onSuccess: () => {
            toast.success("New cabin created!");
            queryClient.invalidateQueries({queryKey: ['cabins']});
        },
        onError: (err) => {toast.error(err.message)}
    });

    return {isCreating, addCabin};
}