import Scanner from '../scanner';

test('initialize the scanner', () => {
  const source = '';
  const scanner = new Scanner(source);
  expect(scanner).toBeInstanceOf(Scanner);
});

test('can retrieve the list of tokens', () => {
  const source = '';
  const scanner = new Scanner(source);
  expect(scanner.scanTokens()).toStrictEqual([]);
});
