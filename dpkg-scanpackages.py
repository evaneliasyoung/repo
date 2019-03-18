#!/usr/bin/env python3
import os
import subprocess
import hashlib
import bz2
import gzip

fields = [
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
    'Icon'
]


def runCommand(cmd):
    out = subprocess.run(cmd, stdout=subprocess.PIPE)
    out = out.stdout.decode('utf-8')
    return out


def getHash(file, type):
    raw = open(file, 'rb').read()
    hsh = hashlib.md5(raw)

    if type == 'SHA1':
        hsh = hashlib.sha1(raw)
    if type == 'SHA256':
        hsh = hashlib.sha256(raw)

    return hsh.hexdigest()


def getWrite(deb):
    lines = []
    for f in fields:
        if (f in ['MD5sum', 'SHA1', 'SHA256']):
            t = getHash(deb, f)
        elif (f == 'Size'):
            t = os.path.getsize(deb)
        else:
            t = runCommand(['dpkg-deb', '-f', deb, f]).strip()
        if t != '':
            lines.append(f'{f}: {t}\n')
    lines.append('\n')
    return lines


def loopDeb(deb):
    packages.writelines(getWrite(deb))


runCommand(['rm', '-rf', 'Packages*'])

listdir = [f for f in os.listdir(os.path.join('.', 'deb'))]
listdir = [f for f in listdir if (f.endswith('.deb'))]
listdir.sort()

packages = open('Packages', 'w')

for f in listdir:
    loopDeb(os.path.join('.', 'deb', f))

packages.close()

bz2.BZ2File('Packages.bz2', 'wb').write(open('Packages', 'rb').read())
gzip.GzipFile('Packages.gz', 'wb').write(open('Packages', 'rb').read())