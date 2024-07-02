export abstract class IUniqueId {
  abstract generate(length?: number): string;
}
