import {  Chip } from "@mui/material";
import { className } from "./styles";

function AppliedFilters({category,handleCancelCategory}) {
  return (
    <>
      <Chip
        key={category}
        label={category}
        onDelete={() => handleCancelCategory(category)}
        style={className.filters}
      />
    </>
  );
}

export default AppliedFilters;
