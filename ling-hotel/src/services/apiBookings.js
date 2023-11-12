import { getToday, subtractDates } from "../utils/helpers";

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

export const deleteBooking = async (id) => 
{
    const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', id)

    if (error)
    {
        console.error(error);
        throw new Error("Booking cannot be deleted");
    }
}

export const addBooking = async (newBooking) => {
  let { data: guest, error } = await supabase.from('guests').select("id").eq('fullName', newBooking.fullName).single();
  if (error)
  {
    throw new Error("Guest Cannot be found");
  }

  let { data: cabin, error: cabinError } = await supabase.from('cabins').select("*").eq('name', newBooking.cabin).single();
  if (cabinError)
  {
    throw new Error("Cabin cannot be found");
  }

  let { data: settings, error: settingsError } = await supabase.from('settings').select('breakfastPrice').single();
  if (settingsError)
  {
    throw new Error("Settings cannot be loaded");
  }

  const numNights = subtractDates(newBooking.endDate, newBooking.startDate);
  const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);
  const optionalBreakfastPrice = newBooking.addBreakfast ? (settings.breakfastPrice * numNights * newBooking.numGuests) : 0.0;

  let targetBooking = {
    created_at: new Date(),
    startDate: newBooking.startDate,
    endDate: newBooking.endDate,
    cabinId: cabin.id,
    guestId: guest.id,
    hasBreakfast: newBooking.addBreakfast,
    observations: newBooking.observations,
    hasPaid: newBooking.hasPaid,
    numGuests: newBooking.numGuests,
    status: "unconfirmed",
    numNights: numNights,
    cabinPrice: cabinPrice,
    extrasPrice: optionalBreakfastPrice,
    totalPrice: cabinPrice + optionalBreakfastPrice
  }

  const { error: supaError } = await supabase
    .from('bookings')
    .insert([targetBooking])
    .select()

  if (supaError)
  {
      console.error(supaError);
      throw new Error("Booking cannot be added");
  }
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
// date: ISOString
export const getBookingsAfterDate = async (date) => {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export const getStaysAfterDate = async (date) => {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export const getStaysTodayActivity = async () => {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}
