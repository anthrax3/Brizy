import { renderStyles } from "visual/utils/cssStyle";

export function style(v, vs, vd) {
  const styles = {
    ".brz &&:hover ": {
      standart: [
        "cssStyleTypography2FontFamily",
        "cssStyleTypography2FontSize",
        "cssStyleTypography2LineHeight",
        "cssStyleTypography2FontWeight",
        "cssStyleTypography2LetterSpacing"
      ]
    },
    ".brz && .brz-accordion__item:hover": {
      standart: [
        "cssStyleBoxShadow",
        "cssStyleBorder",
        "cssStyleBorderRadius",
        "cssStyleColor",
        "cssStyleBgColor"
      ]
    },
    ".brz && .brz-accordion__nav": {
      standart: ["cssStyleElementAccordionNavAlign"]
    },
    ".brz && .brz-accordion__nav--icon": {
      standart: ["cssStyleElementAccordionNavIconSpacing"]
    },
    ".brz && .brz-accordion__item:not(:last-child)": {
      standart: ["cssStyleElementAccordionSpacing"]
    },
    ".brz &&:hover .brz-accordion__content": {
      standart: [
        "cssStylePaddingFourFields",
        "cssStyleElementAccordionMarginTop"
      ]
    },

    // Styles for filter
    ".brz && .brz-accordion__filter-wrapper": {
      standart: [
        "cssStyleElementAccordionFilterHorizontalAlign",
        "cssStyleElementAccordion3FontFamily",
        "cssStyleElementAccordion3FontSize",
        "cssStyleElementAccordion3LineHeight",
        "cssStyleElementAccordion3FontWeight",
        "cssStyleElementAccordion3LetterSpacing"
      ]
    },

    ".brz && .brz-accordion__filter": {
      standart: ["cssStyleElementAccordionFilterAfterSpacing"]
    },

    ".brz && .brz-accordion__filter__item ": {
      standart: ["cssStyleElementAccordionFilterSpacing"]
    },
    ".brz && .brz-accordion__filter__item:hover": {
      standart: ["cssStyleElementAccordionFilterColor"]
    },
    ".brz && .brz-accordion__filter__item--style-1:hover": {
      standart: [
        "cssStyleElementAccordionFilterPaddingFourFields",
        "cssStyleElementAccordionFilterBgColor",
        "cssStyleElementAccordionFilterBorder",
        "cssStyleElementAccordionFilterBorderRadius",
        "cssStyleElementAccordionFilterShadow"
      ]
    },
    ".brz && .brz-accordion__filter--style-2:hover": {
      standart: [
        "cssStyleElementAccordionFilterPaddingFourFields",
        "cssStyleElementAccordionFilterBgColor",
        "cssStyleElementAccordionFilterBorder",
        "cssStyleElementAccordionFilterShadow",
        "cssStyleElementAccordionFilterBorderRadius",
        "cssStyleDisplayInlineFlex"
      ]
    }
  };
  return renderStyles({ v, vs, vd, styles });
}
