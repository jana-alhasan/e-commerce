import { Box, Divider, Stack, Typography } from "@mui/material";

const Footer = () => (
  <Box component="footer" sx={{ mt: 8, pb: 4 }}>
    <Divider sx={{ mb: 3 }} />
    <Stack spacing={1}>
      <Typography variant="subtitle1" fontWeight={700}>
        E-Commerce Frontend Demo
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 760 }}>
        React portfolio project using public demo product and authentication data.
        Cart and checkout behavior are local frontend simulations; no real payment,
        inventory, fulfillment, or backend order is created.
      </Typography>
    </Stack>
  </Box>
);

export default Footer;
