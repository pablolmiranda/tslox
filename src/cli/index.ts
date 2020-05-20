import * as minimist from 'minimist';

function main() {
  console.log('lox');
  const options = {};
  const argv = minimist(process.argv.slice(), options);

  console.log(argv);

  if (argv.length > 1) {
    console.log(argv);
    console.log('read file and pass it to scanner');
  } else {
    console.log('initialize REPL');
  }
}

main();
