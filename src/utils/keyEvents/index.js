export const detectKeyPress = (event, keyType, cb) => {
  if (event.key == keyType) return cb;
};
