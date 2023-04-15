function combine<T>(...objects: T[][]): T[][];
function combine<T extends object>(...objects: T[]): T[];
function combine(...objects: any[]): any[] {
  const results: any[] = [];
  Object.values(objects).forEach(object => {
    Object.values(results).forEach(result => {
      Array.isArray(result) && Array.isArray(object)
        ? results.push([...result, ...object])
        : results.push({...result, ...object});
    });
    results.push(object);
  });
  return results;
}

export default combine;
