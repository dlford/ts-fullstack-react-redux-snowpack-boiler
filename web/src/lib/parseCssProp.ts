const regex = new RegExp(/^[0-9]+$/);

export default function parseCssProp(val: number | string): string {
  if (typeof val === 'number' || regex.test(val)) {
    return `${val}px`;
  }
  return `${val}`;
}
