#!/usr/bin/env python3
import os
import shutil
import subprocess
import glob

def runCommand(cmd):
    out = subprocess.run(cmd, stdout=subprocess.PIPE)
    out = out.stdout.decode('utf-8')
    return out

runCommand(['cp', '-a', 'deb/.', 'depic/deb/.'])
