'use client';

import { FormikHandlers } from 'formik';
import { HTMLInputTypeAttribute } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface FormInputProps {
  name: string;
  placeholder: string;
  type: HTMLInputTypeAttribute;
  onChange: FormikHandlers['handleChange'];
  value: string | number | Date;
  label: string;
}

const FormInput: React.FC<FormInputProps> = ({
  name,
  placeholder,
  type,
  onChange,
  value,
  label,
}) => {
  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor={label}>
        {label}
      </Label>
      <Input
        name={name}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        value={
          typeof value === 'string' || typeof value === 'number'
            ? value
            : value.toISOString()
        }
        className="rounded-md border"
      />
    </div>
  );
};

export default FormInput;
