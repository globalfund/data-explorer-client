import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { Level } from "@tiptap/extension-heading";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import {
  headingOptions,
  fontFamilyOptions,
  fontSizeOptions,
  lineHeightOptions,
} from "app/components/rich-text-editor/data";
import AlignTop from "app/assets/vectors/RBAlignTop.svg?react";
import AlignCenter from "app/assets/vectors/RBAlignCenter.svg?react";
import AlignBottom from "app/assets/vectors/RBAlignBottom.svg?react";
import ParagraphAdd from "app/assets/vectors/RBParagraphAdd.svg?react";
import ParagraphRemove from "app/assets/vectors/RBParagraphRemove.svg?react";
import ListBulleted from "app/assets/vectors/RBListBulleted.svg?react";
import ListNumbered from "app/assets/vectors/RBListNumbered.svg?react";
import Strikethrough from "app/assets/vectors/RBStrikethrough.svg?react";
import Underline from "app/assets/vectors/RBUnderline.svg?react";
import Blockquotes from "app/assets/vectors/RBBlockquotes.svg?react";
import LinkIcon from "app/assets/vectors/RBLink.svg?react";

import { Editor, useEditorState } from "@tiptap/react";
import {
  FormatAlignLeft,
  KeyboardArrowUp,
  FormatAlignRight,
  FormatAlignCenter,
  KeyboardArrowDown,
} from "@mui/icons-material";
import { ColorPicker } from "app/components/color-picker/example";
import { ColorService } from "app/components/color-picker/utils/color";
import StyledMenu from "./menu-popup";
import TextField from "@mui/material/TextField";

export const RTEToolbar: React.FC<{ editor: Editor }> = ({ editor }) => {
  const [fontFamilyAnchorEl, setFontFamilyAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [fontWeightAnchorEl, setFontWeightAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [fontSizeAnchorEl, setFontSizeAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [lineHeightAnchorEl, setLineHeightAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isFontFamilyMenuActive = Boolean(fontFamilyAnchorEl);
  const isFontWeightMenuActive = Boolean(fontWeightAnchorEl);
  const isFontSizeMenuActive = Boolean(fontSizeAnchorEl);
  const isLineHeightMenuActive = Boolean(lineHeightAnchorEl);
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
        lineHeight: ctx.editor.getAttributes("textStyle").lineHeight ?? "auto",
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
  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    menuType: string,
  ) => {
    switch (menuType) {
      case "fontFamily":
        setFontFamilyAnchorEl(event.currentTarget);
        break;
      case "fontWeight":
        setFontWeightAnchorEl(event.currentTarget);
        break;
      case "fontSize":
        setFontSizeAnchorEl(event.currentTarget);
        break;
      case "lineHeight":
        setLineHeightAnchorEl(event.currentTarget);
        break;
    }
  };

  const handleClose = (menuType: string) => {
    switch (menuType) {
      case "fontFamily":
        setFontFamilyAnchorEl(null);
        break;
      case "fontWeight":
        setFontWeightAnchorEl(null);
        break;
      case "fontSize":
        setFontSizeAnchorEl(null);
        break;
      case "lineHeight":
        setLineHeightAnchorEl(null);
        break;
    }
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
        .setHeading({ level: Number(value) as Level })
        .run();
    }
  };

  const onFontSizeChange = () => {
    const value = editor.getAttributes("textStyle").fontSize ?? "16px";
    const valueNumber = Number(value.replace("px", ""));
    if (valueNumber < 1) return;
    editor
      .chain()
      .focus()
      .setFontSize(valueNumber.toString() + "px")
      .run();
  };
  const fontSizeValue = React.useMemo(() => {
    return editor.getAttributes("textStyle").fontSize ?? "16px";
  }, [editor]);

  const onFontFamilyChange = (value: string) => () => {
    console.log("value", value);
    editor.chain().focus().setFontFamily(value).run();
  };

  const onLineHeightChange = (value: string) => () => {
    editor.chain().focus().setLineHeight(value).run();
  };

  const lineHeightValue = React.useMemo(() => {
    return editor.getAttributes("textStyle").lineHeight ?? "auto";
  }, [editor]);

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
  return (
    <Box
      sx={{
        gap: "16px",
        width: "100%",
        display: "flex",
        borderRadius: "8px",
        padding: "16px 8px 16px 8px",
        flexDirection: "column",
        bgcolor: "#f8f9fa",

        ".icon-button": {
          padding: "0 5.143px",
          borderRadius: "3.6px",
          border: "0.5px solid #98A1AA",
          width: "36px",
          height: "36px",
          background: "#fff",
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
        <Typography
          sx={{ color: "#373D43", fontSize: "14px", marginBottom: "8px" }}
        >
          Font
        </Typography>
        {/* Font family */}
        <Button
          variant="text"
          onClick={(event) => handleClick(event, "fontFamily")}
          endIcon={
            isFontWeightMenuActive ? <KeyboardArrowUp /> : <KeyboardArrowDown />
          }
          sx={{
            fontWeight: "400",
            textTransform: "none",
            color: "#000",
            bgcolor: "#fff",
            width: "100%",
            justifyContent: "space-between",
            borderRadius: "4px",
            border: "0.5px solid #98A1AA",
          }}
        >
          {fontFamilyValue}
        </Button>

        <StyledMenu
          open={isFontFamilyMenuActive}
          anchorEl={fontFamilyAnchorEl}
          onClose={() => handleClose("fontFamily")}
          options={fontFamilyOptions}
          activeValue={fontFamilyValue}
          onSelect={onFontFamilyChange}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          {/* Paragraph / Headings */}
          <Typography
            sx={{ color: "#373D43", fontSize: "14px", marginBottom: "8px" }}
          >
            Weight
          </Typography>
          <Button
            variant="text"
            onClick={(event) => handleClick(event, "fontWeight")}
            endIcon={
              isFontFamilyMenuActive ? (
                <KeyboardArrowUp />
              ) : (
                <KeyboardArrowDown />
              )
            }
            sx={{
              fontWeight: "400",
              textTransform: "none",
              color: "#000",
              bgcolor: "#fff",
              width: "134px",
              justifyContent: "space-between",
              borderRadius: "4px",
              border: "0.5px solid #98A1AA",
            }}
          >
            {headingValue}
          </Button>

          <StyledMenu
            open={isFontWeightMenuActive}
            anchorEl={fontWeightAnchorEl}
            onClose={() => handleClose("fontWeight")}
            options={headingOptions}
            activeValue={headingValue}
            onSelect={onHeadingChange}
          />
        </Box>

        <Box>
          <Typography
            sx={{ color: "#373D43", fontSize: "14px", marginBottom: "8px" }}
          >
            Size
          </Typography>
          <Button
            variant="text"
            onClick={(event) => handleClick(event, "fontSize")}
            endIcon={
              isFontSizeMenuActive ? <KeyboardArrowUp /> : <KeyboardArrowDown />
            }
            sx={{
              fontWeight: "400",
              textTransform: "none",
              color: "#000",
              bgcolor: "#fff",
              width: "134px",
              justifyContent: "space-between",
              borderRadius: "4px",
              border: "0.5px solid #98A1AA",
            }}
          >
            {editorState.fontSize}
          </Button>

          <StyledMenu
            open={isFontSizeMenuActive}
            anchorEl={fontSizeAnchorEl}
            onClose={() => handleClose("fontSize")}
            options={fontSizeOptions}
            activeValue={fontSizeValue.replace("px", "")}
            onSelect={onFontSizeChange}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            sx={{ color: "#373D43", fontSize: "14px", marginBottom: "8px" }}
          >
            Line Height
          </Typography>
          <Button
            variant="text"
            onClick={(event) => handleClick(event, "lineHeight")}
            endIcon={
              isLineHeightMenuActive ? (
                <KeyboardArrowUp />
              ) : (
                <KeyboardArrowDown />
              )
            }
            sx={{
              fontWeight: "400",
              textTransform: "none",
              color: "#000",
              bgcolor: "#fff",
              width: "134px",
              justifyContent: "space-between",
              borderRadius: "4px",
              border: "0.5px solid #98A1AA",
            }}
          >
            {lineHeightValue}
          </Button>

          <StyledMenu
            open={isLineHeightMenuActive}
            anchorEl={lineHeightAnchorEl}
            onClose={() => handleClose("lineHeight")}
            options={lineHeightOptions}
            activeValue={lineHeightValue}
            onSelect={onLineHeightChange}
          />
        </Box>
        <Box>
          <Typography
            sx={{ color: "#373D43", fontSize: "14px", marginBottom: "8px" }}
          >
            Letter Spacing
          </Typography>
          <Box
            sx={{
              width: "134px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              border: "0.5px solid #98A1AA",
              backgroundColor: "#FFF",
              borderRadius: "4px",
              padding: "0 16px",
            }}
          >
            <TextField
              variant="standard"
              value={"0px"}
              slotProps={{
                input: { disableUnderline: true },
              }}
            />
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "13px" }}>
          {/* Alignment */}
          <IconButton
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={
              editorState.isAlignLeft ? "active-icon-button" : "icon-button"
            }
          >
            <FormatAlignLeft fontSize="small" htmlColor="#495057" />
          </IconButton>
          <IconButton
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={
              editorState.isAlignCenter ? "active-icon-button" : "icon-button"
            }
          >
            <FormatAlignCenter fontSize="small" htmlColor="#495057" />
          </IconButton>
          <IconButton
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={
              editorState.isAlignRight ? "active-icon-button" : "icon-button"
            }
          >
            <FormatAlignRight fontSize="small" htmlColor="#495057" />
          </IconButton>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: "13px" }}>
          <IconButton
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            className={
              editorState.isAlignJustify ? "active-icon-button" : "icon-button"
            }
          >
            <AlignTop />
          </IconButton>
          <IconButton
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            className={
              editorState.isAlignJustify ? "active-icon-button" : "icon-button"
            }
          >
            <AlignCenter />
          </IconButton>

          <IconButton
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            className={
              editorState.isAlignJustify ? "active-icon-button" : "icon-button"
            }
          >
            <AlignBottom />
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
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "13px" }}>
          {/* Bold / Italic / Underline / Text Color / Highlight */}
          <IconButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={
              editorState.isBold ? "active-icon-button" : "icon-button"
            }
          >
            <ParagraphAdd />
          </IconButton>
          <IconButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={
              editorState.isItalic ? "active-icon-button" : "icon-button"
            }
          >
            <ParagraphRemove />
          </IconButton>
          <IconButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={
              editorState.isBulletList ? "active-icon-button" : "icon-button"
            }
          >
            <ListBulleted />
          </IconButton>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: "13px" }}>
          {/* Lists */}

          <IconButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={
              editorState.isOrderedList ? "active-icon-button" : "icon-button"
            }
          >
            <ListNumbered />
          </IconButton>

          <IconButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={
              editorState.isOrderedList ? "active-icon-button" : "icon-button"
            }
          >
            <Strikethrough />
          </IconButton>
          <IconButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={
              editorState.isOrderedList ? "active-icon-button" : "icon-button"
            }
          >
            <Underline />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: "13px" }}>
        {/* Link */}
        <IconButton
          onClick={setLink}
          className={
            editorState.isBlockquote ? "active-icon-button" : "icon-button"
          }
        >
          <LinkIcon />
        </IconButton>
        {/* Blockquote */}
        <IconButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={
            editorState.isBlockquote ? "active-icon-button" : "icon-button"
          }
        >
          <Blockquotes />
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
