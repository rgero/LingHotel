/* eslint-disable no-unused-vars */

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addBooking } from "../../../services/apiBookings";
import toast from "react-hot-toast";

export const useCreateBooking = () => {
    const queryClient = useQueryClient();
    const {isLoading: isAdding, mutate: createBooking} = useMutation({
        mutationFn: (booking) => addBooking(booking),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["bookings"]})
            toast.success("Booking Created");
        },
        onError: (err) => toast.error(err.message)
    })

    return {isAdding, createBooking}
}