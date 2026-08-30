from __future__ import annotations

import sys
from pathlib import Path

from docx import Document


ROOT = Path(r"C:\Users\nguye\OneDrive\Tài liệu\CV & Motivation Letters\New CV")
NAMES = [
    "Minh Nguyen CV - GCS.docx",
    "Minh Nguyen CV - UL Solutions.docx",
    "Minh Nguyen CV - Rosewood Amsterdam.docx",
    "Minh Nguyen CV - McCain Foods.docx",
]


def delete_paragraph(paragraph) -> None:
    element = paragraph._element
    element.getparent().remove(element)


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    for name in NAMES:
        path = ROOT / name
        doc = Document(path)
        paragraphs = doc.paragraphs
        start = next(i for i, p in enumerate(paragraphs) if p.text.startswith("EXTRACURRICULAR ACTIVITIES"))
        end = next(i for i, p in enumerate(paragraphs) if p.text.startswith("LANGUAGE"))
        for paragraph in paragraphs[start:end]:
            delete_paragraph(paragraph)
        doc.save(path)
        print(path)
