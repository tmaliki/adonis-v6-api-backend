"use strict";

const TextFormatter = require("../Utils/TextFormatter");
const MomentHelper = require("../Utils/MomentHelper");
const Database = use("Database");

class PasswordResetsService {
  /**
   * insert token line in password_resets
   * @param {string} email
   * @param {int} expiresIn - default expires time 60 minutes
   * @returns {Promise<object|null>}
   */
  static insert = async ({ email, expiresIn = 60 }) => {
    try {
      const del = await this.delete({ key: "email", val: email });
      const token = TextFormatter.genRandString();
      const expiresAt = MomentHelper.dateTimeFormat({
        addAmount: expiresIn,
        addUnit: "minutes",
      });
      const item = { email: email, token: token, expires_at: expiresAt };
      const inserted = await Database.table("password_resets").insert(item);
      return inserted ? item : null;
    } catch (error) {
      console.error("PasswordResetsService insert error : " + error.message);
      return null;
    }
  };

  /**
   * find line in password_resets
   * @param {string} key
   * @param {string} val
   * @param {string} col
   * @returns {Promise<string|null>}
   */
  static find = async ({ key, val, col = "" }) => {
    try {
      const pr = await Database.table("password_resets")
        .where(key, val)
        .orderBy("created_at", "desc")
        .first();

      return pr ? (col ? pr[col] : pr) : null;
    } catch (error) {
      console.error("PasswordResetsService find error : " + error.message);
      return null;
    }
  };

  /**
   * delete token line in password_resets
   * @param {string} key
   * @param {string} val
   * @returns {Promise<boolean>}
   */
  static delete = async ({ key, val }) => {
    try {
      const deleted = await Database.table("password_resets")
        .where(key, val)
        .delete();

      return deleted > 0;
    } catch (error) {
      console.error("PasswordResetsService delete error : " + error.message);
      return false;
    }
  };

  /**
   * is expired token in password_resets
   * @param {string} key
   * @param {string} val
   * @returns {Promise<boolean>} - true : token expiré | false : token valide
   */
  static isExpired = async ({ key, val }) => {
    try {
      const pr = await this.find({ key, val });
      if (pr) {
        const nowDate = MomentHelper.dateTimeFormat();
        const expiresAt = MomentHelper.dateTimeFormat({ dt: pr.expires_at });
        const comp = MomentHelper.compareDates({
          date1: nowDate,
          date2: expiresAt,
        });
        return comp === "after";
      }
      return true;
    } catch (error) {
      console.error("PasswordResetsService isExpired error : " + error.message);
      return true;
    }
  };
}

module.exports = PasswordResetsService;
