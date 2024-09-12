export type Connection<T> = {
  edges: Edge<T>[];
};

export type Edge<T> = {
  node: T;
};
