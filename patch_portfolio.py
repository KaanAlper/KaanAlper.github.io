import re

with open('src/data/portfolio.ts', 'r') as f:
    content = f.read()

# Add links array if not exists, and inject Promo Page
def inject_promo(slug):
    global content
    # Bulunan objeyi (slug ile başlayan) regex ile yakala
    # links: [...] varsa içine ekle, yoksa motif: ... vb. sonrasına links: [...] ekle.
    
    # regex for exact slug definition
    pattern = r'(slug: "' + slug + r'",.*?)(?=\n  },|\n})'
    
    match = re.search(pattern, content, re.DOTALL)
    if not match:
        return
        
    block = match.group(1)
    promo_link = f'{{ label: "Promo Page", href: "/promo/{slug}", type: "demo" }}'
    
    if 'links: [' in block:
        # already has links, append it
        new_block = re.sub(r'(links:\s*\[\s*)(.*?)(\s*\])', r'\1\2,\n      ' + promo_link + r'\3', block, flags=re.DOTALL)
    else:
        # insert links before accentColor or at the end
        if 'accentColor:' in block:
            new_block = re.sub(r'(\s*accentColor:)', r'\n    links: [\n      ' + promo_link + r'\n    ],\1', block)
        else:
            new_block = block + f'\n    links: [\n      {promo_link}\n    ],'
            
    content = content.replace(block, new_block)

for slug in ["clonify", "teknofest-aviation", "couldbefit", "connectsync", "byteforge", "asenaplug", "shitnet"]:
    inject_promo(slug)

with open('src/data/portfolio.ts', 'w') as f:
    f.write(content)
