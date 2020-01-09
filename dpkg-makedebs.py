#!/usr/bin/env python3
"""
Author   : Evan Elias Young
Date     : 2019-03-13
Revision : 2020-01-09
"""


import os
import shutil
import subprocess
import glob
from typing import List, Dict


def deleteDS() -> None:
    for root, dirs, files in os.walk('.'):
        for f in files:
            if f.endswith('.DS_Store'):
                os.remove(os.path.join(root, f))


def runCommand(cmd: List[str]) -> str:
    return subprocess.run(cmd, stdout=subprocess.PIPE).stdout.decode('utf-8')


def parseControl(root) -> Dict[str, str]:
    ret: Dict[str, str] = {}
    ctrl = open(os.path.join(root, 'DEBIAN', 'control'), 'r').read().strip()
    for l in ctrl.split('\n'):
        ret[l.split(': ')[0].lower()] = ''.join(l.split(': ')[1:])
    return ret


def loopPackage(pkg: str) -> None:
    ctrl: Dict[str, str] = parseControl(os.path.join('.', 'src', pkg))
    pkgRoot: str = os.path.join('.', 'src', pkg)
    oldDeb: str = f'{pkg}.deb'
    oldDebRoot: str = os.path.join('.', 'src', oldDeb)
    newDeb: str = '_'.join([ctrl['package'], ctrl['version'],
                            ctrl['architecture']]) + '.deb'
    newDebRoot: str = os.path.join('.', 'depic', 'deb', newDeb)
    oldDebMatch: List[str] = [m for m in glob.glob(
        f'{os.path.join(".", "depic", "deb", pkg)}*') if m != newDebRoot]

    if(oldDebMatch):
        for e in range(len(oldDebMatch)):
            os.remove(oldDebMatch[e])
        return
    if(os.path.isfile(newDebRoot)):
        print(f'[-] {pkg} already compiled')
        return

    runCommand(['dpkg-deb', '-bZgzip', pkgRoot])
    shutil.move(oldDebRoot, newDebRoot)
    print(f'[+] {pkg} => {newDeb}')


deleteDS()
os.system('find /var/www/repo -type d -exec chmod 755 {} \\;')
for f in os.listdir(os.path.join('.', 'src')):
    if (os.path.isfile(f)):
        continue
    loopPackage(f)
