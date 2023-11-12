import { getStaysTodayActivity } from "../../../services/apiBookings"
import { useQuery } from "@tanstack/react-query"

export const useTodayActivity = () => {
  const {isLoading, data: activities} =useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ['today-activity']
  })

  return {isLoading, activities};
}