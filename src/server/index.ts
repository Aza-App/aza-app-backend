import express, { Request, Response } from "express";
import * as Props from "../affiliate/common/TSmodels";
import * as constants from "../affiliate/common/constants";
import * as functions from "../affiliate/common/functions";
import mongoose from "mongoose";
import { SignUpModel } from "../affiliate/Schema/newUser";

const app = express();
app.use(express.json());
const port = 3000;

app.post("/api/affiliate/signup", (req: Request, res: Response) => {
  // Reasons Why the API might failed
  const APIErrorResponse: Props.APIErrorResponseProps = {
    success: false,
    message: "",
  };

  const contentType = req.headers["content-type"];
  // Checking the validity of the Request Header
  if (contentType !== "application/json") {
    APIErrorResponse.message = constants.INVALID_HEADER_CONTENT_TYPE;
    return res.status(400).json(APIErrorResponse);
  }

  // Checking if there no Message Input
  if (Object.keys(req.body).length === 0) {
    APIErrorResponse.message = constants.EMPTY_REQUEST_BODY;
    return res.status(400).json(req.body);
  }

  const SignUpDetails: Props.SignUpAPIProps = req.body;

  // Looping through the input fields to validate
  for (const key of Object.keys(SignUpDetails)) {
    if (SignUpDetails.referalCode === "") continue;
    // Check for empty required field
    if (key === "") {
      APIErrorResponse.message = constants.REQUIRED_FIELDS_EMPTY;
      return res.status(400).json(APIErrorResponse);
    }
  }

  // Validating Email
  if (!functions.validateEmail(SignUpDetails["email"])) {
    APIErrorResponse.message = constants.INVALID_EMAIL_FORMAT;
    return res.status(400).json(APIErrorResponse);
  }

  // PREPARING FOR DATABASE
  const signup = new SignUpModel({
    ...SignUpDetails,
    referralCode: functions.generateReferralCode(),
  });

  // SAVING TO DATABASE
  signup
    .save()
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      APIErrorResponse.message = error;
      return res.status(200).json(APIErrorResponse);
    });
});

app.post("/api/affiliate/login", (req: Request, res: Response) => {
  // Reasons Why the API might failed
  const APIErrorResponse: Props.APIErrorResponseProps = {
    success: false,
    message: "",
  };

  const contentType = req.headers["content-type"];
  // Checking the validity of the Request Header
  if (contentType !== "application/json") {
    APIErrorResponse.message = constants.INVALID_HEADER_CONTENT_TYPE;
    return res.status(400).json(APIErrorResponse);
  }

  // Checking if there no Message Input
  if (Object.keys(req.body).length === 0) {
    APIErrorResponse.message = constants.EMPTY_REQUEST_BODY;
    return res.status(400).json(req.body);
  }

  const LogInDetails: Props.LoginAPIProps = req.body;

  // Check for empty required field
  if (LogInDetails.email === "" || LogInDetails.password === "") {
    APIErrorResponse.message = constants.REQUIRED_FIELDS_EMPTY;
    return res.status(400).json(APIErrorResponse);
  }

  // Validating Email
  if (!functions.validateEmail(LogInDetails["email"])) {
    APIErrorResponse.message = constants.INVALID_EMAIL_FORMAT;
    return res.status(400).json(APIErrorResponse);
  }

  // PREPARE FOR DATABASE
  SignUpModel.findOne({
    email: LogInDetails.email,
    password: LogInDetails.password,
  })
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      APIErrorResponse.message = error;
      return res.status(200).json(APIErrorResponse);
    });
});

app.post("/api/affiliate/forgotpassowrd", (req: Request, res: Response) => {
  // Reasons Why the API might failed
  const APIErrorResponse: Props.APIErrorResponseProps = {
    success: false,
    message: "",
  };

  const contentType = req.headers["content-type"];
  // Checking the validity of the Request Header
  if (contentType !== "application/json") {
    APIErrorResponse.message = constants.INVALID_HEADER_CONTENT_TYPE;
    return res.status(400).json(APIErrorResponse);
  }

  // Checking if there no Message Input
  if (Object.keys(req.body).length === 0) {
    APIErrorResponse.message = constants.EMPTY_REQUEST_BODY;
    return res.status(400).json(req.body);
  }

  const ForgotPasswordDetails: Props.ForgotPasswordAPIProps = req.body;

  // Check for empty required field
  if (ForgotPasswordDetails.email === "") {
    APIErrorResponse.message = constants.REQUIRED_FIELDS_EMPTY;
    return res.status(400).json(APIErrorResponse);
  }

  // Validating Email
  if (!functions.validateEmail(ForgotPasswordDetails["email"])) {
    APIErrorResponse.message = constants.INVALID_EMAIL_FORMAT;
    return res.status(400).json(APIErrorResponse);
  }

  // PREPARE FOR DATABASE
  SignUpModel.findOne({
    email: ForgotPasswordDetails.email,
  })
    .then((result) => {
      // SEND FOR PASSWORD CONFIRMATION EMAIL
      return res.status(200).json(result);
    })
    .catch((error) => {
      APIErrorResponse.message = error;
      return res.status(200).json(APIErrorResponse);
    });
});

app.post("/api/affiliate/dashboard", (req: Request, res: Response) => {
  // Reasons Why the API might failed
  const APIErrorResponse: Props.APIErrorResponseProps = {
    success: false,
    message: "",
  };

  const contentType = req.headers["content-type"];
  // Checking the validity of the Request Header
  if (contentType !== "application/json") {
    APIErrorResponse.message = constants.INVALID_HEADER_CONTENT_TYPE;
    return res.status(400).json(APIErrorResponse);
  }

  // Checking if there no Message Input
  if (Object.keys(req.body).length === 0) {
    APIErrorResponse.message = constants.EMPTY_REQUEST_BODY;
    return res.status(400).json(req.body);
  }

  // FETCH FINANCIAL DETIALS FROM MONGODB
});

const server = async () => {
  return await mongoose
    .connect("mongodb://localhost:27017", { dbName: "aza_store" })
    .then(() => {
      app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
      });
    })
    .catch((err: string) => {
      console.error(err);
    });
};

server();
