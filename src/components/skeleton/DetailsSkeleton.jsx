import { Skeleton,Box } from "@mui/material";
import { className } from "./styles";

function DetailsSkeleton() {
  return (
    <>
      <Skeleton width={200} />
      <Box style={className.ratingBox}>
        <Skeleton width={100} height={20} />
        <Skeleton width={50} height={12}/>
      </Box>
      <Skeleton height={10} />
      <Skeleton height={10} width="80%" />
    </>
  );
}

export default DetailsSkeleton;
