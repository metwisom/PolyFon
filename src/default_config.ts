const default_config = {
  peak_count: 12,
  peak_interval: 100,
  peak_color_1: "#2d9d5b",
  peak_color_2: "#30a15e",
};

type Config = {
  [key in keyof typeof default_config]?: any;
};

export {default_config, Config};