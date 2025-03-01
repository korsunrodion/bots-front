'use server'

import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const addBot = async (name: string) => {
  const res = await axios.post(`${apiUrl}/api/bot`, {
    name
  });

  return res.data;
};

export default addBot;