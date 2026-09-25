"""Bundle index.html + styles.css + main.js + vendor/ into one self-contained nova-preview.html.

Run from this folder after editing the source files:  python3 build-single.py
"""
import re

html = open('index.html').read()
style = lambda p: '<style>\n' + open(p).read() + '\n</style>'
script = lambda p: '<script>\n' + open(p).read().replace('</script', '<\\/script') + '\n</script>'

html = html.replace('<link rel="stylesheet" href="vendor/lenis.css">', style('vendor/lenis.css'))
html = html.replace('<link rel="stylesheet" href="styles.css">', style('styles.css'))
for src in re.findall(r'<script src="([^"]+)"></script>', html):
    html = html.replace(f'<script src="{src}"></script>', script(src))
html = html.replace('check that preview-merged/vendor/ is present', 'the inlined libraries failed to run')

assert 'src="vendor' not in html and 'href="styles.css"' not in html, 'a local file was not inlined'
open('nova-preview.html', 'w').write(html)
print(f'nova-preview.html written ({len(html) // 1024} KB)')
