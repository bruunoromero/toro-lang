export function pprint(json: any): string {
  return JSON.stringify(json, undefined, 2);
}
