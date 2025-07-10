import { TextField, Stack } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface Props {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  includeEmailPassword?: boolean;
  email?: string;
  password?: string;
  setEmail?: Dispatch<SetStateAction<string>>;
  setPassword?: Dispatch<SetStateAction<string>>;
}

export default function SignupForm({
  name,
  setName,
  includeEmailPassword = false,
  email = "",
  password = "",
  setEmail,
  setPassword,
}: Props) {
  return (
    <Stack spacing={2}>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
      />
      {includeEmailPassword && (
        <>
          <TextField
            label="Email"
            value={email}
            type="email"
            onChange={(e) => setEmail?.(e.target.value)}
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword?.(e.target.value)}
            fullWidth
          />
        </>
      )}
    </Stack>
  );
}
