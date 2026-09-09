const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3210/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: '/tmp/claude-0/-home-user-newdragonsrisingwebsite/9ca10742-3ffc-57a1-8a3d-f7b10395c3f4/scratchpad/home-hero.png' });
  await page.evaluate(() => window.scrollBy(0, window.innerHeight * 2));
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/tmp/claude-0/-home-user-newdragonsrisingwebsite/9ca10742-3ffc-57a1-8a3d-f7b10395c3f4/scratchpad/home-mid.png' });

  await page.goto('http://localhost:3210/instructors', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: '/tmp/claude-0/-home-user-newdragonsrisingwebsite/9ca10742-3ffc-57a1-8a3d-f7b10395c3f4/scratchpad/instructors.png' });

  await page.goto('http://localhost:3210/instructors/rudy-torres', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/tmp/claude-0/-home-user-newdragonsrisingwebsite/9ca10742-3ffc-57a1-8a3d-f7b10395c3f4/scratchpad/instructor-detail.png' });

  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  await page.goto('http://localhost:3210/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  console.log('CONSOLE ERRORS:', JSON.stringify(errors, null, 2));

  await browser.close();
})();
