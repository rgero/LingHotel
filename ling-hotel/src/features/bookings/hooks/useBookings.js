import { getBookings } from "../../../services/apiBookings";
import { useQuery } from "@tanstack/react-query";

export const useBookings = () => {
  const {isLoading, data: bookings, error} = useQuery({queryKey: ["bookings"], queryFn: getBookings});
  return { isLoading, error, bookings };
}
