const parseDotNotation = (str, obj, result) => {
  const keys = str.split(".");
  const l = Math.max(1, keys.length - 1);
  let key, i;
  for (i = 0; i < l; ++i) {
    key = keys[i];
    result[key] = result[key] || {};
    result = result[key];
  }
  result[keys[i]] = obj[str];
};

const transform = (obj) => {
  const result = {};
  for (let key in obj) {
    if (key.indexOf(".") !== -1) {
      parseDotNotation(key, obj, result);
    } else {
      result[key] = obj[key];
    }
  }
  return result;
};

const genrateResponse = async (response) => {
  try {
    const result = [];
    const final_res = [];

    for (let index = 0; index < response.length; index++) {
      const element = response[index];
      const transforme = await transform(element);
      result.push(transforme);
    }

    for (let i = 0; i < result.length; i++) {
      const element = result[i];
      const l = final_res.length;
      if (l === 0) {
        console.log(Object.keys(element));
        element.images = [
          Object.values(element)[Object.values(element).length - 1],
        ];
        final_res.push(element);
      } else {
        const filterData = final_res.filter((x) => x.id == element.id);
        if (filterData.length > 0) {
          for (let j = 0; j < final_res.length; j++) {
            const e = final_res[j];
            if (e.id === element.id) {
              final_res[j].images.push(element.images);
            }
          }
        } else {
          element.images = [
            Object.values(element)[Object.values(element).length - 1],
          ];
          final_res.push(element);
        }
      }
    }
    return final_res;
  } catch (error) {
    throw Error(error);
  }
};

export default genrateResponse;
