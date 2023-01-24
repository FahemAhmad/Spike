import * as React from "react";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Stack from "@mui/material/Stack";
import { BsFillCalendarWeekFill } from "react-icons/bs";

export default function CustomDateTimePicker() {
  const [dateWithInitialValue, setDateWithInitialValue] = React.useState(
    dayjs("2019-01-01T18:54")
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <BsFillCalendarWeekFill style={{ color: "#7d80ff" }} />
          <DateTimePicker
            className="date-time-picker"
            value={dateWithInitialValue}
            onChange={(newValue) => setDateWithInitialValue(newValue)}
            mask="__-__-____ __:__ _M"
            inputFormat="DD-MM-YYYY  hh:mm a"
            renderInput={(params) => (
              <TextField {...params} value={dateWithInitialValue} />
            )}
          />
        </div>
      </Stack>
    </LocalizationProvider>
  );
}
