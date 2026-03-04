export const SOMETHING_WENT_WRONG = "Something went wrong";
export const INTERNAL_SERVER_ERROR_MESSAGE = "Issue at server side, Please try later";

export const TOKEN_EXPIRED = "Token has been expired";
export const TOKEN_ERROR = "Please provide token or SignIn on Platform";
export const UNAUTHORIZED_USER = "Please provide id or SignIn on Platform";
export const TOKEN_REVOKED = "User with id does not exist or Provided token has been expired or revoked";

export const UNAUTHORIZED_ACCESS = [TOKEN_ERROR, TOKEN_EXPIRED, UNAUTHORIZED_USER, TOKEN_REVOKED];