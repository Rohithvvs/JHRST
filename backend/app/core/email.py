import logging
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from app.core.config import settings

logger = logging.getLogger("jhrst.email")

def send_notification_email(subject: str, html_content: str, recipient: str = None) -> bool:
    """
    Sends an email notification. If SMTP is not enabled or credentials are placeholder,
    logs the notification safely so no inquiry is dropped.
    """
    to_email = recipient or settings.INQUIRY_RECEIVER_EMAIL
    
    if not settings.SMTP_ENABLED or not settings.SMTP_USER or not settings.SMTP_PASSWORD:
        logger.info(f"[EMAIL NOTIFICATION (MOCK/LOG)] To: {to_email} | Subject: {subject}")
        logger.info(f"[EMAIL BODY]: {html_content[:300]}...")
        return True

    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = settings.SMTP_FROM_EMAIL
        msg["To"] = to_email
        
        part = MIMEText(html_content, "html")
        msg.attach(part)

        with smtplib.SMTP(settings.SMTP_SERVER, settings.SMTP_PORT) as server:
            server.starttls()
            server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
            server.sendmail(settings.SMTP_FROM_EMAIL, to_email, msg.as_string())
        
        logger.info(f"Notification email dispatched successfully to {to_email}")
        return True
    except Exception as e:
        logger.error(f"Failed to send email via SMTP: {str(e)}")
        # Do not throw to user; return False
        return False

