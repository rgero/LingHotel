import { useMutation, useQueryClient } from "@tanstack/react-query"

import toast from "react-hot-toast"
import { updateBooking } from "../../../services/apiBookings"
import { useNavigate } from "react-router-dom";

export const useCheckin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  const {mutate: checkIn, isLoading: isCheckingIn} = useMutation({
    mutationFn: (bookingId) => updateBooking(bookingId, { status: "checked-in", hasPaid: true}),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries({active: true});
      navigate('/');
    },
    onError: () => toast.error("There was an error checking in")
  });

  return {checkIn, isCheckingIn}
}