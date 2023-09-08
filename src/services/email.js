import emailer from "./base-emailer";
import config from "../config";
import ejsTemplate from "./ejs";
export default {
  /**
   * Send email on forgot password
   * @param {Object} data
   */
  forgotPassword(data) {
    return new Promise((resolve, reject) => {
      const { adminUrl } = config.app;
      data.logo = `${config.app.baseUrl}public/default-images/logo.png`;
      data.redirect_url = adminUrl + "reset-password/" + data.token;
      ejsTemplate.generateEjsTemplate(
        {
          template: "forgot-password.ejs",
          data,
        },
        async (err, result) => {
          if (err) {
            reject(err);
          } else {
            const options = {
              to: data.to,
              subject: "Ridepro Admin- Reset Password",
              message: result,
            };
            emailer
              .sendEmail(options)
              .then((object) => {
                resolve(object);
              })
              .catch((error) => {
                reject(error);
              });
          }
        }
      );
    });
  },
  /**
   * Support reply email
   * @param {Object} data
   */
  supportReply(data) {
    return new Promise((resolve, reject) => {
      const { baseUrl } = config.app;
      data.logo = `${baseUrl}public/default-images/logo.png`;
      ejsTemplate.generateEjsTemplate(
        {
          template: "support-reply.ejs",
          data,
        },
        async (err, result) => {
          if (err) {
            reject(err);
          } else {
            const options = {
              to: data.to,
              subject: "Ridepro: Support Request",
              message: result,
            };

            emailer
              .sendEmail(options)
              .then((object) => {
                resolve(object);
              })
              .catch((error) => {
                reject(error);
              });
          }
        }
      );
    });
  },

  /**
   * User signup
   * @param {Object} data
   */
  userSignup(data) {
    return new Promise((resolve, reject) => {
      const { baseUrl } = config.app;
      data.logo = `${baseUrl}public/default-images/logo.png`;
      ejsTemplate.generateEjsTemplate(
        {
          template: "create-user-account.ejs",
          data,
        },
        async (err, result) => {
          if (err) {
            reject(err);
          } else {
            const options = {
              to: data.to,
              subject: "Ridepro - Registration Successful",
              message: result,
            };
            emailer
              .sendEmail(options)
              .then((object) => {
                resolve(object);
              })
              .catch((error) => {
                reject(error);
              });
          }
        }
      );
    });
  },
  /**
   * User forgot password
   * @param {Object} data
   */
  userForgotPassword(data) {
    return new Promise((resolve, reject) => {
      const { baseUrl } = config.app;
      data.logo = `${baseUrl}public/default-images/logo.png`;
      ejsTemplate.generateEjsTemplate(
        {
          template:"send-verification-code.ejs",
          data,
        },
        async (err, result) => {
          if (err) {
            reject(err);
          } else {
            const options = {
              to: data.to,
              subject: "Ridepro - Reset Password",
              message: result,
            };
            emailer
              .sendEmail(options)
              .then((object) => {
                resolve(object);
              })
              .catch((error) => {
                reject(error);
              });
          }
        }
      );
    });
  },
  /**
   * User Resend verification code
   * @param {Object} data
   */
  userResendVerificationCode(data) {
    return new Promise((resolve, reject) => {
      const { baseUrl } = config.app;
      data.logo = `${baseUrl}public/default-images/logo.png`;
      ejsTemplate.generateEjsTemplate(
        {
          template: "resend-verification-code.ejs",
          data,
        },
        async (err, result) => {
          if (err) {
            reject(err);
          } else {
            const options = {
              to: data.to,
              // subject: `Ridepro: ${data.subject}`,
              subject: "Ridepro - Resend verification code",
              message: result,
            };
            emailer
              .sendEmail(options)
              .then((object) => {
                resolve(object);
              })
              .catch((error) => {
                reject(error);
              });
          }
        }
      );
    });
  },
  /**
   *Send email verification code
   * @param {Object} data
   */
  emailVerification(data) {
    return new Promise((resolve, reject) => {
      const { baseUrl } = config.app;
      data.logo = `${baseUrl}public/default-images/logo.png`;
      ejsTemplate.generateEjsTemplate(
        {
          template: "email-verification-code.ejs",
          data,
        },
        async (err, result) => {
          if (err) {
            reject(err);
          } else {
            const options = {
              to: data.to,
              subject: "Ridepro:Email verification",
              message: result,
            };
            emailer
              .sendEmail(options)
              .then((object) => {
                resolve(object);
              })
              .catch((error) => {
                reject(error);
              });
          }
        }
      );
    });
  },
  
  /**
   * Failed transaction mail for admin
   * @param {Object} data
   */
  failedTransaction(data) {
    return new Promise((resolve, reject) => {
      const { baseUrl } = config.app;
      data.logo = `${baseUrl}public/default-images/logo.png`;
      ejsTemplate.generateEjsTemplate(
        {
          template: "failed-transaction.ejs",
          data,
        },
        async (err, result) => {
          if (err) {
            reject(err);
          } else {
            const options = {
              to: data.to,
              subject: "Ridepro - Transaction failure.",
              message: result,
            };
            emailer
              .sendEmail(options)
              .then((object) => {
                resolve(object);
              })
              .catch((error) => {
                reject(error);
              });
          }
        }
      );
    });
  },

  contactUsEmail(data) {
    return new Promise((resolve, reject) => {
      const { baseUrl } = config.app;
      data.logo = `${baseUrl}public/default-images/logo.png`;
      ejsTemplate.generateEjsTemplate(
        {
          template: "contact-us.ejs",
          data,
        },
        async (err, result) => {
          if (err) {
            reject(err);
          } else {
            const options = {
              to: data.to,
              subject: "Ridepro - Contact Us",
              message: result,
            };
            emailer
              .sendEmail(options,"receive")
              .then((object) => {
                resolve(object);
              })
              .catch((error) => {
                reject(error);
              });
          }
        }
      );
    });
  },
};
