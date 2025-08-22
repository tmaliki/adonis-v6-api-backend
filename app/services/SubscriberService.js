"use strict";

const Subscriber = use("App/Models/Subscriber");

class SubscriberService {
  /**
   * save or update subscriber information
   * @param {object} dataSave = { email, first_name, last_name, ... }
   * @returns {Promise<boolean>}
   */
  static saveSubscriberInfo = async (dataSave) => {
    try {
      if (dataSave && dataSave.email) {
        let subscriber = await Subscriber.findBy("email", dataSave.email);
        if (!subscriber) {
          subscriber = await Subscriber.create(dataSave);
        } else if (
          parseInt(subscriber.is_valid_email) === 0 ||
          (parseInt(subscriber.is_valid_email) === 1 &&
            (!subscriber.first_name || !subscriber.last_name))
        ) {
          let newDataSave = {
            saving_count: subscriber.saving_count + 1,
          };

          // dès la 2ème check de l'e-mail, marqué comme valide
          if (subscriber.saving_count > 0) {
            newDataSave.is_valid_email = 1;
          }

          if (!subscriber.first_name && dataSave.first_name) {
            newDataSave.first_name = dataSave.first_name;
          }

          if (!subscriber.last_name && dataSave.last_name) {
            newDataSave.last_name = dataSave.last_name;
          }

          subscriber.merge(newDataSave);
          await subscriber.save();
        }
        return true;
      }
    } catch (error) {
      console.error("saveSubscriberInfo error : ", error);
    }
    return false;
  };
}

module.exports = SubscriberService;
