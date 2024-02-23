import axios from "axios";

const getToken = async (req, res) => {
  let response;
  try {
    // Make a post request to your server
    response = await axios.post(
      `https://us01.erebrus.io/api/v1.0/authenticate`,
      req.body
    );
  } catch (error) {
    throw error;
  }
  return res.status(200).json(response.data);
};

export default getToken;
