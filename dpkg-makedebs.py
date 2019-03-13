#!/usr/bin/env python3
import os

def deleteDS():
    for root, dirs, files in os.walk('.'):
        for f in files:
            if f.endswith(".DS_Store"):
                os.remove(os.path.join(root, f))

def deleteDB():
    os.system(f'rm -rf {os.path.join(".", "deb", "*")}')

def parseControl(pkg):
    ret = {}
    ctrl = open(os.path.join('.', 'src', pkg, 'DEBIAN', 'control'), 'r').read()
    for l in ctrl.split('\n'):
        ret[l.split(': ')[0].lower()] = ''.join(l.split(': ')[1:])
    return ret

def makeDeb(pkg):
    fld = os.path.join('.', 'src', pkg)
    deb = os.path.join('.', 'deb', f'{pkg}.deb')
    os.system(f'dpkg-deb -bZgzip {fld}')
    os.rename(f'{fld}.deb', deb)

def loopPackage(pkg):
    ctrl = parseControl(pkg)
    root = os.path.join('.', 'src', pkg)
    newt = os.path.join('.', 'src', '_'.join([ctrl['package'], ctrl['version'], ctrl['architecture']]))
    os.rename(root, newt)
    makeDeb(pkg)

deleteDS()
deleteDB()
for f in os.listdir(os.path.join('.', 'src')):
    if (os.path.isfile(f)):
        continue
    loopPackage(f)