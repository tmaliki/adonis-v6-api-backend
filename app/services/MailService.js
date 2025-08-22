"use strict";

const DbHelper = require("../Utils/DbHelper");
const Env = use("Env");
const Mail = use("Mail");
const Config = use("Config");

const NODE_ENV = Env.get("NODE_ENV");
const MAIL_USERNAME = Env.get("MAIL_USERNAME");
const constants = Config.get("constants");
const SOCIETY_SIGLE = constants.SOCIETY.sigle;

class MailService {
  /**
   * send a contact form mail
   * @param {object} mailData
   * @param {string} receiver (default|webmaster)
   * @returns {Promise<boolean>}
   */
  static sendContactForm = async (mailData, receiver = "default") => {
    try {
      const setting = await DbHelper.findSetting();

      const folder = "contactForm." + receiver;
      const subject = {
        subj: mailData?.subject || constants.MAIL.contactForm.title,
      };
      const from = { fromName: "CONTACT" };

      let to = {};
      let reply = {};
      if (receiver === "webmaster") {
        to = {
          toEmail:
            NODE_ENV === "production"
              ? JSON.parse(setting.mail_address).bureau.value ||
                constants.MAIL.address.bureau
              : JSON.parse(setting.mail_address).test.value ||
                constants.MAIL.address.test,
          toName:
            NODE_ENV === "production"
              ? JSON.parse(setting.mail_address).bureau.name || "BE"
              : JSON.parse(setting.mail_address).test.name || "TEST",
          toConcat: true,
        };
        reply = {
          replyEmail: mailData.email,
          replyName: await DbHelper.getFullName({
            fName: mailData.first_name,
            lName: mailData.last_name,
          }),
        };
      }

      mailData.countryName = await DbHelper.findCountry({
        keys: { id: { value: mailData.country_id } },
        col: "name",
        defaultVal: "---",
      });
      mailData.phone = await DbHelper.getPhoneNumber(
        mailData.phone_number,
        mailData.call_prefix_id
      );
      mailData.receiver = receiver;
      mailData.showOnBrowser =
        receiver === "webmaster" || NODE_ENV !== "production";
      mailData.hasSignature = true;
      mailData.templateTitle = constants.MAIL.contactForm.title;
      mailData.templateSubject = subject.subj;

      return this.sendMail({
        data: { mailData: mailData, setting: setting },
        folder: folder,
        subject: subject,
        to: to,
        from: from,
        reply: reply,
      });
    } catch (error) {
      console.error("sendContactForm mail error : ", error);
      return false;
    }
  };

  /**
   * send a verification email mail
   * @param {object} mailData
   * @param {string} receiver (default|webmaster)
   * @returns {Promise<boolean>}
   */
  static sendVerifyEmail = async (mailData, receiver = "default") => {
    try {
      const setting = await DbHelper.findSetting();

      const folder = "members.verifyEmail." + receiver;
      let subject = {
        subj: constants.MAIL.adhesion.verifyEmail.subject,
        subjConcat: true,
      };
      const from = { fromName: "ADHÉSION" };

      let to = {};
      let reply = {};
      mailData.templateTitle = constants.MAIL.adhesion.verifyEmail.title;
      mailData.templateSubject = constants.MAIL.adhesion.verifyEmail.subject;
      if (receiver === "webmaster") {
        const fullName = await DbHelper.getFullName({
          fName: mailData.first_name,
          lName: mailData.last_name,
        });
        subject.subj = `Demande d'adhésion de ${fullName}`;
        to = {
          toEmail:
            NODE_ENV === "production"
              ? JSON.parse(setting.mail_address).adhesion.value ||
                constants.MAIL.address.adhesion
              : JSON.parse(setting.mail_address).test.value ||
                constants.MAIL.address.test,
          toName:
            NODE_ENV === "production"
              ? JSON.parse(setting.mail_address).adhesion.name || "ADHÉSION"
              : JSON.parse(setting.mail_address).test.name || "TEST",
          toConcat: true,
        };
        reply = {
          replyEmail: mailData.email,
          replyName: fullName,
        };
        mailData.templateTitle = `Demande d'adhésion de ${fullName}`;
        mailData.templateSubject = `Demande d'adhésion de ${fullName}`;
      }

      mailData.civilityName = await DbHelper.findCivility({
        keys: { id: { value: mailData.civility_id } },
        col: "sex_abbr",
        defaultVal: "---",
      });
      mailData.countryName = await DbHelper.findCountry({
        keys: { id: { value: mailData.country_id } },
        col: "name",
        defaultVal: "---",
      });
      mailData.phone = await DbHelper.getPhoneNumber(
        mailData.phone_number,
        mailData.call_prefix_id
      );
      mailData.receiver = receiver;
      mailData.showOnBrowser =
        receiver === "webmaster" || NODE_ENV !== "production";
      mailData.hasSignature = true;

      return this.sendMail({
        data: { mailData: mailData, setting: setting },
        folder: folder,
        subject: subject,
        to: to,
        from: from,
        reply: reply,
      });
    } catch (error) {
      console.error("sendVerifyEmail mail error : ", error);
      return false;
    }
  };

  /**
   * send forgot password (reset link) mail
   * @param {object} mailData
   * @param {string} receiver (default|webmaster)
   * @returns {Promise<boolean>}
   */
  static sendForgotPassword = async (mailData, receiver = "default") => {
    try {
      const folder = "members.password.forgot";
      const subject = {
        subj: constants.MAIL.adhesion.password.forgot.subject,
        subjConcat: true,
      };

      mailData.receiver = receiver;
      mailData.showOnBrowser = NODE_ENV !== "production";
      mailData.hasSignature = true;
      mailData.templateTitle = constants.MAIL.adhesion.password.forgot.title;
      mailData.templateSubject =
        constants.MAIL.adhesion.password.forgot.subject;

      return this.sendMail({
        data: { mailData: mailData },
        folder: folder,
        subject: subject,
      });
    } catch (error) {
      console.error("sendForgotPassword mail error : ", error);
      return false;
    }
  };

  /**
   * send reset password mail
   * @param {object} mailData
   * @param {string} receiver (default|webmaster)
   * @returns {Promise<boolean>}
   */
  static sendResetPassword = async (mailData, receiver = "default") => {
    try {
      const folder = "members.password.reset";
      const subject = {
        subj: constants.MAIL.adhesion.password.reset.subject,
        subjConcat: true,
      };

      mailData.receiver = receiver;
      mailData.showOnBrowser = NODE_ENV !== "production";
      mailData.hasSignature = true;
      mailData.templateTitle = constants.MAIL.adhesion.password.reset.title;
      mailData.templateSubject = constants.MAIL.adhesion.password.reset.subject;

      return this.sendMail({
        data: { mailData: mailData },
        folder: folder,
        subject: subject,
      });
    } catch (error) {
      console.error("sendResetPassword mail error : ", error);
      return false;
    }
  };

  /**
   * send mail message by template
   * @param {object} options - { data, folder, subject, to, from, cc, attach, root }
   * @param {object} options.data - { mailData, society, setting }
   * @param {string} options.folder
   * @param {object} options.subject = { subj, subjConcat, subjSuffix }
   * @param {object} options.to = { toEmail, toName, toConcat, toSuffix }
   * @param {object} options.from = { fromEmail, fromName, fromConcat, fromSuffix }
   * @param {object} options.reply = { replyEmail, replyName, replyConcat, replySuffix }
   * @param {array} options.cc = []
   * @param {array} options.attach - [{ path, filename, contentType }, ...]
   * @param {string} options.root
   * @returns {Promise<boolean>}
   */
  static sendMail = async ({
    data,
    folder = "common",
    subject = {},
    to = {},
    from = {},
    reply = {},
    cc = [],
    attach = [],
    root = "mails",
  } = options) => {
    try {
      // data mail
      const {
        mailData,
        society = await DbHelper.findSociety(),
        setting = await DbHelper.findSetting(),
      } = data;

      // subject options informations
      const {
        subj,
        subjConcat = false,
        subjSuffix = society.acronym || SOCIETY_SIGLE,
      } = subject;
      const subjectSuffix = subjConcat ? `${subj} - ${subjSuffix}` : `${subj}`;

      // to options informations
      const {
        toEmail = mailData.email,
        toName = await DbHelper.getFullName({
          fName: mailData.first_name,
          lName: mailData.last_name,
        }),
        toConcat = false,
        toSuffix = society.acronym || SOCIETY_SIGLE,
      } = to;
      const toNameSuffix = toConcat ? `${toName} - ${toSuffix}` : `${toName}`;

      // from options informations
      const {
        fromEmail = MAIL_USERNAME,
        fromName = "No Reply",
        fromConcat = true,
        fromSuffix = society.acronym || SOCIETY_SIGLE,
      } = from;
      const fromNameSuffix = fromConcat
        ? `${fromName} - ${fromSuffix}`
        : `${fromName}`;

      // replyTo options informations
      const {
        replyEmail = "",
        replyName = "",
        replyConcat = false,
        replySuffix = "",
      } = reply;
      const replyNameSuffix = replyConcat
        ? `${replyName} - ${replySuffix}`
        : `${replyName}`;

      // send mail
      const template = `${root}.${folder}`;
      await Mail.send(
        template,
        { mailData: mailData, society: society, setting: setting },
        (message) => {
          message
            .to(toEmail, toNameSuffix)
            .from(fromEmail, fromNameSuffix)
            .subject(subjectSuffix);

          // replyTo
          if (replyEmail) {
            message.replyTo(replyEmail, replyNameSuffix);
          }

          // cc
          if (cc.length > 0) {
            message.cc(cc);
          }

          // attach files
          if (attach.length > 0) {
            attach.forEach(({ path, filename, contentType }) => {
              message.attach(path, {
                filename: filename,
                contentType: contentType,
              });
            });
          }
        }
      );

      return true;
    } catch (error) {
      console.error("sendMail error : ", error);
      return false;
    }
  };
}

module.exports = MailService;
