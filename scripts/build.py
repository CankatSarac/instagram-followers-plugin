from pathlib import Path
import json, shutil, zipfile
root = Path(__file__).resolve().parent.parent
manifest = json.loads((root / "manifest.json").read_text())
version = manifest["version"]
out = root / "dist/chrome"
if out.exists():
    shutil.rmtree(out)
out.mkdir(parents=True)
shutil.copytree(root / "release", out / "release")
manifest["minimum_chrome_version"] = "120"
(out / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
artifacts = root / "artifacts"
artifacts.mkdir(exist_ok=True)
with zipfile.ZipFile(artifacts / f"instagram-detective-chrome-{version}.zip", "w", zipfile.ZIP_DEFLATED) as archive:
    for file in sorted(out.rglob("*")):
        if file.is_file():
            archive.write(file, file.relative_to(out))
print(f"Chrome {version} packaged in artifacts/")
