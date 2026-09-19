import { Box,Skeleton } from "@mui/material"

function CategoriesSkeleton() {
  return (
    <Box>
    <Skeleton width={200} height={20} />
    <Skeleton width={200} height={20}/>
    <Skeleton width={200} height={20}/>
    <Skeleton width={200} height={20}/>
    <Skeleton width={200} height={20}/>
  </Box>
  )
}

export default CategoriesSkeleton