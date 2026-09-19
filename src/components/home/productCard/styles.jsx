export const className = {
  cardContainer: {
    display: "flex",
    flexDirecxtion: "row",
    marginTop: "2rem",
    borderRadius: "12px",
    border: "1px solid var(--c-1-d, #D1D1D1)",
    background: "var(--c-1-j, #FFF)",
  },

  media: {
    width: "100%",
    objectFit:"contain" ,
    display: "relative",
  },
  title: {
    color: " var(--c-1-a, #151515)",
    fontFamily: "Open Sans",
    fontSize: "15px",
    fontStyle: "normal",
    fontWeight: "700",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    WebkitLineClamp: 1, 
  
  },
  description: {
    color: "var(--c-1-b, #575757)",
    fontFamily: "Open Sans",
    fontSize: "12px",
    fontWeight: "400",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    WebkitLineClamp: 1, 
    
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
  
  },
  cardItem: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    alignSelf: "center",

  },
  cardItemGrid: {
    display: "flex",
  },

  buyNow: {
    color: "var(--c-1-j, #FFF)",
    fontFamily: "Open Sans",
    fontSize: "14px",
    fontWeight: "700",
    borderRadius: "12px",
    border: "2px solid var(--c-2-b, #46760A)",
    background: "var(--c-2-a, #6A983C)",
    whiteSpace: "nowrap",
  },
  detailButton: {
    color: "var(--c-1-j, #FFF)",
    fontFamily: "Open Sans",
    fontSize: "14px",
    fontWeight: "700",
    borderRadius: "12px",
    border: "2px solid var(--c-2-b, #46760A)",
    background: "var(--c-2-a, #6A983C)",
    padding: "0.8rem 0.5rem",
    whiteSpace: "nowrap",
  },
  cartButton: {
    color: "var(--c-1-a, #151515)",
    fontFamily: "system-ui",
    fontSize: "14px",
    fontWeight: "700",
    borderRadius: "12px",
    background: "var(--c-1-f, #F5F5F5)",
    padding: "0.5rem 1.5rem",
    whiteSpace: "nowrap",
  },
};
