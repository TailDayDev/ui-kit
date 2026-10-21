"""Turns the Figma REST export (figma/components/nodes.json) into one compact,
human-readable spec per component (layout, tokens, text styles, props, nesting).
usage: python3 -I scripts/figma/build-specs.py figma/components tokens/figma-export.json figma/components/specs"""
import json
import os
import sys

src, tokens_path, out = sys.argv[1:4]
os.makedirs(out, exist_ok=True)
data = json.load(open(os.path.join(src, 'nodes.json')))['nodes']['10:3']
styles = data['styles']
components = data['components']
component_sets = data.get('componentSets', {})
tokens = json.load(open(tokens_path))

# hex -> token names (palette + semantic roles resolved through their alias)
palette = {name: v['values']['Default'].upper() for name, v in tokens['variables']['Colors']['variables'].items()}
hex_names = {}
for name, value in palette.items():
    hex_names.setdefault(value, []).append(f'palette.{name}')
for name, v in tokens['variables']['Semantic']['variables'].items():
    alias = v['values']['Default']['alias']
    hex_names.setdefault(palette[alias], []).append(f'colors.{name.replace("/", ".")}')
space = {v['values']['Default']: n for n, v in tokens['variables']['Spacing']['variables'].items()}
radius = {v['values']['Default']: n for n, v in tokens['variables']['Radius']['variables'].items()}


def hexa(c, opacity=1):
    a = c.get('a', 1) * opacity
    h = '#' + ''.join(f'{round(c[k] * 255):02X}' for k in 'rgb')
    return h + (f'{round(a * 255):02X}' if a < 0.999 else '')


def paint(p):
    if p.get('visible') is False:
        return None
    if p['type'] == 'SOLID':
        h = hexa(p['color'], p.get('opacity', 1))
        names = hex_names.get(h, [])
        var = p.get('boundVariables', {}).get('color', {}).get('id', '')
        tag = f" [{'|'.join(names[:4])}]" if names else ' [NO TOKEN]'
        return f"{h}{tag}{' var' + var.replace('VariableID:', '') if var else ''}"
    if p['type'].startswith('GRADIENT'):
        stops = ', '.join(f"{hexa(s['color'])}@{round(s['position'], 2)}" for s in p.get('gradientStops', []))
        return f"{p['type']}({stops})"
    return p['type']


def num(v):
    return int(v) if float(v).is_integer() else round(v, 2)


def describe(node, depth, lines, max_depth=9):
    pad = '  ' * depth
    t = node['type']
    box = node.get('absoluteBoundingBox') or {}
    parts = [f"{pad}{t} \"{node['name']}\" {num(box.get('width', 0))}x{num(box.get('height', 0))}"]
    if node.get('visible') is False:
        parts.append('HIDDEN')
    refs = node.get('componentPropertyReferences')
    if refs:
        parts.append('props=' + ','.join(f"{k}->{v.split('#')[0]}" for k, v in refs.items()))
    if node.get('layoutMode') and node['layoutMode'] != 'NONE':
        p = [node.get(k, 0) for k in ('paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft')]
        parts.append(f"auto:{node['layoutMode'][0]} pad={'/'.join(str(num(x)) for x in p)} gap={num(node.get('itemSpacing', 0))}"
                     f" main={node.get('primaryAxisAlignItems', 'MIN')} cross={node.get('counterAxisAlignItems', 'MIN')}"
                     + (' wrap' if node.get('layoutWrap') == 'WRAP' else ''))
    sizing = (node.get('layoutSizingHorizontal'), node.get('layoutSizingVertical'))
    if any(sizing):
        parts.append(f"size={sizing[0]}/{sizing[1]}")
    if node.get('layoutPositioning') == 'ABSOLUTE':
        parts.append('ABSOLUTE')
    if node.get('minWidth') or node.get('maxWidth'):
        parts.append(f"minW={node.get('minWidth')} maxW={node.get('maxWidth')}")
    fills = [x for x in (paint(p) for p in node.get('fills', []) or []) if x]
    if fills and t != 'TEXT':
        parts.append('fill=' + ' + '.join(fills))
    strokes = [x for x in (paint(p) for p in node.get('strokes', []) or []) if x]
    if strokes:
        parts.append(f"stroke={' + '.join(strokes)} w={num(node.get('strokeWeight', 1))} {node.get('strokeAlign', '')}"
                     + (f" dash={node['strokeDashes']}" if node.get('strokeDashes') else ''))
    if node.get('cornerRadius'):
        parts.append(f"radius={num(node['cornerRadius'])}")
    if node.get('rectangleCornerRadii'):
        parts.append(f"radii={[num(x) for x in node['rectangleCornerRadii']]}")
    if node.get('opacity', 1) < 1:
        parts.append(f"opacity={round(node['opacity'], 2)}")
    st = node.get('styles', {})
    if st.get('effect'):
        parts.append(f"effect={styles.get(st['effect'], {}).get('name', st['effect'])}")
    elif node.get('effects'):
        parts.append('effects=' + ';'.join(f"{e['type']} {hexa(e['color']) if e.get('color') else ''} off={e.get('offset')} r={e.get('radius')}" for e in node['effects'] if e.get('visible', True)))
    if node.get('clipsContent'):
        parts.append('clip')
    if t == 'TEXT':
        s = node.get('style', {})
        style_name = styles.get(st.get('text', ''), {}).get('name', 'NO STYLE')
        parts.append(f"text=\"{node.get('characters', '')[:80]}\" style={style_name} ({s.get('fontStyle')} {num(s.get('fontSize', 0))})"
                     f" color={'+'.join(fills) or '-'} align={s.get('textAlignHorizontal')}"
                     + (f" maxLines={s['maxLines']}" if s.get('maxLines') else '')
                     + (f" deco={s['textDecoration']}" if s.get('textDecoration') else ''))
    if t == 'INSTANCE':
        main = components.get(node.get('componentId', ''), {})
        set_name = component_sets.get(main.get('componentSetId', ''), {}).get('name')
        parts.append(f"INSTANCE OF {set_name + ' / ' if set_name else ''}{main.get('name', '?')}")
        if node.get('componentProperties'):
            parts.append('with ' + ', '.join(f"{k.split('#')[0]}={v.get('value')}" for k, v in node['componentProperties'].items()))
    lines.append(' '.join(parts))
    is_icon = t == 'INSTANCE' and (components.get(node.get('componentId', ''), {}).get('name', '')[:1].islower())
    if t in ('VECTOR', 'BOOLEAN_OPERATION') or is_icon or depth >= max_depth:
        return
    for child in node.get('children', []):
        describe(child, depth + 1, lines, max_depth)


index = json.load(open(os.path.join(src, 'index.json')))
by_id = {}


def collect(node):
    by_id[node['id']] = node
    for c in node.get('children', []):
        collect(c)


collect(data['document'])
for item in index:
    node = by_id[item['id']]
    lines = [f"# {node['name']} ({node['id']}) — {node['type']}"]
    desc = (component_sets.get(node['id']) or components.get(node['id']) or {}).get('description', '')
    if desc:
        lines.append('Description: ' + desc.replace('\n', ' | '))
    defs = node.get('componentPropertyDefinitions')
    if defs:
        lines.append('Props:')
        for k, v in defs.items():
            extra = f" options={v.get('variantOptions')}" if v.get('variantOptions') else ''
            pref = v.get('preferredValues')
            lines.append(f"  {k.split('#')[0]}: {v['type']} default={v.get('defaultValue')}{extra}")
    lines.append(f"Render: png/{item['id'].replace(':', '-')}.png")
    lines.append('')
    if node['type'] == 'COMPONENT_SET':
        for variant in node.get('children', []):
            describe(variant, 0, lines)
            lines.append('')
    else:
        describe(node, 0, lines)
    safe = node['name'].replace('/', '_').replace(' · ', '_').replace(' ', '_')
    with open(os.path.join(out, f'{safe}.txt'), 'w') as f:
        f.write('\n'.join(lines) + '\n')
print(f'{len(index)} specs written to {out}')
