# import required module
import os, random

# Pipeline ( Order embryos and vampires --> Randomize all deterministically --> Chunkenize each 100 in a folder )

# Blue => 1000 [1-1000] (0 - 999)
# Red => 611 [1001-1612] (1000 - 1610)
# Gold => 409 [1612-2020] (1611 - 2019)
# Total 2020

# Vampires
# Blue - Male => (0-499)
# Blue  - Females => (500-999)
# Red - Male => (1000-1305)
# Red - Females => (1306-1610)
# Gold - Male => (1611 - 1814)
# Gold - Females => (1815 - 2019)

# assign directory
directory = os.path.join(os.getcwd(), 'nfts', 'vampires', 'gold', 'females')
# print(directory)
# files = os.listdir(directory)
# random.shuffle(files)
# print('folders', files)

# for file in files:
#     print('--->', file)

# old_file = os.path.join("directory", "a.txt")
# new_file = os.path.join("directory", "b.kml")
# os.rename(old_file, new_file)

# iterate over files in
# that directory
id = 1815
for filename in os.listdir(directory):
    print(directory, filename)
    old = os.path.join(directory, filename)
    # new = os.path.join(directory, "filename")
    # checking if it is a file
    if os.path.isfile(old):
        newFileName = str(id) + ".png"
        new = os.path.join(directory, newFileName)
        os.rename(old, new)
        print(old, new)
        id+=1