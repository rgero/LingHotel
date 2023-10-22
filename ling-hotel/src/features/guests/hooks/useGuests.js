import { useQuery, useQueryClient } from "@tanstack/react-query";

import { ENTRIES_PER_PAGE } from "../../../utils/constants";
import { getGuests } from "../../../services/apiGuests";
import { useSearchParams } from "react-router-dom";

export const useGuests = () => {
  const queryClient = useQueryClient();

  const [searchParams] = useSearchParams();

  // PAGES
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  const {isLoading, data: {data: guests, count} = {}, error} = useQuery({queryKey: ["guests", page], queryFn: () => getGuests({page})});

  // Pre-fetch some data
  const pageCount = Math.ceil(count / ENTRIES_PER_PAGE);
  if (page < pageCount) {
    queryClient.prefetchQuery({queryKey: ["guests", page+1], queryFn: () => getGuests({page: page+1})})
  }
  if (page > 1)
  {
    queryClient.prefetchQuery({queryKey: ["guests", page-1], queryFn: () => getGuests({page: page-1})})
  }

  return { isLoading, error, guests, count };
}
