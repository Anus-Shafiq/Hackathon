// import { useParams } from "react-router-dom";
// import { Box, Typography, Grid, Divider, Chip } from "@mui/material";
// import { useUser } from "@/context/store";

// const sectionStyle = {
//   p: 2,
//   borderRadius: 2,
//   minHeight: 200,
//   mb: 2,
// };

// export default function EventDetailsPage() {
//   const { id } = useParams();
//   const { user, loading, admin, loanData } = useUser();

//   const selectedRow = null;
//   loanData.forEach((categoriesData) => {
//     const product = categoriesData.items.find((item) => item.id == id);
//     selectedRow = product ? product : selectedProduct;
//   });

//   if (!selectedRow) {
//     return <Typography>Loading or not found...</Typography>;
//   }

//   return (
//     <Box sx={{ p: 4 }}>
//       <Typography
//         variant="h4"
//         sx={{ mb: 3, textAlign: "center", fontWeight: "bold" }}
//       >
//         Event Details
//       </Typography>
//       <Grid container spacing={2} sx={{ justifyContent: "center" }}>
//         {/* --- Personal Info --- */}
//         <Grid xs={12} sm={3}>
//           <Box
//             sx={{
//               ...sectionStyle,
//               bgcolor: "customBlue.main",
//               color: "customBlue.contrastText",
//             }}
//           >
//             <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
//               Personal Info
//             </Typography>
//             <Typography sx={{ mb: 1 }}>
//               <strong>Name:</strong> {selectedRow.fullName || "N/A"}
//             </Typography>
//             <Typography>
//               <strong>Email:</strong> {selectedRow.email || "N/A"}
//             </Typography>
//           </Box>
//         </Grid>

//         <Grid xs={12} sm={0.1}>
//           <Divider
//             orientation="vertical"
//             sx={{
//               display: { xs: "none", sm: "block" },
//               height: "100%",
//               bgcolor: "divider",
//               width: 8,
//             }}
//           />
//         </Grid>

//         {/* --- Event Info --- */}
//         <Grid xs={12} sm={3}>
//           <Box
//             sx={{
//               ...sectionStyle,
//               bgcolor: "customPink.main",
//               color: "customPink.contrastText",
//             }}
//           >
//             <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
//               Event Info
//             </Typography>
//             <Typography sx={{ mb: 1 }}>
//               <strong>Location:</strong> {selectedRow.location || "N/A"}
//             </Typography>
//             <Typography sx={{ mb: 1 }}>
//               <strong>Person:</strong>{" "}
//               {selectedRow.person?.toLocaleString() || "0"}
//             </Typography>
//             <Typography>
//               <strong>Event Type:</strong> {selectedRow.eventType || "0"}
//             </Typography>
//           </Box>
//         </Grid>

//         <Grid xs={12} sm={0.1}>
//           <Divider
//             orientation="vertical"
//             sx={{
//               display: { xs: "none", sm: "block" },
//               height: "100%",
//               bgcolor: "divider",
//               width: 8,
//             }}
//           />
//         </Grid>

//         {/* --- Event Documents --- */}
//         <Grid xs={12} sm={3}>
//           <Box
//             sx={{
//               ...sectionStyle,
//               bgcolor: "customYellow.main",
//               color: "customYellow.contrastText",
//             }}
//           >
//             <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
//               Event Documents
//             </Typography>
//             <Box
//               component="img"
//               src={selectedRow.imageURL}
//               alt="Event Document"
//               sx={{
//                 width: "100%",
//                 maxHeight: 120,
//                 objectFit: "contain",
//                 borderRadius: 2,
//                 border: "1px solid #ccc",
//               }}
//             />
//           </Box>
//         </Grid>

//         {/* --- Status --- */}
//         <Grid xs={12} sm={2.7}>
//           <Box
//             sx={{
//               ...sectionStyle,
//               bgcolor: "customPurple.main",
//               color: "customPurple.contrastText",
//             }}
//           >
//             <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
//               Status
//             </Typography>
//             <Chip
//               label={selectedRow.status?.toLowerCase() || "unknown"}
//               color={
//                 selectedRow.status?.toLowerCase() === "approved"
//                   ? "chipSuccess"
//                   : selectedRow.status?.toLowerCase() === "rejected"
//                     ? "chipError"
//                     : selectedRow.status?.toLowerCase() === "pending"
//                       ? "chipWarning"
//                       : "default"
//               }
//               sx={{
//                 textTransform: "capitalize",
//               }}
//             />
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }
