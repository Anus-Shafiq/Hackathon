import { useParams } from "react-router-dom";
import { Box, Typography, Chip } from "@mui/material";
import { useUser } from "@/context/store";

const sectionStyle = {
  p: 2,
  borderRadius: 2,
  mb: 3,
  minHeight: 150,
  width: "100%", // full width section
  boxSizing: "border-box",
};

const contentWrapperStyle = {
  maxWidth: 600, // max width of content inside section
  mx: "auto", // center horizontally
  textAlign: "center", // center text inside
};

export default function EventDetailsPage() {
  const { id } = useParams();
  const { loanData } = useUser();

  const selectedRow = loanData.find((item) => item.id == id);

  if (!selectedRow) {
    return <Typography>Loading or not found...</Typography>;
  }

  return (
    <Box sx={{ width: "100vw", p: 0, m: 0, bgcolor: "background.default" }}>
      <Typography
        color="primary"
        variant="h4"
        sx={{ mb: 4, textAlign: "center", fontWeight: "bold", width: "100%" }}
      >
        Event Details
      </Typography>

      <Box
        sx={{
          ...sectionStyle,
          bgcolor: "customYellow.main",
          color: "customYellow.contrastText",
          maxWidth: "100vw",
          mx: 0,
        }}
      >
        <Box sx={contentWrapperStyle}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            Event Document
          </Typography>
          <Box
            component="img"
            src={selectedRow.imageURL}
            alt="Event Document"
            sx={{
              maxWidth: "50%",
              maxHeight: "50%",
              objectFit: "contain",
              borderRadius: 2,
              border: "1px solid #ccc",
              display: "block",
              mx: "auto",
            }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          ...sectionStyle,
          bgcolor: "customBlue.main",
          color: "customBlue.contrastText",
          maxWidth: "100vw",
          mx: 0,
        }}
      >
        <Box sx={contentWrapperStyle}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            Personal Info
          </Typography>
          <Typography sx={{ mb: 1 }}>
            <strong>Name:</strong> {selectedRow.fullName || "N/A"}
          </Typography>
          <Typography>
            <strong>Email:</strong> {selectedRow.email || "N/A"}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          ...sectionStyle,
          bgcolor: "customPink.main",
          color: "customPink.contrastText",
          maxWidth: "100vw",
          mx: 0,
        }}
      >
        <Box sx={contentWrapperStyle}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            Event Info
          </Typography>
          <Typography sx={{ mb: 1 }}>
            <strong>Location:</strong> {selectedRow.location || "N/A"}
          </Typography>
          <Typography sx={{ mb: 1 }}>
            <strong>Person:</strong>{" "}
            {selectedRow.person?.toLocaleString() || "0"}
          </Typography>
          <Typography>
            <strong>Event Type:</strong> {selectedRow.eventType || "N/A"}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          ...sectionStyle,
          bgcolor: "customPurple.main",
          color: "customPurple.contrastText",
          maxWidth: "100vw",
          mx: 0,
        }}
      >
        <Box sx={contentWrapperStyle}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            Status
          </Typography>
          <Chip
            label={selectedRow.status?.toLowerCase() || "unknown"}
            color={
              selectedRow.status?.toLowerCase() === "approved"
                ? "chipSuccess"
                : selectedRow.status?.toLowerCase() === "rejected"
                  ? "chipError"
                  : selectedRow.status?.toLowerCase() === "pending"
                    ? "chipWarning"
                    : "default"
            }
            sx={{
              textTransform: "capitalize",
              fontSize: "1rem",
              px: 3,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
