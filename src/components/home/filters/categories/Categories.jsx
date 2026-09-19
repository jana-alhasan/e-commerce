import { ListItemButton,ListItemText } from "@mui/material";
import { className } from "./styles";

const Categories = ({index,handleCategoryChange,category,categoryCount}) => {
  return (
    <ListItemButton key={index} onClick={() => handleCategoryChange(category)} style={className.category}>
      <ListItemText primary={category} style={className.categoryItem} />
      <ListItemText primary={categoryCount} style={className.categoryCount} />
    </ListItemButton>
  );
};

export default Categories;
