export const fetchData = (...args: Parameters<typeof fetch>): Promise<any> => {
  return new Promise((res, rej) => {
    fetch(...args).then(response => {
      if (response.ok) {
        res(response.json());
      } else {
        rej();
      }
    });
  });
};
