import {initialServerDB} from "./mockData";

export function fetchCount(amount = 1) {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}

const storageServerDB = window.localStorage.getItem("serverDB");

const serverDB = storageServerDB
  ? JSON.parse(storageServerDB)
  : initialServerDB;

export async function restGetIssues() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(Array.from(serverDB.issues)), 2000);
  });
}

export async function restPutIssue(id, issueData) {
  return new Promise((resolve, reject) => {
    const index = serverDB.issues.findIndex((issue) => issue.id === id);
    if (index >= 0) {
      const nextIssues = Array.from(serverDB.issues);
      nextIssues[index] = {
        ...nextIssues[index],
        ...issueData
      };
      serverDB.issues = nextIssues;
      window.localStorage.setItem("serverDB", JSON.stringify(serverDB));

      setTimeout(() => resolve(nextIssues[index]), 2000);
    } else {
      setTimeout(
        () => reject(new Error(`Issue with id=${id} does not exist`)),
        2000
      );
    }
  });
}
