declare module "pdf2table" {
  const pdf2table: {
    parse(buffer: Buffer, callback: (err: any, rows: string[][]) => void): void;
  };
  export = pdf2table;
}
