import os
import uuid
from fastapi import UploadFile, HTTPException, status
from app.core.config import settings

def save_resume_file(file: UploadFile) -> tuple[str, str]:
    """
    Validates and securely stores uploaded resume files.
    Returns (original_filename, stored_relative_path).
    """
    # 1. Validate file extension and MIME type
    filename = file.filename or "resume.pdf"
    ext = os.path.splitext(filename)[1].lower()
    if ext != ".pdf":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid file format. Only PDF files (.pdf) are accepted."
        )

    # 2. Check content type
    if file.content_type not in settings.ALLOWED_RESUME_TYPES and file.content_type != "application/octet-stream":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid MIME type: {file.content_type}. Only application/pdf is permitted."
        )

    # 3. Read content and verify size
    contents = file.file.read()
    if len(contents) > settings.MAX_UPLOAD_SIZE_BYTES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"File exceeds maximum allowed size of {settings.MAX_UPLOAD_SIZE_BYTES // (1024 * 1024)}MB."
        )

    # 4. Basic PDF header verification
    if not contents.startswith(b"%PDF"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="The uploaded file does not appear to be a valid PDF document."
        )

    # 5. Generate secure random filename
    unique_name = f"{uuid.uuid4().hex}.pdf"
    resumes_dir = os.path.join(settings.UPLOAD_DIR, "resumes")
    os.makedirs(resumes_dir, exist_ok=True)
    destination_path = os.path.join(resumes_dir, unique_name)

    # Write file
    with open(destination_path, "wb") as buffer:
        buffer.write(contents)

    relative_path = os.path.join("resumes", unique_name)
    return filename, relative_path

