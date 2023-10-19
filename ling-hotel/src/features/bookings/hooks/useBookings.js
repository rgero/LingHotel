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

  // PAGES
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  // This is cool, the filter input makes it a dependency like useEffect.
  const {isLoading, data: {data: bookings, count} = {}, error} = useQuery({queryKey: ["bookings", filter, sortBy, page], queryFn: () => getBookings({filter, sortBy, page})});

  return { isLoading, error, bookings, count };
}
