/* eslint-disable no-unused-vars */

import { lookupGuest as lookupGuestAPI } from "../../../services/apiGuests";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

export const useLookupGuest = () => {
    const {isLoading: isLookingUp, mutate: lookupGuest, data} = useMutation({
        mutationFn: (testString) => lookupGuestAPI(testString)
    })

    console.log(data);
    return {isLookingUp, lookupGuest, data}
}