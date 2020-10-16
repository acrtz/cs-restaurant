export default (obj: Object) => {
  return Object.entries(obj)
    .reduce((acc: { id: string, name: string }[], entry) => {
      const [id, name] = entry;
      acc.push({ id, name });
      return acc;
    }, [])
    .sort((a, b) => (a.name < b.name ? -1 : 0));
};
