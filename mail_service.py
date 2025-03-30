from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib
from jinja2 import Template

SMTP_HOST = "localhost"
SMTP_PORT = 1025
SENDER_EMAIL = 'admin@servicemaster.com'
SENDER_PASSWORD = ''


def send_email(to, subject, content_body):
    msg = MIMEMultipart()
    msg["To"] = to
    msg["Subject"] = subject
    msg["From"] = SENDER_EMAIL
    msg.attach(MIMEText(content_body, 'html'))
        
    client = smtplib.SMTP(host=SMTP_HOST, port=SMTP_PORT)
    client.send_message(msg=msg)
    client.quit()