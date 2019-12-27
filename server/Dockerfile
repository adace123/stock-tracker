FROM python:3.8-alpine

WORKDIR /root

RUN apk update && apk add --no-cache python3-dev libstdc++ && \
    apk add --no-cache --virtual .build-deps g++ && \
    ln -s /usr/include/locale.h /usr/include/xlocale.h

COPY Pipfile* ./

RUN pip install pipenv && pipenv install --system

COPY . .

EXPOSE 5000

ENV PYTHONPATH "/root"

CMD ["python3", "app.py"]
