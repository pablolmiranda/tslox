import Token from './Token';
import { TokenType } from './TokenType';

class Scanner {
  tokens: Token[];
  start: number;
  current: number;
  line: number;
  constructor(public source: String) {
    this.tokens = [];
    this.start = 0;
    this.current = 0;
    this.line = 1;
  }

  scanTokens() {
    while (!this.isAtEnd()) {
      this.start = this.current;
      this.scanToken();
    }

    this.tokens.push(new Token(TokenType.EOF, null, null, this.line));
    return this.tokens;
  }

  isAtEnd() {
    return this.current >= this.source.length;
  }

  scanToken() {
    const c = this.advance();
    switch (c) {
      case TokenType.LEFT_PAREN:
        this.addToken(TokenType.LEFT_PAREN);
        break;
      case TokenType.RIGHT_PAREN:
        this.addToken(TokenType.RIGHT_PAREN);
        break;
      case TokenType.LEFT_BRACE:
        this.addToken(TokenType.LEFT_BRACE);
        break;
      case TokenType.RIGHT_BRACE:
        this.addToken(TokenType.RIGHT_BRACE);
        break;
      case TokenType.COMMA:
        this.addToken(TokenType.COMMA);
        break;
      case TokenType.DOT:
        this.addToken(TokenType.DOT);
        break;
      case TokenType.MINUS:
        this.addToken(TokenType.MINUS);
        break;
      case TokenType.PLUS:
        this.addToken(TokenType.PLUS);
        break;
      case TokenType.SEMICOLON:
        this.addToken(TokenType.SEMICOLON);
        break;
      case TokenType.STAR:
        this.addToken(TokenType.STAR);
        break;

      // Operators
      case TokenType.BANG:
        this.addToken(
          this.match(TokenType.EQUAL) ? TokenType.BANG_EQUAL : TokenType.BANG
        );
        break;
      case TokenType.EQUAL:
        this.addToken(
          this.match(TokenType.EQUAL) ? TokenType.EQUAL_EQUAL : TokenType.EQUAL
        );
        break;
      case TokenType.LESS:
        this.addToken(
          this.match(TokenType.EQUAL) ? TokenType.LESS_EQUAL : TokenType.LESS
        );
        break;
      case TokenType.GREATER:
        this.addToken(
          this.match(TokenType.EQUAL)
            ? TokenType.GREATER_EQUAL
            : TokenType.GREATER
        );
        break;
      case TokenType.SLASH:
        if (this.match(TokenType.SLASH)) {
          // this is a comment, we need to consume all the characters
          // until the end of line
          while (this.peek() !== '\n' && !this.isAtEnd()) {
            this.advance();
          }
          break;
        } else {
          this.addToken(TokenType.SLASH);
          break;
        }
      case TokenType.DOUBLE_QUOTE: // it is a string
        this.string();
        break;
      case '\n':
        this.line++;
        break;
    }
  }

  string() {
    while (this.peek() !== TokenType.DOUBLE_QUOTE && !this.isAtEnd()) {
      if (this.peek() === '\n') {
        this.line++;
      }
      this.advance();
    }

    if (this.isAtEnd()) {
      throw new Error('Unterminated string');
    }

    this.advance();

    const stringLiteral = this.source.substring(
      this.start + 1,
      this.current - 1
    );

    this.addToken(TokenType.STRING, stringLiteral);
  }

  /**
   * Take a look on the current character
   */
  peek() {
    if (this.isAtEnd()) return '\0';
    return this.source[this.current];
  }

  match(expected: string) {
    if (this.isAtEnd()) return false;
    if (this.source[this.current] !== expected) return false;

    this.current++;
    return true;
  }

  advance() {
    this.current++;
    return this.source[this.current - 1];
  }

  addToken(tokenType: TokenType, literal?: object | string) {
    const text = this.source.substring(this.start, this.current);
    this.tokens.push(new Token(tokenType, text, literal, this.line));
  }
}

export default Scanner;
