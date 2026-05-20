FROM python:3.10-slim

WORKDIR /app

# Install library
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Pindahkan semua file Python
COPY . .

# Buka gerbang port 7860 (Syarat wajib Hugging Face)
EXPOSE 7860

# Jalankan mesin
CMD ["gunicorn", "-b", "0.0.0.0:7860", "app:app"]