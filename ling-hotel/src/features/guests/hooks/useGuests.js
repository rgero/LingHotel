import { useQuery, useQueryClient } from "@tanstack/react-query";

import { ENTRIES_PER_PAGE } from "../../../utils/constants";
import { getGuests } from "../../../services/apiGuests";
import { useSearchParams } from "react-router-dom";

export const useGuests = () => {
  const queryClient = useQueryClient();

  const [searchParams] = useSearchParams();

  // SORT
  const sortByRaw = searchParams.get('sortBy') || 'name-desc';
  const [field, direction] = sortByRaw.split('-');
  const sortBy = {field, direction}

  // PAGES
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  const {isLoading, data: {data: guests, count} = {}, error} = useQuery({queryKey: ["guests", sortBy, page], queryFn: () => getGuests({sortBy, page})});

  // Pre-fetch some data
  const pageCount = Math.ceil(count / ENTRIES_PER_PAGE);
  if (page < pageCount) {
    queryClient.prefetchQuery({queryKey: ["guests", sortBy, page+1], queryFn: () => getGuests({sortBy, page: page+1})})
  }
  if (page > 1)
  {
    queryClient.prefetchQuery({queryKey: ["guests", page-1], sortBy, queryFn: () => getGuests({sortBy, page: page-1})})
  }

  return { isLoading, error, guests, count };
}