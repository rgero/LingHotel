import { getBookings } from "../../../services/apiBookings";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export const useBookings = () => {
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get("status");
  const filter = !filterValue || filterValue === "all" ? null : {field: 'status', value: filterValue}

  // SORT
  const sortByRaw = searchParams.get('sortBy') || 'startDate-desc';
  const [field, direction] = sortByRaw.split('-');
  const sortBy = {field, direction}


  // This is cool, the filter input makes it a dependency like useEffect.
  const {isLoading, data: bookings, error} = useQuery({queryKey: ["bookings", filter, sortBy], queryFn: () => getBookings({filter, sortBy})});
  return { isLoading, error, bookings };
}
