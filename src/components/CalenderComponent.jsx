import * as React from "react";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Stack from "@mui/material/Stack";
import { BsFillCalendarWeekFill } from "react-icons/bs";

export default function CalenderComponent({
  eventTime,
  setEventTime,
  readOnly,
}) {
  const [dateWithInitialValue, setDateWithInitialValue] = React.useState(
    dayjs(eventTime)
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
            disabled={readOnly}
            value={dateWithInitialValue}
            onChange={(newValue) => {
              setDateWithInitialValue(newValue);
              setEventTime(dayjs(newValue));
            }}
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
