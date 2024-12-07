import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

// 其他代码保持不变


async function downloadFile() {
  // 启动 puppeteer
  const browser = await puppeteer.launch({
    headless: true, // 无头模式
    args: ['--no-sandbox', '--disable-setuid-sandbox'], // 解决一些Linux环境下的权限问题
  });
  
  const page = await browser.newPage();

  // 设置 cookies
  const cookies = [
    {
      name: 'DedeUserID',
      value: '490798736',
      domain: 'bilibili.com',
    },
    {
      name: 'DedeUserID__ckMd5',
      value: 'c15e63bf641bf8cd',
      domain: 'bilibili.com',
    },
    {
      name: 'SESSDATA',
      value: '78f9b27e%2C1748511373%2C355d1%2Ab2CjBYlrKirBkugBFxJhgwk9JDz_YISmGC05PEdKiSvTipVctVQ927cgstgvw9tfqn-sYSVm5MVXlIZTV3T0kzN2ZISHM0b3A2TVlmUkJvd3FZY1VPdERNaU5iUndHWGlFWXIxTklzNzFFMWFkdUNHTXo4cXM0NGszZlB2VGwwc0tDT1FaUFoyODBBIIEC',
      domain: 'bilibili.com',
    },
    {
      name: 'bili_jct',
      value: 'c91aecdd35c2844d3460116dfdca4f1d',
      domain: 'bilibili.com',
    },
    {
      name: 'sid',
      value: 'p7g1yuee',
      domain: 'bilibili.com',
    }
  ];

  for (const cookie of cookies) {
    await page.setCookie(cookie);
  }

  // 访问网页
  await page.goto('https://gf.bilibili.com/order/list');

  // 等待页面加载完成
  await page.waitForSelector('#containerContentRef');

  // 模拟点击下载按钮
  const downloadButtonXPath = '//*[@id="containerContentRef"]/div/div/div[2]/div[1]/div[2]'; // 替换为实际的按钮 XPath
  await page.click(downloadButtonXPath);

  // 等待文件下载完成（你可以根据需要调整时间，或者检测文件是否下载完成）
  await page.waitForTimeout(10000); // 等待10秒

  // 清理下载文件
  cleanUp();

  // 关闭浏览器
  await browser.close();
}

// 清理下载目录中的文件
function cleanUp() {
  const downloadPath = path.join(__dirname, 'public'); // 假设下载文件存储在 public 文件夹中
  try {
    fs.readdirSync(downloadPath).forEach(file => {
      const filePath = path.join(downloadPath, file);
      fs.unlinkSync(filePath);  // 删除文件
      console.log(`删除文件: ${filePath}`);
    });
  } catch (err) {
    console.error('清理下载文件时出错:', err);
  }
}

// 执行下载函数
downloadFile()
  .then(() => {
    console.log('下载完成');
  })
  .catch(error => {
    console.error('下载过程中出现错误:', error);
  });
