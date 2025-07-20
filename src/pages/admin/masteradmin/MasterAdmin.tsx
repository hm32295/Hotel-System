import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { axiosInstance, BOOKING_URL } from "../../../services/Url";
import { toast } from "react-toastify";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Progress from "../../user/Details/Progress";

interface Booking {
  _id: string;
}

interface Props {
  booking: Booking;
}

export default function FormBooking({ booking }: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements || !booking) return;

    setLoading(true);

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      toast.error("Card element not found.");
      setLoading(false);
      return;
    }

    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
      console.error("Stripe Error:", error.message);
      toast.error(error.message);
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post(
        BOOKING_URL.PAY(booking._id),
        { token: token.id }
      );
      toast.success(response?.data?.message || "Booking paid successfully");
      navigate("/MasterUser/Completed");
    } catch (error: any) {
      if (error.response) {
        toast.error(
          error?.response?.data?.message || "This booking has already been paid"
        );
      } else {
        toast.error("An error occurred during payment.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component={"form"}
      sx={{
        m: "auto",
        width: "350px",
        display: "flex",
        gap: "2rem",
        flexDirection: "column",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
      onSubmit={handleSubmit}
    >
      <CardElement />
      <Button
        sx={{
          boxShadow: "0px 8px 15px 0px #ccc",
          padding: 0,
          m: "auto",
          background: "#3252DF",
          color: "#fff",
          width: "300px",
        }}
        type="submit"
        disabled={loading || !stripe}
      >
        {loading ? (
          <Box
            sx={{
              height: "100%",
              width: "100%",
              display: "flex",
              gap: ".5rem",
              alignItems: "center",
              background: "#fff",
              padding: "0.5rem",
            }}
            component={"span"}
          >
            Payment is in progress... <Progress />
          </Box>
        ) : (
          <Box sx={{ padding: ".5rem" }}>Pay now</Box>
        )}
      </Button>
    </Box>
  );
}
