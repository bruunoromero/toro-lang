export const generateExports = (name: string) => {
  return `
    exports.${name} = ${name};
    `;
};
