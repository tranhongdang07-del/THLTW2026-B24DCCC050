export const checkDuplicate = (data, values) => {
  return data.find(
    (item) =>
      item.code === values.code ||
      item.name === values.name
  );
};

export const filterRooms = (data, type, manager) => {
  let result = [...data];

  if (type) {
    result = result.filter((item) => item.type === type);
  }

  if (manager) {
    result = result.filter((item) => item.manager === manager);
  }

  return result;
};