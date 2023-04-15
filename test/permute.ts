function permute(...values: any[][]): any[][] {
  if (values.length === 0) return [];
  if (values.length === 1) return values;
  let results: any[][] = values[0]!.map(v => [v]);

  for (let i = 1; i < values.length; i++) {
    const batch = values[i]!;
    results = Array(batch.length)
      .fill(results)
      .reduce((a, b) => a.concat(b))
      .map((v: any[], i: number, l: any[][]): any[] =>
        v.concat(batch[Math.floor(i / (l.length / batch.length))]!)
      );
  }

  return results;
}

export default permute;
