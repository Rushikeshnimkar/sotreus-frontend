import axios from "axios";

const getClients = async (req, res) => {
  let response;
  try {
    console.log(req.query.token);
    // Make a get request to your server
    response = await axios.get(`https://us01.erebrus.io/api/v1.0/client`, {
      headers: {
        Authorization: `Bearer ${req.query.token}`,
      },
    });
  } catch (error) {
    throw error;
  }
  return res.status(200).json(response.data);
};

export default getClients;
