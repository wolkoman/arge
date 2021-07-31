export const cockpitApiKey = process.env.COCKPIT_TOKEN;
export const cockpitHost = process.env.NEXT_PUBLIC_COCKPIT_HOST;

interface CockpitUser {
  user: string;
  email: string;
  active: boolean;
  api_key: string;
}

export const fetchCockpit = async (type: string, name: string, params = {}) => {
  params = {
    token: cockpitApiKey,
    ...params
  };
  return await fetch(
    `${cockpitHost}/api/${type}/get/${name}?${Object.entries(params)
      .map(([name, value]) => `${name}=${value}`)
      .join("&")}`
  ).then(response => response.json());
};
export const fetchCollection = (name: string, params?: Record<string, string>) =>
  fetchCockpit("collections", name, params).then(data => data.entries);
export const fetchSingleton = (name: string) =>
  fetchCockpit("singletons", name);

export const authenticateCockpit = async (
  user: string,
  password: string
): Promise<CockpitUser> => {
  const params = {
    token: cockpitApiKey,
  };
  return await fetch(
    `${cockpitHost}/api/cockpit/authUser?${Object.entries(params)
      .map(([name, value]) => `${name}=${value}`)
      .join("&")}`,
    {
      body: JSON.stringify({ user, password }),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }
  )
    .then(
      response =>
        new Promise(async (res, rej) =>
          response.status === 200 ? res(response.json()) : rej()
        )
    )
    .then(
      (user: CockpitUser) =>
        new Promise((res, rej) => (user.active ? res(user) : rej()))
    );
};
