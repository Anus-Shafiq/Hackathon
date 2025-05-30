import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import Box from "@mui/material/Box";
import { red, green, blueGrey } from "@mui/material/colors";

export default function CardSection({
  title,
  titleValue,
  icon,
  color,
  status,
  statusValue,
  bgcolor,
}) {
  return (
    <Card sx={{ borderRadius: 6, padding: 2 }}>
      <Box
        sx={{
          textAlign: "start",
          textTransform: "capitalize",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: 48,
            height: 48,

            bgcolor: bgcolor,
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: 1,
          }}
        >
          {icon}
        </Box>
        <Box>
          <Typography variant="h7">{title}</Typography>
          <Typography variant="h6">{titleValue}</Typography>
        </Box>
      </Box>

      {/* <Box
        sx={{
          textAlign: "start",
          textTransform: "capitalize",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h7">{status}</Typography>
        <Typography variant="h7">{statusValue}</Typography>
      </Box> */}
    </Card>
  );
}
