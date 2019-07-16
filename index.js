const puppeteer = require('puppeteer');
const gitPass = require('./gitPass.js');
const args = process.argv;
let name = '';
let description = '';
for (x = 2; x <= args.length; x++) {
	if(args[x] === "#stop&" ) break
	name === '' ? (name += args[x]) : (name += '-' + args[x]);
}
for (z = x+ 2; z <= args.length - 1; z++) {
	description === '' ? (description += args[z]) : (description += ' ' + args[z]);
}


(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto('https://github.com/login', { waitUntil: 'networkidle0' });
	await page.type('#login_field', gitPass.login);
	await page.type('#password', gitPass.password);
	await page.click('input[type="submit"]');
	const page2 = await browser.newPage();
	await page2.goto('https://github.com/new');
	await page2.setViewport({ width: 1500, height: 720 });
	await page2.type('input#repository_name', name);
	await page2.waitFor(500);
	if(process.argv[process.argv.length - 2] === "t") await page2.click('#new_repository > div.js-with-permission-fields > div:nth-child(5) > label > input#repository_visibility_private');
	await page2.waitFor(500);
	if(process.argv[process.argv.length - 1] !== "none") await page2.type('#new_repository > div.js-with-permission-fields > dl > dd > input#repository_description',description);
	await page2.waitFor(500);
	await page2.click('#new_repository > div.js-with-permission-fields > button');
	await page2.waitFor(1000);
	const data = await page2.evaluate(() =>
		[ ...document.querySelectorAll('pre#empty-setup-push-repo-echo span') ].map((elem) => elem.innerText)
	);
	console.log(data[0]);
	console.log(data[2]);
	await browser.close();
})();
