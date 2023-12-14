import { Skeleton,Box } from "@mui/material"

function ProductCardSkeleton() {
  return (
    <Box display={'flex'} gap={3}>
      <Skeleton variant="rectangular"
       width={400} height={200}>
      </Skeleton>
      <Box>
        <Skeleton width={200} height={20} />
        <Skeleton width={150} height={15}/>
        <Skeleton width={100} height={12}/>
      </Box>
      <Box>
      <Skeleton width={150} height={50}/>
      <Skeleton width={150} height={50} />
      </Box>
    </Box>
  )
}

export default ProductCardSkeleton