import { useQuery, useQueryClient } from "@tanstack/react-query";

import { ENTRIES_PER_PAGE } from "../../../utils/constants";
import { getBookings } from "../../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export const useBookings = () => {
  const queryClient = useQueryClient();

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

  // Pre-fetch some data
  const pageCount = Math.ceil(count / ENTRIES_PER_PAGE);
  if (page < pageCount) {
    queryClient.prefetchQuery({queryKey: ["bookings", filter, sortBy, page+1], queryFn: () => getBookings({filter, sortBy, page: page+1})})
  }
  if (page > 1)
  {
    queryClient.prefetchQuery({queryKey: ["bookings", filter, sortBy, page-1], queryFn: () => getBookings({filter, sortBy, page: page-1})})
  }

  return { isLoading, error, bookings, count };
}
