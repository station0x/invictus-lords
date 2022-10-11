# import required module
import os, random, sys

# Embryos
# Blue - Male => (0-499)
# Blue  - Females => (500-999)
# Red - Male => (1000-1305)
# Red - Females => (1306-1610)
# Gold - Male => (1611 - 1814)
# Gold - Females => (1815 - 2019)

# assign directory
directory = os.path.join(os.getcwd(), 'nfts')
randomizedDir = os.path.join(os.getcwd(), 'randomized')
print(directory)
files = os.listdir(directory)
print('folders', files)

start = 0
end = 2020
randomizedIds = []

def containsNum(arr, no):
    found = False
    for i in arr:
        if no == i: 
            found = True
            return found
    return found

stdout = sys.stdout
mapping = os.path.join(randomizedDir, 'mapping.json')
with open(mapping, 'w') as f:
    sys.stdout = f
    print('{')
    for id in range(start, end):
        # generate unique rand id for iterativly
        randID = random.randrange(start, end)
        while containsNum(randomizedIds, randID):
            randID = random.randrange(start, end)
        
        oldFN = str(id) + ".png"
        newFN = str(randID) + ".png"
        # randId is original ID and id is the new assigned random id
        if id <= 999:
            Edir = os.path.join(directory, 'embryos', 'blue')
            Vdir = os.path.join(directory, 'vampires', 'blue')
            # ----- write in randomized folder -----
            EdirNew = os.path.join(randomizedDir, 'embryos')
            VdirNew = os.path.join(randomizedDir, 'vampires')
            # old filenames
            EOld = os.path.join(Edir,oldFN)
            VOld = os.path.join(Vdir,oldFN)
            # new filenames
            ENew = os.path.join(EdirNew,newFN)
            VNew = os.path.join(VdirNew,newFN)
            os.rename(EOld, ENew)
            # 0: { "id": 0, "" }
            print('"', randID,'":{"id": "', id, '"},')
            os.rename(VOld, VNew)
        elif id <= 1610:
            Edir = os.path.join(directory, 'embryos', 'red')
            Vdir = os.path.join(directory, 'vampires', 'red')
            # ----- write in randomized folder -----
            EdirNew = os.path.join(randomizedDir, 'embryos')
            VdirNew = os.path.join(randomizedDir, 'vampires')
            # old filenames
            EOld = os.path.join(Edir,oldFN)
            VOld = os.path.join(Vdir,oldFN)
            # new filenames
            ENew = os.path.join(EdirNew,newFN)
            VNew = os.path.join(VdirNew,newFN)
            os.rename(EOld, ENew)
            print('"', randID,'":{"id": "', id, '"},')
            os.rename(VOld, VNew)
        elif (id <= 2019):
            Edir = os.path.join(directory, 'embryos', 'gold')
            Vdir = os.path.join(directory, 'vampires', 'gold')
            # ----- write in randomized folder -----
            EdirNew = os.path.join(randomizedDir, 'embryos')
            VdirNew = os.path.join(randomizedDir, 'vampires')
            # old filenames
            EOld = os.path.join(Edir,oldFN)
            VOld = os.path.join(Vdir,oldFN)
            # new filenames
            ENew = os.path.join(EdirNew,newFN)
            VNew = os.path.join(VdirNew,newFN)
            os.rename(EOld, ENew)
            print('"', randID,'":{"id": "', id, '"},')
            os.rename(VOld, VNew)
        else:
            print('error')
        randomizedIds.append(randID)
    print('}')
sys.stdout = stdout
print('finished')