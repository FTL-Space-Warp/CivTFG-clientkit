#!/usr/bin/env python3
"""
multiply_rarity.py
Usage: python multiply_rarity.py --mult 2.5 [--glob "**/*.json"] [--dry-run]
"""
import re, argparse, glob, shutil, pathlib, json

parser = argparse.ArgumentParser()
parser.add_argument("--mult", type=float, required=True, help="Multiplier (e.g. 2 or 0.5)")
parser.add_argument("--glob", default="**/*.json", help="File glob (default **/*.json)")
parser.add_argument("--dry-run", action="store_true", help="Don't write files, just show changes")
args = parser.parse_args()

pattern = re.compile(r'("density"\s*:\s*)(-?\d+(?:\.\d+)?)', re.IGNORECASE)

files = glob.glob(args.glob, recursive=True)
if not files:
    print("No files matched the glob:", args.glob)
    raise SystemExit(0)


changes = 0
for f in files:
    text = open(f, "r", encoding="utf-8").read()
    def repl(m):
        prefix, num = m.group(1), m.group(2)
        if "." in num:
            orig_decimals = len(num.split(".",1)[1])
            new = (float(num) + 1)/ args.mult
            # format with same decimal places, but strip trailing zeros
            fmt = ("{0:." + str(orig_decimals) + "f}").format(new).rstrip("0").rstrip(".")
        else:
            new_val = (float(num) + 1)/ args.mult
            # if an integer result, write as int, else keep up to 6 decimals trimmed
            if abs(new_val - int(new_val)) < 1e-9:
                fmt = str(int(round(new_val)))
            else:
                fmt = ("{0:.6f}".format(new_val)).rstrip("0").rstrip(".")
        return prefix + fmt

    new_text, nsub = pattern.subn(repl, text, count=1)
    if nsub:
        changes += nsub
        print(f"{'DRY ' if args.dry_run else ''} {f}: {nsub} replacement(s)")
        if not args.dry_run:
            open(f, "w", encoding="utf-8").write(new_text)

print(f"Done. Total replacements: {changes}.")

