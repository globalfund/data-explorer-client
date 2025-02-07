import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";
import usePagination from "@mui/material/usePagination/usePagination";
import LastPageSharpIcon from "@mui/icons-material/LastPageSharp";
import ChevronRight from "@mui/icons-material/ChevronRight";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import FirstPageSharpIcon from "@mui/icons-material/FirstPageSharp";
import { Input } from "../search/styles";

export default function Pagination({
  count,
  page,
  pageSearchValue,
  handlePageChange,
  handlePageSearchChange,
  handlePageSearch,
}: {
  count: number;
  page: number;
  pageSearchValue: number;
  handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  handlePageSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePageSearch: () => void;
}) {
  const [showLastButton, setShowLastButton] = React.useState(true);
  const [showFirstButton, setShowFirstButton] = React.useState(true);
  const [siblingCount, setSiblingCount] = React.useState(2);

  const { items } = usePagination({
    count: Math.ceil(count / 9),
    showFirstButton,
    showLastButton,
    siblingCount,
    defaultPage: page,
    page,
    onChange: handlePageChange,
  });
  const mobile = useMediaQuery("(max-width: 670px)");
  const md = useMediaQuery("(max-width: 697px)");
  const tablet = useMediaQuery("(max-width: 800px)");
  const rangeFrom = (page - 1) * 9 + 1;
  const rangeto = page * 9 > count ? count : page * 9;

  React.useEffect(() => {
    if (mobile) {
      setSiblingCount(0);
      setShowFirstButton(false);
      setShowLastButton(false);
    } else if (md) {
      setSiblingCount(0);
    } else if (tablet) {
      setSiblingCount(1);
    }
  }, [mobile, tablet]);

  const pagination = React.useMemo(
    () => (
      <Box>
        <Box
          gap="30px"
          display="flex"
          alignItems="center"
          sx={{
            "@media(max-width:1067px)": {
              justifyContent: "space-between",
              flexWrap: "wrap",
            },
          }}
        >
          <Typography fontSize="12px">
            {rangeFrom}-{rangeto} of {count}
          </Typography>

          <Box
            display={"flex"}
            alignItems={"center"}
            gap={"10px"}
            sx={{
              "@media(max-width:1067px)": {
                width: "100%",
                order: 3,
              },
              "@media(max-width:697px)": {
                gap: "8px",
              },
            }}
          >
            {items.map(({ page, type, selected, ...item }, index) => {
              let children = null;
              if (type === "last" || type === "first") {
                children = (
                  <Button
                    startIcon={type === "first" && <FirstPageSharpIcon />}
                    endIcon={type === "last" && <LastPageSharpIcon />}
                    {...item}
                    sx={{
                      borderRadius: "4px",
                      border: "1px solid #DFE3E5",
                      display: "flex",
                      padding: "7px 12px",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "5px",
                      flex: "1 0 0",
                      textTransform: "capitalize",
                      background: "none",
                      height: "31px",
                      fontWeight: "normal",
                    }}
                  >
                    {type}
                  </Button>
                );
              } else if (type === "start-ellipsis" || type === "end-ellipsis") {
                children = "…";
              } else if (type === "page") {
                children = (
                  <Button
                    {...item}
                    sx={{
                      borderRadius: "4px",
                      border: "1px solid #DFE3E5",
                      display: "flex",
                      padding: "7px 12px",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "5px",
                      flex: "1 0 0",
                      textTransform: "capitalize",
                      background: selected ? "#1C1C1C" : "none",
                      color: selected ? "#fff" : "#1C1C1C",
                      minWidth: "31px",
                      height: "31px",
                      fontWeight: "normal",
                      "@media(max-width:389px)": {
                        padding: "7px 5px",
                      },
                      ":hover": {
                        color: selected ? "#fff" : "#000",
                        background: selected ? "#1C1C1C" : "none",
                      },
                    }}
                  >
                    {page}
                  </Button>
                );
              } else {
                children = (
                  <Button
                    startIcon={type === "previous" && <ChevronLeft />}
                    endIcon={type === "next" && <ChevronRight />}
                    {...item}
                    sx={{
                      borderRadius: "4px",
                      border: "1px solid #DFE3E5",
                      display: "flex",
                      padding: "7px 12px",
                      justifyContent: "center",
                      alignItems: "center",
                      fontWeight: "normal",
                      flex: "1 0 0",
                      textTransform: "capitalize",
                      background: "none",
                      height: "31px",
                      "@media(max-width:389px)": {
                        padding: "7px 5px",
                        gap: "0px",
                        span: {
                          margin: "0",
                        },
                      },
                    }}
                  >
                    {type === "previous" ? "Back" : type}
                  </Button>
                );
              }

              return <Box key={index}>{children}</Box>;
            })}
          </Box>

          <Box display={"flex"} gap={"10px"} alignItems={"center"}>
            <Typography fontSize="14px">Page</Typography>
            <Box
              sx={{
                input: {
                  width: "70px",
                  height: "31px",
                  borderRadius: "5px",
                  background: "#F1F3F5",
                  color: "#373D43",
                  textAlign: "center",
                },
              }}
            >
              <Input
                type="text"
                onChange={handlePageSearchChange}
                value={pageSearchValue}
              />
            </Box>
            <IconButton
              onClick={handlePageSearch}
              sx={{
                height: "31px",
                width: "44px",
                border: "1px solid #DFE3E5",
                borderRadius: "4px",
                background: "none",
                fontFamily: "Inter",
                fontSize: "14px",
                fontWeight: "bold",
                padding: "none",
                color: "#000000",
              }}
            >
              Go
            </IconButton>
          </Box>
        </Box>
      </Box>
    ),
    [
      count,
      page,
      pageSearchValue,
      siblingCount,
      showFirstButton,
      showLastButton,
    ],
  );
  return pagination;
}
