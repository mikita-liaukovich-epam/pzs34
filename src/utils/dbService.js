import { encrypt } from "./crypt";

const server = 'http://localhost:3001';

export function getUser(user) {

  return fetch(server + '/user/get', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: user.name
    }),
  }).then(res => res.json());
}

export function addUser(user) {
  const encryptedPwd = encrypt(user.pwd);

  return fetch(server + '/user/add', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: user.name,
      pwd: encryptedPwd
    }),
  }).then(res => res.json());
}

export function deleteUser(user) {
  return fetch(server + '/user', {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: user.name
    }),
  }).then(res => res.json());
}