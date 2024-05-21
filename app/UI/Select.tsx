import {
  FormControl,
  InputLabel,
  Select as MUISelect,
  MenuItem,
  FormControlProps,
} from "@mui/material";

interface Props extends FormControlProps {
  id?: string;
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  items: string[];
}

export default function Select({
  id,
  value,
  onValueChange,
  label,
  items,
  ...rest
}: Props) {
  return (
    <FormControl {...rest}>
      <InputLabel id={`${id || label}-label`}>{label}</InputLabel>
      <MUISelect
        labelId={`${id || label}-label`}
        id={`${id || label}-select`}
        value={value}
        label={label}
        onChange={(event) => onValueChange(event.target.value)}
      >
        {items.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </MUISelect>
    </FormControl>
  );
}
