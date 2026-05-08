import json
import re

with open('Backend/scratch/lint_results.json', 'r') as f:
    results = json.load(f)

for result in results:
    file_path = result['filePath']
    messages = result['messages']
    
    if not messages:
        continue
        
    with open(file_path, 'r') as f:
        lines = f.readlines()
        
    changes_made = False
    
    # Sort messages in reverse order so line numbers don't shift when we modify the file
    # Actually we're only doing inline replacements or line removals, but it's safer
    messages.sort(key=lambda x: (x['line'], x['column']), reverse=True)
    
    for msg in messages:
        if msg.get('ruleId') == '@typescript-eslint/no-unused-vars':
            line_idx = msg['line'] - 1
            line = lines[line_idx]
            var_name = re.search(r"'(.*?)'", msg['message']).group(1)
            
            # If it's an import statement
            if line.strip().startswith('import '):
                # Simple case: import { Client } from ...
                # If only one import, remove the whole line
                if '{' + var_name + '}' in line.replace(' ', ''):
                    lines[line_idx] = ''
                elif var_name in line:
                    # Remove it from the list
                    lines[line_idx] = re.sub(r'\b' + var_name + r'\b\s*,?', '', line)
                    lines[line_idx] = lines[line_idx].replace('{,', '{').replace(', }', '}').replace(',}', '}')
                    if lines[line_idx].strip() == 'import { } from ' + line.split('from')[-1].strip() + ';':
                        lines[line_idx] = ''
                    if lines[line_idx].strip().startswith('import { } from'):
                        lines[line_idx] = ''
            
            # If it's a catch argument: catch (error)
            elif 'catch' in line and var_name in line:
                lines[line_idx] = re.sub(r'\b' + var_name + r'\b', '_' + var_name, line)
                
            # If it's a destructuring assignment: const { refreshToken, ... } = ...
            elif 'const {' in line and var_name in line:
                # Replace the var_name
                # Note: this might leave hanging commas, but prettier will fix it later or we can do basic replace
                lines[line_idx] = re.sub(r'\b' + var_name + r'\b\s*,?', '', line)
                lines[line_idx] = lines[line_idx].replace('{,', '{').replace(', }', '}').replace(',}', '}')
                
            # If it's a simple assignment: const success = ...
            elif 'const ' + var_name in line:
                # Prefix with underscore
                lines[line_idx] = re.sub(r'\b' + var_name + r'\b', '_' + var_name, line)
                
            # Function parameters
            elif '(' in line and ')' in line and var_name in line:
                lines[line_idx] = re.sub(r'\b' + var_name + r'\b', '_' + var_name, line)
                
            changes_made = True
            
    if changes_made:
        with open(file_path, 'w') as f:
            f.writelines(lines)
        print(f"Fixed {file_path}")
