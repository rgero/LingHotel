import { ENTRIES_PER_PAGE } from "../utils/constants";
import supabase from "./supabase";

export const getBookings = async ({filter, sortBy, page}) => {

  let query = supabase
    .from("bookings")
    .select("*, cabins(name), guests(fullName, email)", {count: "exact"});

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
    throw new Error("Bookings not found");
  }

  return {data, count};
}

export const getBooking = async (id) => {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

export const updateBooking = async (id, updateObject) => {
  const { data, error } = await supabase
    .from("bookings")
    .update(updateObject)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}