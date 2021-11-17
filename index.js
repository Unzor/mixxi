#!/usr/bin/env node
var child_process = require('child_process');
if (process.argv[2] == "--init") {
    var fs = require('fs');
    var keypress = require('keypress');
    var readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    var files = [];

    function ask() {
        rl.question("Add files to mix (CTRL+C to exit, ESC to create .mixxi_control file) \n> ", function(name) {
            files.push(name);
            ask()
        });
    }

    process.stdin.on('keypress', function(ch, key) {
        if (key.sequence == "\u001b") {
            fs.writeFileSync('.mixxi_control', files.join('\n'))
            console.log('\nCreating file, exiting...');
            process.exit(0);
        }
    });

    ask()
} else if (process.argv[2] == "bundle" && process.argv[3]) {
    var chalk = require('chalk');
    if (process.argv[3]) {
        var UglifyJS = require("uglify-js");
        var int = 0;
        var array = [];
        var fs = require('fs');
        var control = fs.readFileSync('.mixxi_control').toString().split('\n');
        
        control.forEach(function(code){
          int = int + 1;
        var content = fs.readFileSync(code).toString();
        array.push(content);
        fs.unlinkSync(code);

        if (int == control.length){
        fs.writeFileSync(process.argv[3], UglifyJS.minify(array.join('\n')).code);
        console.log(chalk.green("MIXXI-SUCCESS: ") + "Finished mixing files, outfile is " + process.argv[3]);
        };
        });
        
    } else {
        console.log(chalk.red("MIXXI-ERROR: ") + "Output file not declared!" + `

Usage:
 mixxi bundle <output>.js`);
    }
} else if (process.argv[2] == "bundle" && !process.argv[3]) {
    console.log(`bundle: missing operand
   Usage: mixxi bundle <FILENAME>.js
  `)
} else if (!process.argv[2]) {
    console.log(`mixxi: missing operand
  
  Usage: mixxi [OPTION/ARGUMENT] [ARGUMENT]

  Arguments:
  --init   Create .mixxi_control file.

  Options:
  bundle   Mix files into one.
  `)
} else if (process.argv[2] && process.argv[2] !== "bundle" && process.argv[2] !== "--init") {
    console.log(`mixxi: opperand not found

  Usage: mixxi [OPTION/ARGUMENT] [ARGUMENT]

  Arguments:
  --init   Create .mixxi_control file.

  Options:
  bundle   Mix files into one.
  `)
}