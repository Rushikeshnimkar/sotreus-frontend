import axios from "axios";

const getServerInfo = async (req, res) => {
  let response;
  try {
    // Make a get request to your server
    response = await axios.get(`https://us01.erebrus.io/api/v1.0/server`, {
      headers: {
        Authorization: `Bearer ${req.query.token}`,
      },
    });
  } catch (error) {
    throw error;
  }
  return res.status(200).json(response.data);
};

export default getServerInfo;
