const httpMessages = {
    400: "The server could not understand the request due to invalid syntax.",
    401: "The client must authenticate itself to get the requested response.",
    403: "The client does not have access rights to the content.",
    404: "The server can not find the requested resource.",
    405: "The method specified in the request is not allowed for the resource identified by the request URL.",
    500: "The server has encountered a situation it doesn't know how to handle.",
    502: "The server, while acting as a gateway or proxy, received an invalid response from the upstream server.",
    503: "The server is not ready to handle the request due to temporary overloading or maintenance of the server.",
    504: "The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server or some other auxiliary server it needed to access in order to complete the request."
};

module.exports = httpMessages;