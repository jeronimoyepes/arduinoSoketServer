function printLog(data, type) {
  if (type == "important") {
    console.log("\n-🟢", data, "-\n");
    return;
  }
  if (type == "error") {
    console.log("\n- ❗ERROR-", data, "-\n");
    return;
  }
  if (type == "warn") {
    console.log("\n-🔸warn-", data, "-\n");
    return;
  }
  console.log(data);
}

export { printLog };
