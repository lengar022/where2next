import axios from "axios";

import { serviceUrl } from "../fixtures.js";

export const where2nextService = {
  where2nextUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.where2nextUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.where2nextUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.where2nextUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.where2nextUrl}/api/users`);
    return res.data;
  },
}
