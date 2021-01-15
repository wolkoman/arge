export const cockpitApiKey = "20ada0647adb0e6ea47f6614154a8c";
export const cockpitHost = "http://api.arge.eni.wien";

export const fetchCockpit = async (type: string, name: string) => {
  const params = {
    token: cockpitApiKey,
  };
  return await fetch(
    `${cockpitHost}/api/${type}/get/${name}?${Object.entries(params)
      .map(([name, value]) => `${name}=${value}`)
      .join("&")}`
  ).then(response => response.json());
};
export const fetchCollection = (name: string) =>
  fetchCockpit("collections", name);
export const fetchSingleton = (name: string) =>
  fetchCockpit("singletons", name);
