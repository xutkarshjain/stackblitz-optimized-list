export function addBigData(
  lib: { categories: string[]; applets: any[] },
  ncategs: number,
  napplets: number
) {
  for (let i = 0; i < ncategs; i++) {
    lib.categories.push('Sample Category ' + i);
  }

  const n = lib.categories.length;
  for (let i = 0; i < napplets; i++) {
    const a = {
      name: 'CMS' + i,
      categories: [] as string[],
    };
    for (let j = 0; j < Math.floor(Math.random() * 10); ++j) {
      const idx = Math.floor(Math.random() * n) % n;
      a.categories.push(lib.categories[idx]);
    }
    lib.applets.push(a);
  }
}
