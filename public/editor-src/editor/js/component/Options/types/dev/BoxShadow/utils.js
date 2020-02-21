import {
  getBlur,
  getHorizontal,
  getSpread,
  getVertical,
  setBlur,
  setHorizontal,
  setOpacity,
  setPalette,
  setSpread,
  setType,
  setVertical,
  setHex,
  getPalette,
  getOpacity,
  getType
} from "visual/component/Options/types/dev/BoxShadow/model";
import * as ColorUtils from "visual/component/Options/types/dev/ColorPicker/utils";
import * as Math from "visual/utils/math";
import { get, _apply, set } from "visual/utils/model";
import { capByPrefix } from "visual/utils/string";
import { toBlur, toSpread } from "visual/utils/cssProps";
import { t } from "visual/utils/i18n";
import { toObject } from "visual/utils/object";
import * as T from "visual/component/Options/types/dev/BoxShadow/entities/type";
import { NONE } from "visual/component/Options/types/dev/BoxShadow/entities/type";
import { OUTSET } from "visual/component/Options/types/dev/BoxShadow/entities/type";

/**
 * Toggles shadow type
 *  - on enable, set opacity to the latest non empty value
 *  - on disable, set type to 0
 *
 * @param {boolean} enable
 * @param {object} m
 * @return {object}
 */
export const toggleColor = (enable, m) => {
  const opacity = enable ? getOpacity(m) || get("tempOpacity", m) : 0;
  const palette = enable ? getPalette(m) || get("tempPalette", m) : "";

  return _apply([[setOpacity, opacity], [setPalette, palette]], m);
};

/**
 * Toggles shadow type
 *  - on enable, set type to the latest non empty value
 *  - on disable, set type to NONE
 *
 * @param {boolean} enable
 * @param {object} m
 * @return {object}
 */
export const toggleType = (enable, m) => {
  const value = enable ? T.onEmpty(get("tempType", m), getType(m)) : T.NONE;

  return setType(value, m);
};

/**
 *
 * @param {boolean} enable
 * @param {object} m
 * @return {object}
 */
export const toggleFields = (enable, m) => {
  const u = undefined;
  const blur = getBlur(m, u) || get("tempBlur", m, 0);
  const spread = getSpread(m, u) || get("tempSpread", m, 0);
  const horizontal = getHorizontal(m, u) || get("tempHorizontal", m, 0);
  const vertical = getVertical(m, u) || get("tempVertical", m, 0);
  const model = { ...toObject(m) };

  model.blur = enable ? blur : 0;
  model.tempBlur = blur;
  model.spread = enable ? spread : 0;
  model.tempSpread = spread;
  model.vertical = enable ? vertical : 0;
  model.tempVertical = vertical;
  model.horizontal = enable ? horizontal : 0;
  model.tempHorizontal = horizontal;

  return model;
};

export const setField = (key, v, m) => {
  const getter = fieldGetter(key);
  const valid = fieldValidation(key);

  if (valid(v) === undefined || getter(m) === v) {
    return m;
  }

  const value = v === 0 ? getter(m) : undefined;

  return _apply(
    [
      [set, "blur", getBlur(m, 0)],
      [set, "tempBlur", getBlur(m, 0)],
      [set, "spread", getSpread(m, 0)],
      [set, "tempSpread", getSpread(m, 0)],
      [set, "vertical", getVertical(m, 0)],
      [set, "tempVertical", getVertical(m, 0)],
      [set, "horizontal", getHorizontal(m, 0)],
      [set, "tempHorizontal", getHorizontal(m, 0)],
      [set, capByPrefix("temp", key), value],
      [set, key, v],
      [toggleType, v || fieldsEnabled(m)]
    ],
    m
  );
};

/**
 * Returns a shadow getter
 *
 * @param {string} key
 * @return {function}
 */
export const fieldGetter = key => {
  switch (key) {
    case "blur":
      return getBlur;
    case "spread":
      return getSpread;
    case "horizontal":
      return getHorizontal;
    case "vertical":
      return getVertical;
    default:
      return get;
  }
};

/**
 * Returns a shadow getter
 *
 * @param {string} key
 * @return {function}
 */
export const fieldValidation = key => {
  switch (key) {
    case "blur":
      return toBlur;
    case "spread":
      return toSpread;
    case "horizontal":
    case "vertical":
      return Math.toNonNegative;
    default:
      return v => v;
  }
};

/**
 * Check if shadow options are enabled
 *
 * @param {object} m
 * @return {boolean}
 */
export const fieldsEnabled = m => {
  return !!(
    getBlur(m, 0) &&
    getSpread(m, 0) &&
    getHorizontal(m, 0) &&
    getVertical(m, 0)
  );
};

export const getTypeTitle = type => {
  switch (type) {
    case T.NONE:
      return t("None");
    case T.INSET:
      return t("Inset");
    case T.OUTSET:
      return t("Outset");
    default:
      return type;
  }
};

export const getTypesItems = () =>
  T.types.map(id => ({ id, title: getTypeTitle(id) }));

/**
 * Return setter for specific box shadow field
 *
 * @param {string} id
 * @return {(function(v: string|number, m:object):object)|undefined}
 */
export const getSetter = id => {
  switch (id) {
    case "select":
      return setType;
    case "palette":
      return setPalette;
    case "hex":
      return setHex;
    case "opacity":
      return setOpacity;
    case "blur":
      return setBlur;
    case "spread":
      return setSpread;
    case "vertical":
      return setVertical;
    case "horizontal":
      return setHorizontal;
    default:
      return undefined;
  }
};

/**
 * Converts box shadow model to db model
 * @param {{
 *   type: string,
 *   tempType: string,
 *   hex: string,
 *   palette: string,
 *   tempPalette: string,
 *   opacity: number,
 *   tempOpacity: number,
 *   blur: number,
 *   tempBlur: number,
 *   spread: number,
 *   tempSpread: number,
 *   vertical: number,
 *   tempVertical: number,
 *   horizontal: number,
 *   tempHorizontal: number,
 * }} m
 *
 * @return {{
 *   value: string,
 *   tempValue: string,
 *   colorHex: string,
 *   colorPalette: string,
 *   tempColorPalette: string,
 *   colorOpacity: number,
 *   tempColorOpacity: number,
 *   blur: number,
 *   tempBlur: number,
 *   spread: number,
 *   tempSpread: number,
 *   vertical: number,
 *   tempVertical: number,
 *   horizontal: number,
 *   tempHorizontal: number,
 * }}
 */
export const fromModel = m => {
  const type = m.type === NONE ? "" : m.type === OUTSET ? "on" : m.type;
  const tempType =
    m.tempType === NONE ? "" : m.tempType === OUTSET ? "on" : m.tempType;
  return {
    value: type,
    tempValue: tempType,
    colorHex: m.hex,
    colorPalette: m.palette,
    tempColorPalette: m.tempPalette,
    colorOpacity: m.opacity,
    tempColorOpacity: m.tempOpacity,
    blur: m.blur,
    tempBlur: m.tempBlur,
    spread: m.spread,
    tempSpread: m.tempSpread,
    vertical: m.vertical,
    tempVertical: m.tempVertical,
    horizontal: m.horizontal,
    tempHorizontal: m.tempHorizontal
  };
};

/**
 * Return config specific configuration
 *
 * @param {object} defaultConfig
 * @param {object} newConfig
 * @param {string} key
 * @return {*}
 */
export const getConfig = (defaultConfig, newConfig, key) => {
  const r = get(key, newConfig);
  return r === undefined ? get(key, defaultConfig) : r;
};

/**
 * Alias to api.setOpacity with one exception. The tempOpacity will be updated only if `final` parameter is true
 *
 * @param {number} n
 * @param {object} m
 * @param {boolean} final
 * @returns {{
 *   type: string,
 *   tempType: string,
 *   hex: string,
 *   palette: string,
 *   tempPalette: string,
 *   opacity: number,
 *   tempOpacity: number,
 *   blur: number,
 *   tempBlur: number,
 *   spread: number,
 *   tempSpread: number,
 *   vertical: number,
 *   tempVertical: number,
 *   horizontal: number,
 *   tempHorizontal: number,
 * }}
 */
export const _setOpacity = ColorUtils.setOpacity.bind(undefined, setOpacity);
