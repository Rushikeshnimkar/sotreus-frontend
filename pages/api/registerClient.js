import axios from "axios";

const registerClient = async (req, res) => {
  let response;
  try {
    const token = req.query.token;
    // Make a POST request to your server
    response = await axios.post(
      "https://us01.erebrus.io/api/v1.0/client/",
      req.body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    throw error;
  }
  return res.status(200).json(response.data);
};

export default registerClient;
