import Scanner from '../scanner';
import { TokenType } from '../TokenType';
import Token from '../Token';

test('initialize the scanner', () => {
  const source = '';
  const scanner = new Scanner(source);
  expect(scanner).toBeInstanceOf(Scanner);
});

test('retrieves the list of tokens', () => {
  const source = '';
  const EOFToken = new Token(TokenType.EOF, null, null, 1);
  const scanner = new Scanner(source);
  expect(scanner.scanTokens()).toStrictEqual([EOFToken]);
});

test('scans special characters', () => {
  const source = `{}().-+;*`;
  const scanner = new Scanner(source);
  const tokens = scanner.scanTokens();
  // the returned tokens will include a EOF token as the last token
  expect(tokens.length).toBe(source.length + 1);
});

test('scans operators', () => {
  const source = `! != = < <= > >= == /`;
  const scanner = new Scanner(source);
  const tokens = scanner.scanTokens();
  // All operators are separated by empty space, adds 1 to represent the EOF token
  expect(tokens.length).toBe(source.split(' ').length + 1);
});

test('ignores comment lines', () => {
  const source = `
    // this is a comment line
    // this is another comment line
  `;
  const scanner = new Scanner(source);
  const tokens = scanner.scanTokens();
  const EOFToken = new Token(TokenType.EOF, null, null, 4);
  expect(tokens).toStrictEqual([EOFToken]);
});

test('scans strings', () => {
  const source = `"Hello World"`;
  const scanner = new Scanner(source);
  const tokens = scanner.scanTokens();
  // Should include 1 string token and 1 EOF token
  expect(tokens).toStrictEqual([
    new Token(TokenType.STRING, `"Hello World"`, 'Hello World', 1),
    new Token(TokenType.EOF, null, null, 1),
  ]);
});

test('scan numbers', () => {
  const source = `
  1234
  1234.5678
  `;
  const scanner = new Scanner(source);
  const tokens = scanner.scanTokens();
  expect(tokens.length).toBe(3); // two numbers and one EOF token
});
