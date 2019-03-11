import React, { PureComponent } from "react";

export const getApi = (url, onSuccess, onFailure) => {
  fetch(url, {
    method: "GET",
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw console.error();
      }
    })
    .then(data => onSuccess(data))
    .catch(error => onFailure(error));
};

export const postApi = (url, onSuccess, onFailure, data = {}) => {
  fetch(url, {
    method: "POST",
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw "not ok";
      }
    })
    .then(data => onSuccess(data))
    .catch(error => onFailure(error));
};
