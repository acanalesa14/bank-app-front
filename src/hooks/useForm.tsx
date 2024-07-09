import { useEffect, useState } from 'react';

export interface FormValues {
  [key: string]: any;
}

interface Validation {
  (param1: any, param2: any): Promise<any>;
}

const useForm = (initialValues: FormValues, validation: Validation, initialValidation: boolean) => {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [isValid, setIsValid] = useState(false);

  const validateForm = async () => {
    let isValidArray: boolean[] = [];
    const tempArray: any = {};

    for (const key of Object.keys(values)) {
      const field = values[key];
      const error = await validation(key, field.value);

      isValidArray.push(!error);
      tempArray[key] = {
        value: field.value,
        error,
      };
    }

    const valid = isValidArray.every(elem => elem);
    setIsValid(valid);
    setValues(tempArray);
  };

  useEffect(() => {
    if (initialValidation) {
      validateForm();
    }
  }, [initialValidation]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const error = await validation(name, value);

    setValues({
      ...values,
      [name]: {
        value,
        error,
      },
    });

    let isValidArray: boolean[] = [];
    const temporalToCheck = {
      ...values,
      [name]: {
        value,
        error,
      },
    };

    for (const key of Object.keys(temporalToCheck)) {
      const field = temporalToCheck[key];
      const error = await validation(key, field.value);
      isValidArray.push(!error);
    }

    const valid = isValidArray.every(elem => elem);
    setIsValid(valid);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    validateForm();
  }

  const resetForm = () => {
    setIsValid(false);
    setValues(initialValues);
  };

  return {
    values,
    handleChange,
    handleSubmit,
    resetForm,
    isValid,
    setValues,
  };
};

export default useForm;
