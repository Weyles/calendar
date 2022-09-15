import { serverGet, serverSet, serverDelete } from "./api";
import {
  localStorageGet,
  localStorageSet,
  localStorageDelete,
} from "./local-store";

/*
    This value is responsible for controlling the use of databases.
    It has 3 value: 1 | 2 | 3
    1 - This means we push data only in local storage
    2 - This means we push data only in server
    3 - This means we push data in both of databases
*/
const typeOfDataBase = 1;

const databaseGet = async (name) => {
  if (name !== "date" || name !== "eventItems") {
    console.log(
      "As a name this function can only take the following values: 'date' & 'eventItems'"
    );
  }

  const dataFromLocaleStorage = await localStorageGet(name);

  if (!!dataFromLocaleStorage) {
    return dataFromLocaleStorage;
  } else {
    const dataFromServer = await serverGet(name);
    return dataFromServer;
  }
};

const databaseSet = async (name, value) => {
  /*
    
  */
  if (name !== "date" || name !== "eventItems") {
    console.log(
      "As a name this function can only take the following values: 'date' & 'eventItems'"
    );
  }

  if (typeOfDataBase === 1) {
    localStorageSet(name, value);
  }

  if (typeOfDataBase === 2) {
    await serverSet(name, value);
  }

  if (typeOfDataBase === 3) {
    localStorageSet(name, value);
    await serverSet(name, value);
  }
};

const databaseDelete = async (name) => {
  if (name !== "date" || name !== "eventItems") {
    console.log(
      "As a name this function can only take the following values: 'date' & 'eventItems'"
    );
  }

  if (typeOfDataBase === 1) {
    localStorageDelete(name);
  }

  if (typeOfDataBase === 2) {
    await serverDelete(name);
  }

  if (typeOfDataBase === 3) {
    localStorageDelete(name);
    await serverDelete(name);
  }
};

export { databaseGet, databaseSet, databaseDelete };
