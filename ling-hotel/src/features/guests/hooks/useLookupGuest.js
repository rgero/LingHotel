/* eslint-disable no-unused-vars */

import { lookupGuest as lookupGuestAPI } from "../../../services/apiGuests";
import { useMutation } from "@tanstack/react-query";

export const useLookupGuest = () => {
    const {isLoading: isLookingUp, mutate: lookupGuest, data: guests} = useMutation({
        mutationFn: (testString) => lookupGuestAPI(testString)
    })
    return {isLookingUp, lookupGuest, guests}
}