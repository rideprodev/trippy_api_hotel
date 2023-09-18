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

const intialUpdateObject = (element) => {
  let obj = {};
  for (const [key, value] of Object.entries(element)) {
    obj[key] = typeof value === "object" && value !== null ? [value] : value;
  }
  return obj;
};

const updateObject = (element, object) => {
  for (const [key, value] of Object.entries(element)) {
    element[key] =
      typeof value === "object" && value !== null
        ? [...value, object[key]]
        : value;
  }
  return element;
};

const genrateData = async (response) => {
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
        final_res.push(intialUpdateObject(element));
      } else {
        const filterData = final_res.filter((x) => x.id == element.id);
        if (filterData.length > 0) {
          for (let j = 0; j < final_res.length; j++) {
            const e = final_res[j];
            if (e.id === element.id) {
              final_res[j] = updateObject(e, element);
            }
          }
        } else {
          final_res.push(intialUpdateObject(element));
        }
      }
    }
    return final_res;
  } catch (error) {
    throw Error(error);
  }
};

const incudeData = async (response, include) => {
  for (const [key, val] of Object.entries(response)) {
    for (let item of include) {
      const where = {};
      where[item.ref] = val.dataValues[item.ref];
      if (item.type === "one") {
        val.dataValues[item.as] = await item.model.findOne({ where: where });
      } else {
        val.dataValues[item.as] = await item.model.findAll({
          where: where,
        });
      }
    }
  }

  return response;
};

const genrateResponse = async (response, include) => {
  try {
    return {
      ...response,
      rows: await incudeData(response.rows, include),
    };
  } catch (error) {
    throw Error(error);
  }
};

export default genrateResponse;
