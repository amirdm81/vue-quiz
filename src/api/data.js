import client from "./client";

export default {
    list:(params) => client({url: '/data', params}),
}