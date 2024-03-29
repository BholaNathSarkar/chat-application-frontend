import PropTypes from "prop-types";

// forms
import { useFormContext, Controller } from "react-hook-form";

//  @mui
import { TextField } from "@mui/material";

RHFTextField.prototype = {
  name: PropTypes.string,
  label: PropTypes.string,
  helperText: PropTypes.node,
};

export default function RHFTextField({ name, helperText, ...other }) {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            fullWidth
            error={!!error}
            helperText={error ? error.message : helperText}
            {...other}
          />
        )}
      />
    </>
  );
}
