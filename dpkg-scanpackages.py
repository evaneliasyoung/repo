#!/usr/bin/env python3
"""
Author   : Evan Elias Young
Date     : 2019-03-13
Revision : 2020-01-09
"""


import os
import subprocess
import hashlib
import bz2
import gzip
from typing import List, Dict


fields: List[str] = [
    'Package',
    'Source',
    'Version',
    'Priority',
    'Section',
    'Maintainer',
    'Pre-Depends',
    'Depends',
    'Recommends',
    'Suggests',
    'Conflicts',
    'Provides',
    'Replaces',
    'Enhances',
    'Architecture',
    'Filename',
    'Size',
    'Installed-Size',
    'MD5sum',
    'SHA1',
    'SHA256',
    'Description',
    'Origin',
    'Bugs',
    'Name',
    'Author',
    'Homepage',
    'Website',
    'Depiction',
    'SileoDepiction',
    'Icon'
]


def runCommand(cmd: List[str]) -> str:
    return subprocess.run(cmd, stdout=subprocess.PIPE).stdout.decode('utf-8')


def getHash(file: str, alg: str) -> str:
    raw: bytes = open(file, 'rb').read()
    hsh: hashlib._hashlib.HASH

    if alg == 'SHA1':
        hsh = hashlib.sha1(raw)
    elif alg == 'SHA256':
        hsh = hashlib.sha256(raw)
    else:
        hsh = hashlib.md5(raw)

    return hsh.hexdigest()


def getWrite(deb: str) -> List[str]:
    lines: List[str] = []
    t: str
    for f in fields:
        if (f in ['MD5sum', 'SHA1', 'SHA256']):
            t = getHash(deb, f)
        elif (f == 'Size'):
            t = str(os.path.getsize(deb))
        elif (f == 'Filename'):
            t = deb[7:]
        else:
            t = runCommand(['dpkg-deb', '-f', deb, f]).strip()
        if t != '':
            lines.append(f'{f}: {t}\n')
    lines.append('\n')
    return lines


def loopDeb(deb: str) -> None:
    packages.writelines(getWrite(deb))


runCommand(['rm', '-rf', os.path.join('.', 'depic', 'Packages*')])

listdir: List[str] = [f for f in os.listdir(os.path.join(
    '.', 'depic', 'deb')) if (f.endswith('.deb'))]
listdir.sort()

packages = open(os.path.join('.', 'depic', 'Packages'), 'w')

for f in listdir:
    loopDeb(os.path.join('.', 'depic', 'deb', f))
    print(f)

packages.close()

bz2.BZ2File(os.path.join('.', 'depic', 'Packages.bz2'), 'wb').write(
    open(os.path.join('.', 'depic', 'Packages'), 'rb').read())
gzip.GzipFile(os.path.join('.', 'depic', 'Packages.gz'), 'wb').write(
    open(os.path.join('.', 'depic', 'Packages'), 'rb').read())
