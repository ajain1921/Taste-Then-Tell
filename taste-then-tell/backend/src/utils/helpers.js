/**
 * Standardizes a format for API responses.
 * @param {Number} status  is the status code for the response.
 * @param {String} message describes the response.
 * @param {Object} data    contains relevant data for the response.
 * @return {Object}        is the response body.
 */
const createResponse = (status, message, data) => ({
  message,
  success: 200 <= status && status < 300,
  result: data,
});

const sendResponse = (res, status, message, data) =>
  res.status(status).json(createResponse(status, message, data));

const sendSuccess = (res, message, data) =>
  sendResponse(res, 200, message, data);

module.exports = { createResponse, sendResponse, sendSuccess };
