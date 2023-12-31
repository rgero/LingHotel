/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";

import Button from "../../styles/Button";
import Checkbox from "../../ui/forms/Checkbox";
import Form from "../../ui/forms/Form";
import FormRow from "../../ui/forms/FormRow";
import Input from "../../styles/Input";
import TextArea from "../../ui/forms/TextArea";
import { useCabins } from "../cabins/hooks/useCabins";
import { useCreateBooking } from "./hooks/useCreateBooking";
import { useForm } from "react-hook-form"
import { useLookupGuest } from "../guests/hooks/useLookupGuest";

const CreateBookingForm = ({onCloseModal}) => 
{
  const [targetUser, setTargetUser] = useState("");
  const [addBreakfast, setAddBreakfast] = useState(false);
  const [hasPaid, setPaid] = useState(false);

  const {isLookingUp, guests = [], lookupGuest} = useLookupGuest();
  const { isLoadingCabins, cabins = [] } = useCabins();
  const { createBooking} = useCreateBooking();

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: {},
  });
  const errors = formState.errors;

  useEffect( () => {
    const controller = new AbortController();
    const tryLookupGuest = async () => {
      await lookupGuest(targetUser);
    }
    tryLookupGuest();
    
    return () => {
      controller.abort();
    };
  }, [targetUser, lookupGuest])

  const onSubmit = (data) => {
    let newBooking = {...data, addBreakfast: addBreakfast, hasPaid: hasPaid }

    // Fire the Create API
    createBooking(newBooking,{
      onSuccess: () => {
        reset();
        onCloseModal?.();
      },
      onError: (err) => {
        console.log("ERROR: ", err);
      }
    });
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
        <FormRow label="Guest Name" errors={errors?.fullName?.message}>
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

        <FormRow label="Check In" errors={errors?.startDate?.message}>
          <Input
            type="date"
            id="startDate"
            {...register("startDate", {
              required: "This field is required",
              validate: (currentValue) => {
                return new Date(currentValue + "T00:00:00") >= new Date().setHours(0,0,0,0) || "Start Date has to be in the future"
              }
            })}
          />
        </FormRow>

        <FormRow label="Check Out" errors={errors?.endDate?.message}>
          <Input
            type="date"
            id="endDate"
            {...register("endDate", {
              required: "This field is required",
              validate: (currentValue) => {
                return new Date(currentValue + "T00:00:00") >= new Date(getValues().startDate).setHours(0,0,0,0) || "End Date has to be after start date"
              }
            })}
          />
        </FormRow>

        <FormRow label="Number of Guests" errors={errors?.endDate?.message}>
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

        <FormRow label="Selected Cabin" errors={errors?.endDate?.message}>
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

        <FormRow label="Notes" errors={errors?.observations?.message}>
          <TextArea
            id="observations"
            {...register("observations")}
          />
        </FormRow>

        <FormRow label="Optionals">
          <>
            <Checkbox 
              checked={addBreakfast} 
              onChange={()=> {
                setAddBreakfast(!addBreakfast)
              }} id="add-breakfast"
            >
              Add breakfast
            </Checkbox>
            <Checkbox 
              checked={hasPaid} 
              onChange={()=> {
                setPaid(!hasPaid)
              }} id="has-Paid"
            >
              Has Paid
            </Checkbox>
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
