export const formatImageName = (image) => {
  let formatted = "";
  formatted = image.replaceAll(/-+/g, "_");
  formatted = formatted.replaceAll(" ", "");
  formatted = formatted.trim();
  formatted = `__${new Date().getTime()}__${formatted}`;

  return formatted;
};

export const formatRGBColorObjectToString = (rgbObject) => {
  const r = rgbObject.r;
  const g = rgbObject.g;
  const b = rgbObject.b;

  const rgb = `(${r}, ${g}, ${b})`;
  return rgb;
};

export const formatRGBForBackend = (rgbObject) => {
  return JSON.stringify(Object.values(rgbObject));
};

export const formatColorSchemeFromBackend = (colorScheme) =>
  JSON.parse(colorScheme);

export const formatPhoneToBackend = (phone) => {
  if (phone === null || !phone) return "";

  let formatted = "";

  formatted = phone.replace(/[()\s-]/g, "");

  return formatted;
};

export const limitQuantityOfCharacters = (value, limit) => {
  if (!value) return "";

  if (value.length <= limit) return value;

  if (typeof value !== "string") return value;

  return `${value.slice(0, limit)}...`;
};

export const getContrastFontColorFromRGB = (rgbString) => {
  if (!rgbString) return;

  const r = rgbString[0];
  const g = rgbString[1];
  const b = rgbString[2];

  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

  return luminance > 186 ? "#000000" : "#FFFFFF";
};
