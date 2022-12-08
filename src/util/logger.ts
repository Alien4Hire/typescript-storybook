const debug = (message: string) => {
  console.log(message);
};

const info = (message: string) => {
  console.info(message);
};

const error = (message: string) => {
  console.error(message);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  debug,
  info,
  error,
};
