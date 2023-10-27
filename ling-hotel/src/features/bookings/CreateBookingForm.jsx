/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";

import Button from "../../styles/Button";
import Form from "../../ui/forms/Form";
import FormRow from "../../ui/forms/FormRow";
import Input from "../../styles/Input";
import SuggestedUsers from "../../ui/SuggestedUsers";
import { useForm } from "react-hook-form"
import { useLookupGuest } from "../guests/hooks/useLookupGuest";

const CreateBookingForm = ({onCloseModal}) => 
{
  const [targetUser, setTargetUser] = useState("");
  const isWorking = false;
  const {isLookingUp, guests = [], lookupGuest} = useLookupGuest();

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
    console.log("ahh");
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
              id="fullName"
              value={targetUser}
              {...register("fullName", {
                required: "This field is required",
              })}
              onChange={(e)=> setTargetUser(e.target.value)}
            />
            {!isLookingUp && guests.length > 0 && <SuggestedUsers users={guests}/>}
          </>
        </FormRow>

        <FormRow label="Check In" error={errors?.startDate?.message}>
          <Input
            type="text"
            id="startDate"
            disabled={isWorking}
            {...register("startDate", {
              required: "This field is required",
            })}
          />
        </FormRow>

        <FormRow label="Check Out" error={errors?.endDate?.message}>
          <Input
            type="text"
            id="endDate"
            disabled={isWorking}
            {...register("endDate", {
              required: "This field is required",
            })}
          />
        </FormRow>

        <FormRow label="Number of Guests" error={errors?.endDate?.message}>
          <Input
            type="text"
            id="endDate"
            disabled={isWorking}
            {...register("endDate", {
              required: "This field is required",
            })}
          />
        </FormRow>

        <FormRow>
          {/* type is an HTML attribute! */}
          <Button
            variation="secondary"
            type="reset"
            onClick={() => onCloseModal?.()}
          >
            Cancel
          </Button>
          <Button disabled={isWorking}>
            Create
          </Button>
        </FormRow>
      </Form>
    </>
  );
}

export default CreateBookingForm
