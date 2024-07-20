import * as request from "~/utils/request";

export const search = async (q, type = "less") => {
  try {
    const res = await request.get(
      "users/search",
      {
        params: {
          q,
          type,
        },
      } // encodeURIComponent nedd have when user search fucntion
    );

    return res.data
  } catch (error) {
    console.log(error); 
  }
};
