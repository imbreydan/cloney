#! /usr/bin/env node
const axios = require('axios');
const chalk = require('chalk');
const exec = require('child_process').exec;
const log = console.log;
const warning = chalk.hex('#FFA500');
const args = process.argv.slice(2);

if (args.length < 2) {
    log(warning("Usage: cloney (users|orgs) (name)\nExample: cloney users imbreydan"));
    process.exit();
}

let ctx = args[0];
let name = args[1];

axios.get(`https://api.github.com/${ctx}/${name}/repos`, {
    headers: {
        Authorization: `token ${process.env.GH_TOKEN}`
    }
}).then(res => {
    var count = 0;
    for (var i in res.data) {
        let repo = res.data[i];
        log(chalk.green(' > Cloning %s...'), repo.name)
        exec(`git clone ${repo.ssh_url}`);
        count++;
    }
    log(chalk.green(' > Finished cloning %s repositories!'), count);
})