FROM python:3.8

WORKDIR /root

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

EXPOSE 5000

ENV PYTHONPATH "/root"

CMD ["python3", "app.py"]
