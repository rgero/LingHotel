/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";

import Button from "../../styles/Button";
import Form from "../../ui/forms/Form";
import FormRow from "../../ui/forms/FormRow";
import Input from "../../styles/Input";
import { useCabins } from "../cabins/hooks/useCabins";
import { useForm } from "react-hook-form"
import { useLookupGuest } from "../guests/hooks/useLookupGuest";

const CreateBookingForm = ({onCloseModal}) => 
{
  const [targetUser, setTargetUser] = useState("");
  const {isLookingUp, guests = [], lookupGuest} = useLookupGuest();
  const { isLoadingCabins, cabins = [] } = useCabins();

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: {},
  });
  const {errors} = formState;

  useEffect( () => {
    const tryLookupGuest = async () => {
      await lookupGuest(targetUser);
    }
    tryLookupGuest();
  }, [targetUser, lookupGuest])

  const onSubmit = (data) => {
    // Convert the strings for Guest and Cabin to their respective entries
    data.guest = guests.find( (element) => element.fullName == data.fullName);
    data.cabin = cabins.find( (element) => element.name == data.cabin)

    // Fire the Create API
  }

  const onError = (errors) => {
    console.log(errors)
  }

  return (
    <>
      <Form
        onSubmit={handleSubmit(onSubmit, onError)}
        type="modal"
      >
        <FormRow label="Guest Name" error={errors?.name?.message}>
          <>
            <Input
              type="text"
              list="suggestedGuests"
              id="fullName"
              value={targetUser}
              {...register("fullName", {
                required: "This field is required",
              })}
              onChange={(e)=> setTargetUser(e.target.value)}
            />
            {!isLookingUp && guests.length > 0 && (<datalist id="suggestedGuests">
              {guests.map(guest => <option key={guest.id} value={guest.fullName}>{guest.fullName}</option>)}
            </datalist>)}
          </>
        </FormRow>

        <FormRow label="Check In" error={errors?.startDate?.message}>
          <Input
            type="date"
            id="startDate"
            {...register("startDate", {
              required: "This field is required",
              validate: (currentValue) => {
                return new Date(currentValue) > new Date() || "Start Date has to be in the future"
              }
            })}
          />
        </FormRow>

        <FormRow label="Check Out" error={errors?.endDate?.message}>
          <Input
            type="date"
            id="endDate"
            {...register("endDate", {
              required: "This field is required",
              validate: (currentValue) => {
                return new Date(currentValue) > new Date(getValues().startDate) || "End Date has to be after start date"
              }
            })}
          />
        </FormRow>

        <FormRow label="Number of Guests" error={errors?.endDate?.message}>
          <Input
            type="number"
            id="numGuests"
            {...register("numGuests", {
              required: "This field is required",
              min: {
                value: 1,
                message: "Minimum number of guests is 1"
              }
            })}
          />
        </FormRow>

        <FormRow label="Selected Cabin" error={errors?.endDate?.message}>
          <>
            <Input
              type="text"
              list="cabinList"
              id="cabin"
              {...register("cabin", {
                required: "This field is required",
              })}
            />
            {!isLoadingCabins && cabins.length > 0 && (<datalist id="cabinList">
              {cabins.map(cabin => <option key={cabin.id} value={cabin.name}>{cabin.name}</option>)}
            </datalist>)}
          </>
        </FormRow>


        <FormRow>
          <Button
            variation="secondary"
            type="reset"
            onClick={() => onCloseModal?.()}
          >
            Cancel
          </Button>
          <Button>
            Create
          </Button>
        </FormRow>
      </Form>
    </>
  );
}

export default CreateBookingForm
