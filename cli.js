#!/usr/bin/env node

const path = require("path");
const fs = require("fs");
const puppeteer = require("puppeteer");
const { createServer } = require("vite");
const { minifyHtml, injectHtml } = require("vite-plugin-html");
const { defineConfig } = require("vite");
const reactRefresh = require("@vitejs/plugin-react-refresh");
const { Command } = require("commander");
const chalk = require("chalk");

const program = new Command();

program
  .option("-p, --path <string>", "audits.json 的文件路径")
  .option("-o, --output <string>", "导出 pdf 路径")
  .option("-t, --title <string>", "pdf 文件标题");

program.parse(process.argv);

const options = program.opts();

const dataPath = options.path;
const outputPath = options.output || "./" + Date.now() + ".pdf";
const title = options.title || "微信小程序 AUDITS";

async function exportPdf() {
  const server = await createServer(
    defineConfig({
      root: __dirname,
      logLevel: "silent",
      plugins: [
        reactRefresh(),
        minifyHtml(),
        injectHtml({
          injectData: {
            injectScript: `<script>
                window.title = ${JSON.stringify(title)};
                window.audits = ${JSON.stringify(
                  require(path.resolve(dataPath))
                )};
              </script>`,
          },
        }),
      ],
    })
  );
  await server.listen();
  const browser = await puppeteer.launch({});
  const page = await browser.newPage();

  await page.goto("http://127.0.0.1:" + server.config.server.port);

  await page.pdf({
    path: path.resolve(process.cwd(), outputPath || defaultOutput),
    format: "A4",
    printBackground: true,
    displayHeaderFooter: false,
    margin: { top: 20, right: 20, bottom: 20, left: 20 },
    preferCSSPageSize: true,
  });

  await browser.close();
  await server.close();
}

if (!dataPath || !fs.existsSync(dataPath)) {
  console.log(chalk.red("请输入正确的 audits.json 路径"));
} else {
  console.log(chalk.blue("正在导出 pdf"));
  exportPdf()
    .then(() => console.log(chalk.gray(`已生成 ${outputPath}`)))
    .catch((err) => console.log(chalk.red(err)));
}
