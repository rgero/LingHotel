/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import Button from "../../styles/Button";
import Form from "../../ui/forms/Form";
import FormRow from "../../ui/forms/FormRow";
import Input from "../../styles/Input";
import { useForm } from "react-hook-form"

const CreateBookingForm = ({onCloseModal}) => {

  const isWorking = false;

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: {},
  });
  const {errors} = formState;

  const onSubmit = (data) => {
    console.log("ahh");
  }

  const onError = (errors) => {
    console.log(errors)
  }
  

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type="modal"
    >
      <FormRow label="Guest ID" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This field is required",
          })}
        />
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
  );
}

export default CreateBookingForm
