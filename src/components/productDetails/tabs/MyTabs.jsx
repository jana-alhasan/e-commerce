import { useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { className } from "./styles";

function MyTabs({ description, reviews = [] }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <Tabs
        value={activeTab}
        onChange={(_, nextValue) => setActiveTab(nextValue)}
        aria-label="Product information"
        TabIndicatorProps={{ style: { backgroundColor: "#6A983C" } }}
      >
        <Tab label="Description" />
        <Tab label={`Reviews (${reviews.length})`} />
      </Tabs>

      {activeTab === 0 ? (
        <Box py={2} role="tabpanel">
          <Typography>{description || "No description is available."}</Typography>
        </Box>
      ) : (
        <Box py={2} role="tabpanel">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <Box key={`${review.reviewerName}-${index}`} mb={2}>
                <Typography variant="subtitle2">
                  {review.reviewerName} · {review.rating}/5
                </Typography>
                <Typography style={className.Topspace}>
                  {review.comment || "No written comment."}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography>No reviews are available for this product.</Typography>
          )}
        </Box>
      )}
    </>
  );
}

export default MyTabs;
