/* eslint-disable no-unused-vars */

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteBooking as deleteBookingAPI } from "../../../services/apiBookings";
import toast from "react-hot-toast";

export const useDeleteBooking = () => {
    const queryClient = useQueryClient();
    const {isLoading: isDeleting, mutate: deleteBooking} = useMutation({
        mutationFn: (id) => deleteBookingAPI(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["bookings"]})
            toast.success("Booking Deleted");
        },
        onError: (err) => toast.error(err.message)
    })

    return {isDeleting, deleteBooking}
}