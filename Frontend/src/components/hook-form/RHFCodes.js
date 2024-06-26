import { Stack, TextField } from "@mui/material";
import React, { useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";

const RHFCodes = ({ keyName = "", inputs = [""], ...other }) => {
  const codeRef = useRef(null);
  const { control } = useFormContext();
  const handleChangeWithNextField = (event, handleChange) => {
    const { maxLength, value, name } = event.target;
    const fieldIndex = name.replace(keyName, "");

    const fieldIntIndex = Number(fieldIndex);
    const nextField = document.querySelector(
      `input[name=${keyName}${fieldIntIndex + 1}]`
    );

    if (value.length > maxLength) {
      event.target.value = value[0];
    }
    if (value.length >= maxLength && fieldIntIndex < 6 && nextField !== null) {
      nextField.focus();
    }
    handleChange(event);
  };

  return (
    <Stack direction={"row"} spacing={2} justifyContent="center" ref={codeRef}>
      {inputs?.length > 0 ? (
        inputs?.map((name, index) => (
          <Controller
            key={name}
            name={`${keyName}${index + 1}`}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                error={!!error}
                autoFocus={index === 0}
                textAlign="center"
                placeholder={"-"}
                onChange={(event) => {
                  handleChangeWithNextField(event, field.onChange);
                }}
                InputProps={{
                  sx: {
                    width: { x5: 36, sm: 56 },
                    height: { x5: 36, sm: 56 },
                    "& input": { p: 0, textAlign: "center" },
                    "&::placeholder": {
                      textAlign: "center",
                      color: "text.disabled",
                    },
                  },
                }}
                inputProps={{
                  maxLength: 1,
                  type: "number",
                }}
                {...other}
              />
            )}
          />
        ))
      ) : (
        <div>loading...</div>
      )}
    </Stack>
  );
};
export default RHFCodes;
