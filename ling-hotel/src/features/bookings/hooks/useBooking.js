import { getBooking } from "../../../services/apiBookings";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export const useBooking = () => {
  const {bookingId} = useParams();
  const {isLoading, data: booking, error} = useQuery({queryKey: ["booking"], queryFn: () => getBooking(bookingId)});
  return { isLoading, error, booking };
}
