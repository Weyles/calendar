/*
    Get data from the server
*/
const serverGet = async (name) => {
  try {
    let response = await fetch(`https://some-api/${name}`); // as a name we take only two values: "date", "iventItems"
    let json = await response.json();
    return json;
  } catch (error) {
    console.log("HTTP error: ", error);
  }
};

/*
    Set data to the server
*/
const serverSet = async (name, value) => {
  try {
    await fetch(`https://some-api/${name}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(value),
    });
  } catch (error) {
    console.log("HTTP error: ", error);
  }
};

/*
    Delete all data in the chose data section
*/
const serverDelete = async (name) => {
    try {
      await fetch(`https://some-api/${name}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log("HTTP error: ", error);
    }
  };

export { serverGet, serverSet, serverDelete };
