import React from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { useDropzone } from "react-dropzone";
import Search from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";

export const TabPanel = (props: {
  index: number;
  value: number;
  children: React.ReactNode;
}) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: "10px 0" }}>{children}</Box>}
    </div>
  );
};

export const UnsplashTab: React.FC<{
  setApplyEnabled: (enabled: boolean) => void;
}> = ({ setApplyEnabled }) => {
  const [search, setSearch] = React.useState("");
  const [selected, setSelected] = React.useState<string | null>(null);

  const handleSelect = (value: string) => () => {
    const actualValue = value === selected ? null : value;
    setSelected(actualValue);
    setApplyEnabled(!!actualValue);
  };

  return (
    <Box
      sx={{
        gap: "10px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          gap: "8px",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          "> div": { flex: 1 },
        }}
      >
        <Input
          value={search}
          startAdornment={<Search htmlColor="#525252" sx={{ mr: "8px" }} />}
          placeholder="Search professional photos"
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            bgcolor: "#f5f5f5",
            padding: "8px 8px 8px 16px",
          }}
        />
        <Button
          variant="contained"
          sx={{
            color: "#fff",
            fontWeight: "400",
            bgcolor: "#3154f4",
            textTransform: "none",
            "&:hover": {
              bgcolor: "#2548c4",
            },
          }}
        >
          Search
        </Button>
      </Box>
      <Box
        sx={{
          gap: "10px",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {Array.from({ length: 11 }).map((_, i) => (
          <Box
            key={i}
            onClick={handleSelect(i.toString())}
            sx={{
              width: "80px",
              height: "80px",
              display: "flex",
              cursor: "pointer",
              border: "1px solid",
              borderRadius: "8px",
              alignItems: "center",
              bgcolor: "#f1f1f1",
              justifyContent: "center",
              borderColor: selected === i.toString() ? "#3154f4" : "#adb5bd",
            }}
          >
            <Box
              sx={{
                width: "60px",
                height: "60px",
                bgcolor: "#fff",
                borderRadius: "8px",
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export const UploadTab: React.FC<{
  setApplyEnabled: (enabled: boolean) => void;
}> = ({ setApplyEnabled }) => {
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      maxSize: 10485760,
      accept: { "image/*": [".jpeg", ".jpg", ".png", ".webp", ".svg"] },
      onDrop: (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
          setApplyEnabled(true);
        }
      },
    });

  return (
    <Box
      sx={{
        gap: "10px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        {...getRootProps()}
        sx={{
          gap: "10px",
          width: "100%",
          height: "150px",
          padding: "10px",
          display: "flex",
          cursor: "pointer",
          borderRadius: "4px",
          textAlign: "center",
          border: "1px dashed",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          transition: "all 0.2s ease",
          bgcolor: isDragActive ? "#e9ecef" : "#f1f3f5",
          borderColor: isDragActive ? "#3154f4" : "#252c34",
        }}
      >
        <input {...getInputProps()} />
        <svg width="20" height="21" viewBox="0 0 20 21" fill="none">
          <path
            d="M19 13C19.2769 13 19.5 13.2231 19.5 13.5V17.5C19.5 18.8779 18.3779 20 17 20H3C1.62214 20 0.5 18.8779 0.5 17.5V13.5C0.5 13.2235 0.723817 13 1 13C1.27618 13 1.5 13.2235 1.5 13.5V17.5C1.5 18.3285 2.17318 19 3 19H17C17.8281 19 18.5 18.3281 18.5 17.5V13.5C18.5 13.2231 18.7231 13 19 13ZM10 1C10.2759 1 10.5 1.22414 10.5 1.5V12.293L14.6465 8.14648C14.8422 7.95075 15.1578 7.95075 15.3535 8.14648C15.5493 8.34222 15.5493 8.65778 15.3535 8.85352L10.3691 13.8369L10.3613 13.8457C10.2728 13.9382 10.1507 13.9962 10.0146 14H9.9873C9.85062 13.9966 9.72755 13.9385 9.63867 13.8457V13.8447L9.62988 13.8369L4.64648 8.85352C4.45075 8.65778 4.45075 8.34222 4.64648 8.14648C4.84222 7.95075 5.15778 7.95075 5.35352 8.14648L9.5 12.293V1.5C9.5 1.22414 9.72414 1 10 1Z"
            fill="#373D43"
            stroke="#252C34"
          />
        </svg>
        <Typography fontSize="16px" color="#525252">
          Drag and drop images here,
          <br />
          or click to browse
        </Typography>
      </Box>
      <Typography fontSize="16px" color="#525252">
        Supported formats are JPG, PNG, WEBP, SVG.
      </Typography>
      <Typography fontSize="16px" color="#525252">
        Maximum file size: 10MB per image.
      </Typography>
      {acceptedFiles.length > 0 && (
        <Typography fontSize="16px" color="#525252">
          {acceptedFiles.length} file(s) selected
        </Typography>
      )}
    </Box>
  );
};

export const MyAssetsTab: React.FC<{
  setApplyEnabled: (enabled: boolean) => void;
}> = ({ setApplyEnabled }) => {
  const [search, setSearch] = React.useState("");
  const [selected, setSelected] = React.useState<string | null>(null);

  const handleSelect = (value: string) => () => {
    const actualValue = value === selected ? null : value;
    setSelected(actualValue);
    setApplyEnabled(!!actualValue);
  };

  return (
    <Box
      sx={{
        gap: "10px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography fontSize="16px" color="#525252">
        You have 11 image assets in total
      </Typography>
      <Box
        sx={{
          gap: "8px",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          "> div": { flex: 1 },
        }}
      >
        <Input
          value={search}
          startAdornment={<Search htmlColor="#525252" sx={{ mr: "8px" }} />}
          placeholder="Search professional photos"
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            bgcolor: "#f5f5f5",
            padding: "8px 8px 8px 16px",
          }}
        />
        <Button
          variant="contained"
          sx={{
            color: "#fff",
            fontWeight: "400",
            bgcolor: "#3154f4",
            textTransform: "none",
            "&:hover": {
              bgcolor: "#2548c4",
            },
          }}
        >
          Search
        </Button>
      </Box>
      <Box
        sx={{
          gap: "10px",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {Array.from({ length: 11 }).map((_, i) => (
          <Box
            key={i}
            onClick={handleSelect(i.toString())}
            sx={{
              width: "80px",
              height: "80px",
              display: "flex",
              cursor: "pointer",
              border: "1px solid",
              borderRadius: "8px",
              alignItems: "center",
              bgcolor: "#f1f1f1",
              justifyContent: "center",
              borderColor: selected === i.toString() ? "#3154f4" : "#adb5bd",
            }}
          >
            <Box
              sx={{
                width: "60px",
                height: "60px",
                bgcolor: "#fff",
                borderRadius: "8px",
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
