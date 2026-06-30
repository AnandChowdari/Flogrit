import os
import shutil
import re

source_dir = r"e:\1.Mission Money\Captiongrit\CaptionGrit-Export (2)\CaptionGrit-Export\src"
dest_dir = r"e:\1.Mission Money\Captiongrit\Flogrit Web\Flogrit\src"
dest_cg = os.path.join(dest_dir, "components", "captiongrit")

# 1. Copy folders
folders_to_copy = ["components", "config", "pages"]
for f in folders_to_copy:
    src_path = os.path.join(source_dir, f)
    dst_path = os.path.join(dest_cg, f)
    if os.path.exists(src_path):
        shutil.copytree(src_path, dst_path, dirs_exist_ok=True)

# Copy assets
src_assets = os.path.join(source_dir, "assets")
dst_assets = os.path.join(dest_dir, "assets", "captiongrit")
if os.path.exists(src_assets):
    shutil.copytree(src_assets, dst_assets, dirs_exist_ok=True)

# Copy videos if exists
src_root = r"e:\1.Mission Money\Captiongrit\CaptionGrit-Export (2)\CaptionGrit-Export"
dst_public_vids = r"e:\1.Mission Money\Captiongrit\Flogrit Web\Flogrit\public\videos"
if os.path.exists(os.path.join(src_root, "videos")):
    shutil.copytree(os.path.join(src_root, "videos"), dst_public_vids, dirs_exist_ok=True)

# 2. Update imports in all files in dest_cg
def update_imports(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # We need to map relative imports to @/components/captiongrit/
    # In Captiongrit, components import other components like '../../components/...'
    # If we replace all relative imports that go up (like ../..) or start with ./ 
    # Actually, simpler: replace all imports containing '../../components' with '@/components/captiongrit/components'
    # And '../../config' with '@/components/captiongrit/config'
    # And '../../assets' with '@/assets/captiongrit'
    
    # A generic regex approach for imports from Captiongrit:
    # Instead of fixing all relative paths, since they moved from src/components/... to src/components/captiongrit/components/... 
    # Actually, if we just preserve their relative tree inside components/captiongrit, most relative imports STILL WORK!
    # Let's think: 
    # src/components/ui/SectionDivider -> moved to src/components/captiongrit/components/ui/SectionDivider
    # src/pages/products/CaptiongritPage.jsx -> moved to src/components/captiongrit/pages/products/CaptiongritPage.jsx
    # A relative import `../../components/ui/SectionDivider` from `pages/products/CaptiongritPage.jsx` STILL points correctly!
    # Because they both moved into the same base folder! 
    # The only thing that breaks is imports pointing to `src/assets`.
    # Let's fix `assets` imports.
    # In Captiongrit: `import Logo from '../../assets/Logo.svg'` -> this now needs to point to `@/assets/captiongrit/Logo.svg`
    
    # Let's replace any import/path matching `*/assets/*` with `@/assets/captiongrit/*`
    new_content = re.sub(r'[\'"](?:(?:\.\./)+|\./)assets/([^\'"]+)[\'"]', r"'@/assets/captiongrit/\1'", content)
    
    if content != new_content:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(new_content)

for root, dirs, files in os.walk(dest_cg):
    for file in files:
        if file.endswith((".js", ".jsx", ".ts", ".tsx")):
            file_path = os.path.join(root, file)
            update_imports(file_path)

print("Copy and import update complete.")
