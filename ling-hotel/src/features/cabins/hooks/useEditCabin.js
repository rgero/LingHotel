import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addOrEditCabin } from "../../../services/apiCabins";
import toast from "react-hot-toast";

export const useEditCabin = () => {
    const queryClient = useQueryClient();

    const {mutate: editCabin, isLoading: isEditing} = useMutation({
        mutationFn: ({newCabinData, id}) => addOrEditCabin(newCabinData, id),
        onSuccess: () => {
            toast.success("Cabin Updated!");
            queryClient.invalidateQueries({queryKey: ['cabins']});
        },
        onError: (err) => {toast.error(err.message)}
    });

    return {isEditing, editCabin};
}