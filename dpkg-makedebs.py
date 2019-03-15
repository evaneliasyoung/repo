#!/usr/bin/env python3
import os
import shutil
import subprocess


def deleteDS():
    for root, dirs, files in os.walk('.'):
        for f in files:
            if f.endswith(".DS_Store"):
                os.remove(os.path.join(root, f))


def deleteDB():
    os.system(f'rm -rf {os.path.join(".", "deb", "*")}')


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
    newDebRoot = os.path.join('.', 'deb', newDeb)

    runCommand(['dpkg-deb', '-bZgzip', pkgRoot])
    shutil.move(oldDebRoot, newDebRoot)
    print(f'{pkg} => {newDeb}')


deleteDS()
deleteDB()
for f in os.listdir(os.path.join('.', 'src')):
    if (os.path.isfile(f)):
        continue
    loopPackage(f)
