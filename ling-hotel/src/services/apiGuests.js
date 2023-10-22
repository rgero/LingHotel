import { ENTRIES_PER_PAGE } from "../utils/constants";
import supabase from "./supabase";

export const getGuests = async ({filter, sortBy, page}) => {

  let query = supabase
    .from("guests")
    .select("*", {count: "exact"});

  if (filter) 
  {
    query = query.eq(filter.field, filter.value);
  }

  if (sortBy)
  {
    query = query.order(sortBy.field, {ascending: sortBy.direction === "asc"})
  }

  if (page){
    const from = ENTRIES_PER_PAGE * (page-1);
    const to = from + ENTRIES_PER_PAGE - 1;
    query = query.range(from, to);
  }

  const {data, error, count} = await query;
  if (error) {
    console.error(error);
    throw new Error("Guests not found");
  }

  return {data, count};
}