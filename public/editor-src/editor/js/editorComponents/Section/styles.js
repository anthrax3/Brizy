import { renderStyles } from "visual/utils/cssStyle";

export function styleSection(v, vs, vd) {
  const styles = {
    ".brz &&:hover": {
      standart: ["cssStyleZIndex", "cssStyleMargin"],
      interval: [
        "cssStyleDisplayBlock",
        "cssStyleVisibleMode|||preview",
        "cssStyleVisibleEditorDisplayNoneOrBlock|||editor"
      ]
    },
    ".brz &&:hover .brz-container__wrap": {
      interval: ["cssStyleVisibleMode|||editor"]
    },
    ".brz &&:hover .brz-section__content": {
      standart: ["cssStyleSectionHeightStyle", "cssStyleDisplayFlex"]
    },
    ".brz &&:hover .brz-section__content > .brz-ed-border > .brz-bg": {
      standart: ["cssStyleFlexVerticalAlign", "cssStyleDisplayFlex"]
    },
    ".brz &&:hover .brz-section__content > .brz-bg": {
      standart: ["cssStyleFlexVerticalAlign", "cssStyleDisplayFlex"]
    },
    ".brz &&:hover .brz-section__content > .brz-bg > .brz-bg-content": {
      standart: ["cssStyleFlexVerticalAlign"]
    },
    ".brz && > .slick-slider > .brz-slick-slider__dots:hover": {
      standart: ["cssStyleSectionColorDots"]
    },
    ".brz && > .slick-slider > .brz-slick-slider__arrow:hover": {
      standart: ["cssStyleSectionColorArrows"]
    }
  };

  if (IS_EDITOR) {
    // Added offset for toolbar when uses marginTop in negative value
    styles[".brz &&:hover .brz-ed-collapsible"] = {
      standart: ["cssStyleSectionToolbarOffset"]
    };
  }

  return renderStyles({ v, vs, vd, styles });
}
