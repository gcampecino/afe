"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { Form, Input, Button, addToast } from "@heroui/react";
import { handleErrorMessage } from 'app/components/shared/utils'
import { LoginSchema } from "app/components/schema/Schema";
import { login } from './api/Api';

function LoginFormComponent() {
  const router = useRouter()
  const [serverErrors, setServerErrors] = useState({});
  const [errors, setErrors] = useState({});

  // Handle notification from server response
  useEffect(() => {
    if (serverErrors.length > 0) {
      addToast({
        title: "Notification",
        description: serverErrors,
        color: 'Danger',
      })
    }
    setServerErrors("")
  }, [serverErrors]);

  //  Handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    //  Process form data
    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData)

    //  Validate form data
    const validationResult = LoginSchema.safeParse(data)

    if (validationResult.success) {
      try {
        //  Send form data
        const response = await login(data);

        if (response.success) {
          setErrors([])
          setServerErrors("");
          router.push('/dating')
        } else
          setServerErrors(response.msg);
      } catch (e) {
        setServerErrors(e);
      }

    } else {
      setErrors(validationResult.error.format())
    }
  }

  return (<>
    <Form
      className="w-full justify-center items-center space-y-4"
      onSubmit={handleSubmit} noValidate
    >
      <div className="flex flex-col gap-4 max-w-md">
        <div>
          <Input
            name="email"
            label="Email"
            labelPlacement="outside"
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
            variant="bordered"
            isInvalid={errors?.password?._errors?.length > 0}
          />
          {handleErrorMessage("password", errors)}
        </div>
        <div className='clear-both'></div>
        <div className="flex gap-4">
          <Button className="w-full bg-custom-indigo" color="primary" type="submit">
            Login
          </Button>
        </div>
      </div>
    </Form>
  </>);
}

export default LoginFormComponent;