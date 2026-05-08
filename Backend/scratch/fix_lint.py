import os
import re

def fix_useless_catch(file_path):
    with open(file_path, 'r') as f:
        content = f.read()

    # Pattern for try { ... } catch (error) { throw error; }
    # This regex is a bit simplistic but should work for the common pattern in this repo
    pattern = re.compile(r'try\s*{\s*(.*?)\s*}\s*catch\s*\(\w+\)\s*{\s*throw\s+\w+;?\s*}', re.DOTALL)
    
    new_content = pattern.sub(r'\1', content)
    
    if new_content != content:
        with open(file_path, 'w') as f:
            f.write(new_content)
        return True
    return False

base_dir = "/home/dhyan/Desktop/Workora/Backend/src/useCase"
fixed_files = []

for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file.endswith(".ts"):
            file_path = os.path.join(root, file)
            if fix_useless_catch(file_path):
                fixed_files.append(file_path)

print(f"Fixed {len(fixed_files)} files.")
for f in fixed_files:
    print(f)
