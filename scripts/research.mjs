/**
 * Research CLI — web search + page reader via z-ai-web-dev-sdk (backend only)
 *
 * Usage:
 *   bun scripts/research.mjs search "query" [num] [recency_days]
 *   bun scripts/research.mjs read "url" [outfile]
 *   bun scripts/research.mjs deep "query" [num] [unused] [outfile]
 */
import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

const mode = process.argv[2];
const arg1 = process.argv[3];
const arg2 = process.argv[4] ? Number(process.argv[4]) : undefined;
const arg3 = process.argv[5] ? Number(process.argv[5]) : undefined;

function htmlToText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<nav[\s\S]*?<\/nav>/gi, '')
    .replace(/<footer[\s\S]*?<\/footer>/gi, '')
    .replace(/<header[\s\S]*?<\/header>/gi, '')
    .replace(/<\/(p|div|li|h1|h2|h3|h4|h5|h6|tr|br)>/gi, '\n')
    .replace(/<li[^>]*>/gi, '- ')
    .replace(/<h[1-6][^>]*>/gi, '\n## ')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

async function main() {
  const zai = await ZAI.create();

  if (mode === 'search') {
    const res = await zai.functions.invoke('web_search', {
      query: arg1,
      num: arg2 || 10,
      ...(arg3 ? { recency_days: arg3 } : {}),
    });
    console.log(JSON.stringify(res, null, 2));
    return;
  }

  if (mode === 'read') {
    const res = await zai.functions.invoke('page_reader', { url: arg1 });
    const text = htmlToText(res?.data?.html || '');
    const out = `# ${res?.data?.title || arg1}\nURL: ${res?.data?.url || arg1}\nPublished: ${res?.data?.publishedTime || 'unknown'}\n\n${text}`;
    if (process.argv[5]) fs.writeFileSync(process.argv[5], out);
    else console.log(out);
    return;
  }

  if (mode === 'deep') {
    const num = arg2 || 5;
    const res = await zai.functions.invoke('web_search', { query: arg1, num });
    let md = `# DEEP RESEARCH: ${arg1}\n\n## Search Results\n`;
    for (const r of res) {
      md += `- [${r.name}](${r.url}) (${r.host_name}) ${r.date || ''}\n  ${r.snippet}\n`;
    }
    // Read top 3 pages
    const top = res.slice(0, 3);
    for (const r of top) {
      try {
        console.error(`[reading] ${r.url}`);
        const page = await zai.functions.invoke('page_reader', { url: r.url });
        const text = htmlToText(page?.data?.html || '');
        md += `\n\n---\n\n# PAGE: ${page?.data?.title || r.name}\nURL: ${r.url}\n\n${text.slice(0, 12000)}`;
      } catch (e) {
        md += `\n\n---\n\n# PAGE FAILED: ${r.url} (${e.message})\n`;
      }
    }
    const outfile = process.argv[6] || `./research-out-${Date.now()}.md`;
    fs.writeFileSync(outfile, md);
    console.log(`WROTE: ${outfile} (${md.length} chars)`);
    return;
  }

  console.log('Usage: bun scripts/research.mjs search|read|deep ...');
}

main().catch((e) => {
  console.error('ERROR:', e.message);
  process.exit(1);
});
