import React from "react";
import get from "lodash/get";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import { Level } from "@tiptap/extension-heading";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import {
  headingOptions,
  fontFamilyOptions,
} from "app/components/rich-text-editor/data";
import PaddingTop from "app/assets/vectors/RBPaddingTop.svg?react";

import PaddingBottom from "app/assets/vectors/RBPaddingBottom.svg?react";
import { Editor, useEditorState } from "@tiptap/react";
import {
  Link,
  Check,
  FormatBold,
  FormatQuote,
  FormatItalic,
  FormatAlignLeft,
  KeyboardArrowUp,
  FormatUnderlined,
  FormatAlignRight,
  FormatAlignCenter,
  KeyboardArrowDown,
  FormatListBulleted,
  FormatListNumbered,
} from "@mui/icons-material";
import { ColorPicker } from "app/components/color-picker/example";
import { ColorService } from "app/components/color-picker/utils/color";

export const RTEToolbar: React.FC<{ editor: Editor }> = ({ editor }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null);

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive("bold"),
        isItalic: ctx.editor.isActive("italic"),
        isUnderlined: ctx.editor.isActive("underline"),
        color: ctx.editor.getAttributes("textStyle").color ?? "#000000",
        bgColor:
          ctx.editor.getAttributes("textStyle").backgroundColor ?? "#ffffff",
        fontSize: ctx.editor.getAttributes("textStyle").fontSize ?? "16px",
        isNormalText: ctx.editor.isActive("paragraph"),
        isTitle: ctx.editor.isActive("heading", { level: 10 }),
        isSubtitle: ctx.editor.isActive("heading", { level: 11 }),
        isH1: ctx.editor.isActive("heading", { level: 1 }),
        isH2: ctx.editor.isActive("heading", { level: 2 }),
        isH3: ctx.editor.isActive("heading", { level: 3 }),
        isAlignLeft: ctx.editor.isActive({ textAlign: "left" }),
        isAlignCenter: ctx.editor.isActive({ textAlign: "center" }),
        isAlignRight: ctx.editor.isActive({ textAlign: "right" }),
        isAlignJustify: ctx.editor.isActive({ textAlign: "justify" }),
        isBulletList: ctx.editor.isActive("bulletList") ?? false,
        isOrderedList: ctx.editor.isActive("orderedList") ?? false,
        isBlockquote: ctx.editor.isActive("blockquote") ?? false,
        isFontFamilyInter: ctx.editor.isActive("textStyle", {
          fontFamily: "Inter",
        }),
        isFontFamilyArial: ctx.editor.isActive("textStyle", {
          fontFamily: "Arial",
        }),
        isFontFamilyTimesNewRoman: ctx.editor.isActive("textStyle", {
          fontFamily: "Times New Roman",
        }),
        isFontFamilyCourierNew: ctx.editor.isActive("textStyle", {
          fontFamily: "Courier New",
        }),
      };
    },
  });

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick2 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const onHeadingChange = (value: string) => () => {
    if (value === "paragraph") {
      editor.chain().focus().setParagraph().run();
    } else if (value === "title") {
      editor
        .chain()
        .focus()
        .setHeading({ level: 10 as Level })
        .run();
    } else if (value === "subtitle") {
      editor
        .chain()
        .focus()
        .setHeading({ level: 11 as Level })
        .run();
    } else {
      editor
        .chain()
        .focus()
        .setHeading({ level: parseInt(value, 10) as Level })
        .run();
    }
  };

  // const onFontSizeChange = (action: "minus" | "plus") => {
  //   const value = editor.getAttributes("textStyle").fontSize ?? "16px";
  //   const valueNumber = parseInt(value.replace("px", ""), 10);
  //   const newValue = action === "minus" ? valueNumber - 1 : valueNumber + 1;
  //   if (newValue < 1) return;
  //   editor
  //     .chain()
  //     .focus()
  //     .setFontSize(newValue.toString() + "px")
  //     .run();
  // };

  const onFontFamilyChange = (value: string) => () => {
    editor.chain().focus().setFontFamily(value).run();
  };

  const setLink = () => {
    const url = prompt("Enter URL:");
    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
  };

  const headingValue = React.useMemo(() => {
    if (editorState.isTitle) return "Title";
    if (editorState.isSubtitle) return "Subtitle";
    if (editorState.isH1) return "Heading 1";
    if (editorState.isH2) return "Heading 2";
    if (editorState.isH3) return "Heading 3";
    return "Normal Text";
  }, [
    editorState.isNormalText,
    editorState.isTitle,
    editorState.isSubtitle,
    editorState.isH1,
    editorState.isH2,
    editorState.isH3,
  ]);

  const fontFamilyValue = React.useMemo(() => {
    return editor.getAttributes("textStyle").fontFamily ?? "Inter";
  }, [editor]);

  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);

  return (
    <Box
      sx={{
        gap: "16px",
        width: "100%",
        display: "flex",
        borderRadius: "8px",
        padding: "16px 8px 0 8px",
        flexDirection: "column",
        bgcolor: "#f8f9fa",
        border: "1px solid #98a1aa",
        ".MuiIconButton-root": {
          padding: "0 5.143px",
          borderRadius: "3.6px",
          border: "0.5px solid #98A1AA",
          width: "36px",
          height: "36px",
        },
        ".active-icon-button": {
          background: "#3154F4",
          path: {
            color: "#fff",
          },
        },
      }}
    >
      <Box>
        <Typography sx={{ color: "#373D43", fontSize: "14px" }}>
          Font
        </Typography>
        {/* Font family */}
        <Button
          variant="text"
          onClick={handleClick2}
          endIcon={open2 ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          sx={{
            fontWeight: "400",
            textTransform: "none",
            color: "#000",
            bgcolor: "transparent",
            width: "100%",
            justifyContent: "space-between",
            borderRadius: "4px",
            border: "0.5px solid #98A1AA",
          }}
        >
          {fontFamilyValue}
        </Button>
        <Menu
          open={open2}
          keepMounted
          disableScrollLock
          anchorEl={anchorEl2}
          onClose={handleClose2}
          transformOrigin={{
            vertical: -5,
            horizontal: "left",
          }}
          sx={{
            "& .MuiPaper-root": {
              width: "200px",
              borderRadius: "4px",
              border: "1px solid #dfe3e5",
            },
            "& .MuiMenuItem-root": {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            },
          }}
          classes={{ paper: "rte-keep-open" }}
        >
          {fontFamilyOptions.map((option) => (
            <MenuItem
              key={option.value}
              onClick={onFontFamilyChange(option.value)}
            >
              {option.label}
              {get(editorState, option.stateVar, false) && (
                <Check fontSize="small" htmlColor="#495057" />
              )}
            </MenuItem>
          ))}
        </Menu>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <Box>
          {/* Paragraph / Headings */}
          <Typography sx={{ color: "#373D43", fontSize: "14px" }}>
            Weight
          </Typography>
          <Button
            variant="text"
            onClick={handleClick}
            endIcon={open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            sx={{
              fontWeight: "400",
              textTransform: "none",
              color: "#000",
              bgcolor: "transparent",
              width: "100%",
              justifyContent: "space-between",
              borderRadius: "4px",
              border: "0.5px solid #98A1AA",
            }}
          >
            {headingValue}
          </Button>
          <Menu
            open={open}
            keepMounted
            disableScrollLock
            anchorEl={anchorEl}
            onClose={handleClose}
            transformOrigin={{
              vertical: -5,
              horizontal: "left",
            }}
            sx={{
              "& .MuiPaper-root": {
                width: "200px",
                borderRadius: "4px",
                border: "1px solid #dfe3e5",
              },
              "& .MuiMenuItem-root": {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              },
            }}
            classes={{ paper: "rte-keep-open" }}
          >
            {headingOptions.map((option) => (
              <MenuItem
                sx={option.style}
                key={option.value}
                onClick={onHeadingChange(option.value)}
              >
                {option.label}
                {headingValue === option.label && (
                  <Check fontSize="small" htmlColor="#495057" />
                )}
              </MenuItem>
            ))}
          </Menu>
        </Box>

        <Box>
          {/* Paragraph / Headings */}
          <Typography sx={{ color: "#373D43", fontSize: "14px" }}>
            Size
          </Typography>
          <Button
            variant="text"
            onClick={handleClick}
            endIcon={open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            sx={{
              fontWeight: "400",
              textTransform: "none",
              color: "#000",
              bgcolor: "transparent",
              width: "100%",
              justifyContent: "space-between",
              borderRadius: "4px",
              border: "0.5px solid #98A1AA",
            }}
          >
            {headingValue}
          </Button>
          <Menu
            open={open}
            keepMounted
            disableScrollLock
            anchorEl={anchorEl}
            onClose={handleClose}
            transformOrigin={{
              vertical: -5,
              horizontal: "left",
            }}
            sx={{
              "& .MuiPaper-root": {
                width: "200px",
                borderRadius: "4px",
                border: "1px solid #dfe3e5",
              },
              "& .MuiMenuItem-root": {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              },
            }}
            classes={{ paper: "rte-keep-open" }}
          >
            {headingOptions.map((option) => (
              <MenuItem
                sx={option.style}
                key={option.value}
                onClick={onHeadingChange(option.value)}
              >
                {option.label}
                {headingValue === option.label && (
                  <Check fontSize="small" htmlColor="#495057" />
                )}
              </MenuItem>
            ))}
          </Menu>
        </Box>
        {/* Font size */}
        {/* <Box
          sx={{
            gap: "15px",
            display: "flex",
            borderRadius: "4px",
            alignItems: "center",
            border: "1px solid #cfd4da",
            boxShadow: "0 1px 2px 0 rgba(26, 26, 26, 0.08)",
          }}
        >
          <IconButton onClick={() => onFontSizeChange("minus")}>
            <Remove fontSize="small" htmlColor="#495057" />
          </IconButton>
          <Typography fontSize="14px">
            {editorState.fontSize.replace("px", "")}
          </Typography>
          <IconButton onClick={() => onFontSizeChange("plus")}>
            <Add fontSize="small" htmlColor="#495057" />
          </IconButton>
        </Box> */}
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <Box>
          <Typography sx={{ color: "#373D43", fontSize: "14px" }}>
            Line Height
          </Typography>
          <Button
            variant="text"
            onClick={handleClick}
            endIcon={open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            sx={{
              fontWeight: "400",
              textTransform: "none",
              color: "#000",
              bgcolor: "transparent",
              width: "100%",
              justifyContent: "space-between",
              borderRadius: "4px",
              border: "0.5px solid #98A1AA",
            }}
          >
            {headingValue}
          </Button>
          <Menu
            open={open}
            keepMounted
            disableScrollLock
            anchorEl={anchorEl}
            onClose={handleClose}
            transformOrigin={{
              vertical: -5,
              horizontal: "left",
            }}
            sx={{
              "& .MuiPaper-root": {
                width: "200px",
                borderRadius: "4px",
                border: "1px solid #dfe3e5",
              },
              "& .MuiMenuItem-root": {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              },
            }}
            classes={{ paper: "rte-keep-open" }}
          >
            {headingOptions.map((option) => (
              <MenuItem
                sx={option.style}
                key={option.value}
                onClick={onHeadingChange(option.value)}
              >
                {option.label}
                {headingValue === option.label && (
                  <Check fontSize="small" htmlColor="#495057" />
                )}
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Box>
          <Typography sx={{ color: "#373D43", fontSize: "14px" }}>
            Letter Spacing
          </Typography>
          <Button
            variant="text"
            onClick={handleClick}
            endIcon={open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            sx={{
              fontWeight: "400",
              textTransform: "none",
              color: "#000",
              bgcolor: "transparent",
              width: "100%",
              justifyContent: "space-between",
              borderRadius: "4px",
              border: "0.5px solid #98A1AA",
            }}
          >
            {headingValue}
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "13px" }}>
          {/* Alignment */}
          <IconButton
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={editorState.isAlignLeft ? "active-icon-button" : ""}
          >
            <FormatAlignLeft fontSize="small" htmlColor="#495057" />
          </IconButton>
          <IconButton
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={editorState.isAlignCenter ? "active-icon-button" : ""}
          >
            <FormatAlignCenter fontSize="small" htmlColor="#495057" />
          </IconButton>
          <IconButton
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={editorState.isAlignRight ? "active-icon-button" : ""}
          >
            <FormatAlignRight fontSize="small" htmlColor="#495057" />
          </IconButton>
        </Box>
        {/* Padding */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "13px" }}>
          <IconButton
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            className={editorState.isAlignJustify ? "active-icon-button" : ""}
          >
            <PaddingTop />
          </IconButton>
          <IconButton
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            className={editorState.isAlignJustify ? "active-icon-button" : ""}
          >
            <PaddingBottom />
          </IconButton>

          <IconButton
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            className={editorState.isAlignJustify ? "active-icon-button" : ""}
          >
            <PaddingBottom />
          </IconButton>
        </Box>
      </Box>

      <Divider orientation="vertical" flexItem />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography
            sx={{ color: "#373D43", fontSize: "14px", marginBottom: "8px" }}
          >
            Text Color
          </Typography>

          <ColorPicker
            color={ColorService.convert("hex", editorState.color)}
            onChange={(color) => {
              editor.chain().focus().setColor(color.hex).run();
            }}
            disabled={false}
            onResetColor={() => {
              editor.chain().focus().setColor("#ffffff").run();
            }}
            onChangeComplete={() => {}}
          />
        </Box>
        <Box>
          <Typography
            sx={{ color: "#373D43", fontSize: "14px", marginBottom: "8px" }}
          >
            Highlight Color
          </Typography>

          <ColorPicker
            color={ColorService.convert("hex", editorState.bgColor)}
            onChange={(color) => {
              editor.chain().focus().setBackgroundColor(color.hex).run();
            }}
            disabled={false}
            onResetColor={() => {
              editor.chain().focus().setBackgroundColor("#ffffff").run();
            }}
            onChangeComplete={() => {}}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        {/* Bold / Italic / Underline / Text Color / Highlight */}
        <IconButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editorState.isBold ? "active-icon-button" : ""}
        >
          <FormatBold fontSize="small" htmlColor="#495057" />
        </IconButton>
        <IconButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editorState.isItalic ? "active-icon-button" : ""}
        >
          <FormatItalic fontSize="small" htmlColor="#495057" />
        </IconButton>
        <IconButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editorState.isUnderlined ? "active-icon-button" : ""}
        >
          <FormatUnderlined fontSize="small" htmlColor="#495057" />
        </IconButton>
        {/* Lists */}
        <IconButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editorState.isBulletList ? "active-icon-button" : ""}
        >
          <FormatListBulleted fontSize="small" htmlColor="#495057" />
        </IconButton>
        <IconButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editorState.isOrderedList ? "active-icon-button" : ""}
        >
          <FormatListNumbered fontSize="small" htmlColor="#495057" />
        </IconButton>
        {/* Blockquote */}
        <IconButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editorState.isBlockquote ? "active-icon-button" : ""}
        >
          <FormatQuote fontSize="small" htmlColor="#495057" />
        </IconButton>
        {/* Link */}
        <IconButton onClick={setLink}>
          <Link fontSize="small" htmlColor="#495057" />
        </IconButton>
      </Box>

      {/* <IconButton
        onClick={() => {
          const colorPicker = document.getElementById(
            "colorPicker"
          ) as HTMLInputElement;
          colorPicker.click();
        }}
        sx={
          editorState.color !== "#000000"
            ? {
                bgcolor: editorState.color,
                "&:hover": { bgcolor: editorState.color },
              }
            : {}
        }
      >
        <FormatColorText
          fontSize="small"
          htmlColor={editorState.color !== "#000000" ? "#ffffff" : "#495057"}
        />
        <input
          type="color"
          id="colorPicker"
          value={editorState.color}
          onInput={(event) =>
            editor.chain().focus().setColor(event.currentTarget.value).run()
          }
          style={{
            width: 0,
            height: 0,
            position: "absolute",
            visibility: "hidden",
          }}
        />
      </IconButton> */}
      {/* <IconButton
        onClick={() => {
          const colorPicker = document.getElementById(
            "bgColorPicker"
          ) as HTMLInputElement;
          colorPicker.click();
        }}
        sx={
          editorState.bgColor !== "#ffffff"
            ? {
                bgcolor: editorState.bgColor,
                path: { fill: "#ffffff" },
                "&:hover": { bgcolor: editorState.bgColor },
              }
            : {}
        }
      >
        <HighlightIcon />
        <input
          type="color"
          id="bgColorPicker"
          value={editorState.bgColor}
          onInput={(event) =>
            editor
              .chain()
              .focus()
              .setBackgroundColor(event.currentTarget.value)
              .run()
          }
          style={{
            width: 0,
            height: 0,
            position: "absolute",
            visibility: "hidden",
          }}
        />
      </IconButton> */}
    </Box>
  );
};
