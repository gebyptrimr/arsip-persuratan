export const globalFilter = (data, searchTerm) => {
  if (!searchTerm) return data;

  return data.filter((item) =>
    Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
};