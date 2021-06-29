import client from "./client";

export default {
  list: (params) => client({ url: "/data", params, method: "GET" }),
  //   search: (params) => client({ url: "/data/_search", params, method:'GET' }),
  create: (data) => client({ url: "/data/", method: "POST", data }),
  delete: (id) => client({ url: `/data/${id}`, method: "DELETE" }),
};
