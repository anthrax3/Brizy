import { renderStyles } from "visual/utils/cssStyle";

export function styleBg(v, vs, vd, props) {
  const styles = {
    ".brz &&:hover > .brz-bg-media": {
      standart: ["cssStyleBorder", "cssStyleBorderRadius"],
      interval: [
        "cssStyleHoverTransition",
        "cssStyleSectionPropertyHoverTransition"
      ]
    },
    ".brz &&:hover > .brz-bg-media > .brz-bg-image": {
      standart: [
        "cssStyleBgImage",
        "cssStyleFilter",
        "cssStyleBgImagePosition"
      ],
      interval: [
        "cssStyleBgImageAttachment",
        "cssStyleHoverTransition",
        "cssStyleSectionPropertyHoverTransition"
      ]
    },
    ".brz &&:hover > .brz-bg-media > .brz-bg-color": {
      standart: ["cssStyleBgColor", "cssStyleBgGradient"],
      interval: [
        "cssStyleHoverTransition",
        "cssStyleSectionPropertyHoverTransition"
      ]
    },
    ".brz &&:hover > .brz-bg-media > .brz-bg-map": {
      standart: ["cssStyleFilter", "cssStyleBgMap"],
      interval: [
        "cssStyleHoverTransition",
        "cssStyleSectionPropertyHoverTransition"
      ]
    },
    ".brz &&:hover > .brz-bg-media > .brz-bg-video": {
      standart: ["cssStyleFilter"],
      interval: [
        "cssStyleHoverTransition",
        "cssStyleSectionPropertyHoverTransition"
      ]
    },
    ".brz &&:hover > .brz-bg-media > .brz-bg-shape__top": {
      standart: [
        "cssStyleShapeTopType",
        "cssStyleShapeTopHeight",
        "cssStyleShapeTopFlip",
        "cssStyleShapeTopIndex"
      ]
    },
    ".brz &&:hover > .brz-bg-media > .brz-bg-shape__bottom": {
      standart: [
        "cssStyleShapeBottomType",
        "cssStyleShapeBottomHeight",
        "cssStyleShapeBottomFlip",
        "cssStyleShapeBottomIndex"
      ]
    },
    ".brz &&:hover > .brz-bg-content": {
      standart: [
        "cssStylePaddingPreview",
        "cssStylePaddingRightLeftForEditor",
        "cssStyleDisplayFlex"
      ]
    },
    ".brz &&:hover > .brz-bg-content > .brz-ed-draggable__padding--top": {
      standart: ["cssStylePaddingTopForEditorResizer"]
    },
    ".brz &&:hover > .brz-bg-content > .brz-ed-draggable__padding--bottom": {
      standart: ["cssStylePaddingBottomForEditorResizer"]
    }
  };

  return renderStyles({ v, vs, vd, styles, props });
}

export function styleContainer(v, vs, vd) {
  const styles = {
    ".brz &&:hover": {
      standart: ["cssStyleBorderTransparentColor"],
      interval: ["cssStyleSectionMaxWidth"]
    }
  };

  return renderStyles({ v, vs, vd, styles });
}

export function styleContainerWrap(v, vs, vd) {
  const styles = {
    ".brz &&:hover": {
      interval: ["cssStyleSectionContainerType"]
    }
  };

  return renderStyles({ v, vs, vd, styles });
}
