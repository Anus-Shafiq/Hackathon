import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Divider,
  Input,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/client";
import { useUser } from "@/context/store";

function SinglePageForm() {
  const { user } = useUser();
  const methods = useForm({
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      email: "",
      location: "",
      Person: "",
      eventBudget: "",
      eventType: "",
      image: null,
    },
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = methods;
  const [formData, setFormData] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  // Handle image file selection and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setValue("image", file); // Store file in form state
      setImagePreview(URL.createObjectURL(file)); // Create preview URL
    } else {
      setValue("image", null);
      setImagePreview(null);
      alert("Please upload a valid image file (PNG, JPG, etc.)");
    }
  };

  async function addData(data) {
    try {
      let imageUrl = null;
      if (data.image) {
        // Upload image to Supabase storage
        const fileExt = data.image.name.split(".").pop();
        const fileName = `${user.userId}_${Date.now()}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("loan-images")
          .upload(fileName, data.image);

        if (uploadError) throw uploadError;

        // Get public URL of the uploaded image
        const { data: urlData } = supabase.storage
          .from("loan-images")
          .getPublicUrl(fileName);
        imageUrl = urlData.publicUrl;
      }

      // Insert form data into Supabase
      const { error } = await supabase.from("eventDetails").insert({
        fullName: data.fullName,
        email: data.email,
        location: data.location,
        person: data.Person,
        eventType: data.eventType,
        imageURL: imageUrl,
        userId: user.userId,
      });

      if (error) throw error;
    } catch (error) {
      console.error("Error submitting form:", error);
      throw error;
    }
  }

  const onSubmit = async (data) => {
    setFormData(data);
  };

  const handleConfirm = async () => {
    try {
      await addData(formData);
      navigate("/My-Event-Requests");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleEdit = () => {
    setFormData(null); // Return to form view without resetting form values
  };

  return (
    <FormProvider {...methods}>
      <Box
        sx={{
          width: "95%",
          mx: "auto",
          p: 3,
          borderRadius: 6,
          padding: 2,
        }}
      >
        <Typography
          variant="h3"
          sx={{ mb: 3, fontWeight: "bold" }}
          color="primary"
        >
          Event Application Form
        </Typography>

        {!formData ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Personal Information */}
            <Typography variant="h6" sx={{ mb: 2 }} color="primary">
              Personal Information
            </Typography>
            <TextField
              label="Full Name"
              fullWidth
              margin="normal"
              {...register("fullName", { required: "Full name is required" })}
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
            />
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email address",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <Divider sx={{ my: 3 }} />

            {/* Event Information */}
            <Typography variant="h6" sx={{ mb: 2 }} color="primary">
              Event Information
            </Typography>
            <TextField
              label="Event Location"
              fullWidth
              margin="normal"
              {...register("location", {
                required: "location is required",
              })}
              error={!!errors.location}
              helperText={errors.location?.message}
            />
            <TextField
              label="Persons"
              type="number"
              fullWidth
              margin="normal"
              {...register("Person", {
                required: "Persons is required",
                valueAsNumber: true,
                min: { value: 1, message: "Persons must be a positive number" },
              })}
              error={!!errors.Person}
              helperText={errors.Person?.message}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Event Type</InputLabel>
              <Select
                label="Event Type"
                {...register("eventType", {
                  required: "Event type is required",
                })}
                error={!!errors.eventType}
              >
                <MenuItem value="Wedding">Wedding</MenuItem>
                <MenuItem value="Engagement">Engagement</MenuItem>
                <MenuItem value="Eid Celebration">Eid Celebration</MenuItem>
                <MenuItem value="Birthday">Birthday</MenuItem>
                <MenuItem value="Mehndi">Mehndi</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
              {errors.eventType && (
                <Typography color="error" sx={{ mt: 1 }}>
                  {errors.eventType.message}
                </Typography>
              )}
            </FormControl>

            <Divider sx={{ my: 3 }} />

            <Divider sx={{ my: 3 }} />

            {/* Image Upload */}
            <Typography variant="h6" sx={{ mb: 2 }} color="primary">
              Upload Document Image
            </Typography>
            <Box
              sx={{
                border: "2px dashed #ccc",
                borderRadius: 2,
                p: 2,
                textAlign: "center",
                cursor: "pointer",
                "&:hover": { borderColor: "#888" },
              }}
              onClick={() => document.getElementById("image-upload").click()}
            >
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                sx={{ display: "none" }}
                onChange={handleImageChange}
              />
              <Typography color="primary">
                {imagePreview
                  ? "Image selected"
                  : "Drag & Drop or Click to Upload an Image"}
              </Typography>
              {imagePreview && (
                <Box
                  component="img"
                  src={imagePreview}
                  sx={{ maxWidth: "100%", maxHeight: 200, mt: 2 }}
                />
              )}
            </Box>
            {errors.image && (
              <Typography color="error" sx={{ mt: 1 }}>
                {errors.image.message}
              </Typography>
            )}

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
              <Button type="submit" variant="contained">
                Review
              </Button>
            </Box>
          </form>
        ) : (
          <Box>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Review Information
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 2,
                mx: 2,
              }}
            >
              <Typography>
                <strong>Full Name:</strong> {formData.fullName}
              </Typography>
              <Typography>
                <strong>Email:</strong> {formData.email}
              </Typography>
              <Typography>
                <strong>location:</strong> {formData.location}
              </Typography>
              <Typography>
                <strong>Person:</strong> {formData.Person}
              </Typography>
              <Typography>
                <strong>Event Budget:</strong> {formData.eventBudget}
              </Typography>
              <Typography>
                <strong>Event Type:</strong> {formData.eventType}
              </Typography>
              {formData.image && (
                <Typography>
                  <strong>Document Image:</strong>
                  <Box
                    component="img"
                    src={imagePreview}
                    sx={{ maxWidth: "100%", maxHeight: 200, mt: 1 }}
                  />
                </Typography>
              )}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Button
                onClick={handleEdit}
                variant="contained"
                color="secondary"
                sx={{ mr: 2 }}
              >
                Edit
              </Button>
              <Button
                onClick={handleConfirm}
                variant="contained"
                color="primary"
              >
                Confirm and Submit
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </FormProvider>
  );
}

export default SinglePageForm;
