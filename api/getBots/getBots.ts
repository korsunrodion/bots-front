'use server'

import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getBots = async () => {
  const res = await axios.get(`${apiUrl}/api/bot`);

  return res.data;
};

export default getBots;