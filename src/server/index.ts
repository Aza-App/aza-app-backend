import express from "express";
import * as dotenv from "dotenv";
import { APIResponseModel, SignUpModel } from "../common/models";
import {
  INVALID_HEADER_CONTENT_TYPE,
  EMPTY_REQUEST_BODY,
  INVALID_EMAIL_FORMAT,
} from "../common/constants";
import { validateEmail } from "../common/functions";

dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.post("/api/affiliate/signup", (req, res) => {
  // Reasons Why the API might failed
  const APIResponse: APIResponseModel = {
    success: false,
    message: "",
  };

  // Checking the validity of the Request Header
  if (req.headers["content-type"] !== "application/json") {
    APIResponse.message = INVALID_HEADER_CONTENT_TYPE;
    return res.status(400).json(APIResponse).end();
  }

  // Checking if there no Message Input
  if (Object.keys(req.body).length === 0) {
    APIResponse.message = EMPTY_REQUEST_BODY;
    return res.status(400).json(APIResponse).end();
  }

  const SignUpDetails: SignUpModel = req.body;

  // Looping through the input fields to validate
  for (let i = 0; i < Object.keys(SignUpDetails).length; i++) {
    // Check for empty required field
    if (SignUpDetails[i] == "") {
      if (SignUpDetails[i] == "referalCode") continue;
      APIResponse.message = `${SignUpDetails[i]} field cannot be empty`;
      return res.status(400).json(APIResponse).end();
    }
  }

  // Validing Email
  if (!validateEmail(SignUpDetails["email"])) {
    APIResponse.message = INVALID_EMAIL_FORMAT;
    return res.status(400).json(APIResponse).end();
  }

  // PREPARE FOR DATABASE
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
