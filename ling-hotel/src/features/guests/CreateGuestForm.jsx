/* eslint-disable react/prop-types */

import Button from "../../styles/Button";
import Form from "../../ui/forms/Form";
import FormRow from "../../ui/forms/FormRow";
import Input from "../../styles/Input";
import {useAddGuest} from './hooks/useAddGuest';
import { useForm } from "react-hook-form";

const CreateGuestForm = ({onCloseModal}) => {
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: {},
  });
  const errors = formState.errors;

  const {isWorking, addGuest} = useAddGuest();

  const onSubmit = (data) => {
    addGuest(data, 
      {onSuccess: () => {
          reset();
          onCloseModal?.();
      }}
    );
  }

  const onError = (err) => {
    console.log(err)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? 'modal' : 'regular'}>
      <h1>Create a new guest</h1>
      <FormRow label="Name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isWorking}
          {...register("fullName", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="E-mail" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isWorking}
          {...register("email", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Nationality" error={errors?.nationality?.message}>
        <Input
          type="text"
          id="nationality"
          disabled={isWorking}
          {...register("nationality", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="National ID" error={errors?.nationalID?.message}>
        <Input
          type="text"
          id="nationalID"
          disabled={isWorking}
          {...register("nationalID", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => {
            reset();
            onCloseModal?.();
          }}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          Create
        </Button>
      </FormRow>
    </Form>
  )
}

export default CreateGuestForm
