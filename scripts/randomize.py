# import required module
import os, random, sys

# Blue => 1000 [1-1000] (0 - 999)
# Red => 611 [1001-1612] (1000 - 1610)
# Gold => 409 [1612-2020] (1611 - 2019)
# Total 2020

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
logs = os.path.join(directory, 'logs.json')
with open(logs, 'w') as f:
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
            print('"', id,'":{"id": "', randID, '"},')
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
            print('"', id,'":{"id": "', randID, '"},')
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
            print('"', id,'":{"id": "', randID, '"},')
            os.rename(VOld, VNew)
        else:
            print('error')
        randomizedIds.append(randID)
    print('}')
sys.stdout = stdout
print('finished')