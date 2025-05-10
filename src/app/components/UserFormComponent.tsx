"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { Form, Input, DatePicker, Checkbox, Button, addToast } from "@heroui/react";
import { getLocalTimeZone, today } from "@internationalized/date";
import { handleErrorMessage, validateField } from 'app/components/shared/utils'
import { UserSchema } from "app/components/schema/Schema";
import { createUser } from './api/Api';

function UserFormComponent() {
  const router = useRouter()
  const [serverErrors, setServerErrors] = useState("");
  const [errors, setErrors] = useState <any> ({});

  // Handle notification from server response
  useEffect(() => {
    if (serverErrors.length > 0) {
      addToast({
        title: "Notification",
        description: serverErrors,
        color: 'danger',
      })
    }
    setServerErrors("")
  }, [serverErrors]);

  //  Handle form submit
  const handleSubmit = async (event : any) => {
    event.preventDefault();

    //  Process form data
    const formData = new FormData(event.currentTarget)
    const data:any = Object.fromEntries(formData)
    data.birth_date = new Date(data.birth_date)

    if (!data.hasOwnProperty('accept_terms_conditions'))
      data.accept_terms_conditions = false;
    else
      data.accept_terms_conditions = true;

    //  Validate form data
    const validationResult = UserSchema.safeParse(data)

    if (validationResult.success) {
      try {
        //  Send form data
        const response = await createUser(data);

        if (response.success) {
          setErrors([])
          setServerErrors("");
          router.push('/login')
        } else
          setServerErrors(response.msg);

      } catch (e) {
        console.log(e)
        setServerErrors("Server error.");
      }

    } else {
      setErrors(validationResult.error.format())
    }
  }

  //  Handle field change
  const handleChange = (event : any) => {
    const fieldError = validateField(event.currentTarget.name, event.currentTarget.value, errors, UserSchema)

    setErrors({
      ...fieldError
    });
  }

  //  Handle checkbox change
  const handleCheckboxChange = (event : any) => {
    const fieldError = validateField(event.currentTarget.name, event.currentTarget.checked, errors, UserSchema)

    setErrors({
      ...fieldError
    });

  };

  const handleDatePickerChange = (event : any) => {
    const value = new Date(event.year + '-' + event.month + '-' + event.day)
    const fieldError = validateField('birth_date', value, errors, UserSchema)

    setErrors({
      ...fieldError
    });
  };

  return (<>
    <Form
      className="w-full justify-center items-center space-y-4"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-4 max-w-md">
        <div>
          <Input
            name="email"
            label="Email"
            labelPlacement="outside"
            onChange={handleChange}
            isRequired
            variant="bordered"
            isInvalid={errors?.email?._errors?.length > 0}
          />
          {handleErrorMessage("email", errors)}
        </div>
        <div>
          <Input
            name="password"
            label="Password"
            type="password"
            labelPlacement="outside"
            onChange={handleChange}
            isRequired
            variant="bordered"
            isInvalid={errors?.password?._errors?.length > 0}
          />
          {handleErrorMessage("password", errors)}
        </div>
        <div>
          <DatePicker
            name="birth_date"
            label="Birth Date"
            labelPlacement="outside"
            isRequired
            variant="bordered"
            showMonthAndYearPickers
            maxValue={today(getLocalTimeZone()).subtract({ years: 18 })}
            onChange={handleDatePickerChange}
            isInvalid={errors?.birth_date?._errors?.length > 0}
          />
          {handleErrorMessage("birth_date", errors)}
        </div>
        <div>
          <Checkbox
            classNames={{
              label: "text-small",
            }}
            name="accept_terms_conditions"
            onChange={handleCheckboxChange}
            isInvalid={errors?.accept_terms_conditions?._errors?.length > 0}
          >
            I agree to the terms and conditions
          </Checkbox>
          <div>
            {(errors?.accept_terms_conditions?._errors?.length > 0) && <span className="text-danger text-xs dark:text-white">{errors.accept_terms_conditions?._errors[0]}</span>}
          </div>
        </div>
        <div className='clear-both'></div>
        <div className="flex gap-4">
          <Button className="w-full bg-custom-indigo" color="primary" type="submit">
            Submit
          </Button>
          <Button type="reset" variant="bordered">
            Reset
          </Button>
        </div>
      </div>
    </Form>
  </>);
}

export default UserFormComponent;