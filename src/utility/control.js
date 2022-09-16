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

/*
    All functions work by next principe:
    1 - check if we passed right value (name)
    2 - look what database should be used
    3 - set, get or delete required data
*/
const databaseGet = async (name) => {
  if (name === "date" || name === "eventItems") {
    switch (typeOfDataBase) {
      case 1:
        return await localStorageGet(name);
      case 2:
        return await serverGet(name);
      case 3:
        const dataFromLocalStorage = await localStorageGet(name);

        if (!!dataFromLocalStorage) {
          return dataFromLocalStorage;
        } else {
          return await serverGet(name);
        }
      default:
        return null;
    }
  } else {
    console.log(
      "As a name this function can only take the following values: 'date' & 'eventItems'"
    );
  }
};

const databaseSet = async (name, value) => {
  /*
    
  */
  if (name !== "date" || name !== "eventItems") {
    switch (typeOfDataBase) {
      case 1:
        localStorageSet(name, value);
        break;
      case 2:
        await serverSet(name, value);
        break;
      case 3:
        localStorageSet(name, value);
        await serverSet(name, value);
        break;
      default:
        return null;
    }
  } else {
    console.log(
      "As a name this function can only take the following values: 'date' & 'eventItems'"
    );
  }
};

const databaseDelete = async (name) => {
  if (name !== "date" || name !== "eventItems") {
    switch (typeOfDataBase) {
      case 1:
        localStorageDelete(name);
        break;
      case 2:
        await serverDelete(name);
        break;
      case 3:
        localStorageDelete(name);
        await serverDelete(name);
        break;
      default:
        return null;
    }
  } else {
    console.log(
      "As a name this function can only take the following values: 'date' & 'eventItems'"
    );
  }
};

export { databaseGet, databaseSet, databaseDelete };
