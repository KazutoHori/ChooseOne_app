export const fetchQuestions = async () => {
  const response = await fetch('http://127.0.0.1:8000/api/v1/?format=json');
  const questions = await response.json();

  return questions;
};

export const getQuestionFromId = id =>
  `http://127.0.0.1:8000/api/v1/${id}/?format=json`;

export const fetchUsers = async () => {
  const users = await fetch('http://127.0.0.1:8000/api/v1/users/?format=json')

  return users;
};

export const getUserFromId = id => `http://127.0.0.1:8000/api/v1/users/${id}/?format=json`
