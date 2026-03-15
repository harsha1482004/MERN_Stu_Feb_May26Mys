function mergeSettings(savedSettingsJSON, defaultSettings) {
  const savedSettings = JSON.parse(savedSettingsJSON);
  const mergedObject = Object.assign({}, defaultSettings, savedSettings);
  return {
    mergedObject: mergedObject,
    mergedJSON: JSON.stringify(mergedObject)
  };
}

const defaultSettings = {
  theme: "light",
  language: "en",
  fontSize: 14,
  notifications: true
};

const savedSettingsJSON = '{"theme": "dark", "fontSize": 18}';
const result = mergeSettings(savedSettingsJSON, defaultSettings);

console.log("Merged Object:", result.mergedObject);
console.log("Merged JSON:  ", result.mergedJSON);