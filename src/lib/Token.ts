import { TokenType } from './TokenType';

export default class Token {
  constructor(
    public type: TokenType,
    public lexeme: String,
    public literal: Object,
    public line: Number
  ) {}

  toString() {
    return `${this.type} ${this.lexeme} ${this.literal}`;
  }
}
