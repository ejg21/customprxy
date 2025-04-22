
import * as cheerio from 'cheerio';

function rewriteHTML(html, proyPath, targetUrl) {
  const $ = cheerio.load(html);

  $('a[href], link[href], script[src], img[src], iframe[src]').each((_, el) => {
    let attr = $(el).attr('href') ? 'href' : 'src';
    let original = $(el).attr(attr);
    if (original && !original.startsWith('data:') && !original.startsWith('javascript:')) {
      let absolute = new URL(original, targetUrl).href;
      $(el).attr(attr, proyPath + absolute);
    }
  });

  $('body').append('<script src="/uv/client.js"></script>');
  return $.html();
}

export { rewriteHTML };
    
