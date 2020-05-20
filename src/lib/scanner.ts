import Token from './Token';

class Scanner {
  tokens: Token[];
  start: number;
  current: number;
  line: number;
  constructor(public source: String) {
    this.tokens = [];
    this.start = 0;
    this.current = 0;
    this.line = 0;
  }

  scanTokens() {
    const tokens = [];
    let start = 0;
    let current = 0;
    let line = 1;
    while (!this.isAtEnd(current)) {
      start = current;
      this.scanToken();
    }
    return tokens;
  }

  isAtEnd(current: number) {
    return current >= this.source.length;
  }

  scanToken() {
    this.current++;
  }
}

export default Scanner;
