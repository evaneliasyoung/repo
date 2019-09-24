#!/usr/bin/env python3
import os
import shutil
import subprocess
import glob


def deleteDS():
    for root, dirs, files in os.walk('.'):
        for f in files:
            if f.endswith('.DS_Store'):
                os.remove(os.path.join(root, f))


def runCommand(cmd):
    out = subprocess.run(cmd, stdout=subprocess.PIPE)
    out = out.stdout.decode('utf-8')
    return out


def parseControl(root):
    ret = {}
    ctrl = open(os.path.join(root, 'DEBIAN', 'control'), 'r').read().strip()
    for l in ctrl.split('\n'):
        ret[l.split(': ')[0].lower()] = ''.join(l.split(': ')[1:])
    return ret


def loopPackage(pkg):
    ctrl = parseControl(os.path.join('.', 'src', pkg))
    pkgRoot = os.path.join('.', 'src', pkg)
    oldDeb = f'{pkg}.deb'
    oldDebRoot = os.path.join('.', 'src', oldDeb)
    newDeb = '_'.join([ctrl['package'], ctrl['version'],
                       ctrl['architecture']]) + '.deb'
    newDebRoot = os.path.join('.', 'depic', 'deb', newDeb)
    oldDebMatch = [m for m in glob.glob(f'{os.path.join(".", "depic", "deb", pkg)}*') if m != newDebRoot]

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
