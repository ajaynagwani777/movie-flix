import {useState, useCallback} from 'react';

type ValidationRule = {
  required?: boolean | {value: boolean; message: string};
  pattern?: {value: RegExp; message: string};
};

type ValidationSchema<T> = {
  [K in keyof T]: ValidationRule;
};

function useForm<T extends Record<string, string>>(
  initialState: T,
  validationSchema: ValidationSchema<T>,
) {
  const [values, setValues] = useState<T>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = useCallback(
    (name: keyof T, value: string): string => {
      const schema = validationSchema[name];
      if (!schema) {
        return '';
      }

      const requiredRule = schema.required;
      if (typeof requiredRule === 'object') {
        if (requiredRule.value && !value) {
          return requiredRule.message;
        }
      } else if (requiredRule && !value) {
        return 'This field is required';
      }

      // Pattern
      const patternRule = schema.pattern;
      if (typeof patternRule === 'object') {
        if (!patternRule.value.test(value)) {
          return patternRule.message;
        }
      }

      return '';
    },
    [validationSchema],
  );

  const handleChange = useCallback(
    (name: keyof T, text: string) => {
      setValues(prevValues => ({...prevValues, [name]: text}));
      if (touched[name as string]) {
        const error = validate(name, text);
        setErrors(prevErrors => ({...prevErrors, [name]: error}));
      }
    },
    [validate, touched],
  );

  const handleBlur = useCallback(
    (name: string) => {
      setTouched(prev => ({...prev, [name]: true}));

      const error = validate(name, values[name]);
      setErrors(prev => ({...prev, [name]: error}));
    },
    [validate, values],
  );

  const handleSubmit = useCallback(
    async (callback: (values: T) => Promise<void> | void) => {
      setIsSubmitting(true);
      const newErrors: Partial<Record<keyof T, string>> = {};
      let isValid = true;
      for (const name in validationSchema) {
        const key = name as keyof T;
        const error = validate(key, values[key]);
        if (error) {
          newErrors[key] = error;
          isValid = false;
        }
      }
      setErrors(newErrors);
      setTouched(
        Object.keys(validationSchema).reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {} as Record<string, boolean>),
      );
      if (isValid) {
        await callback(values);
      }

      setIsSubmitting(false);
    },
    [values, validate, validationSchema],
  );

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    handleBlur,
  };
}

export default useForm;
