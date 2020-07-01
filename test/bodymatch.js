module.exports = obj => str => {
  const params = new URLSearchParams(str);
  console.log(params, obj);
  let match = true;
  params.forEach((value, key) => {
    match = match && obj[key] === value;
  });

  Object.entries(([key, value]) => {
    match = match && params.get(key) === value;
  });

  return match;
}