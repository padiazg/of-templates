FROM padiazg/deno:alpine-0.11.0

#RUN addgroup -S app && adduser app -S -G app
RUN apk --no-cache add curl \
    && echo "Pulling watchdog binary from Github." \
    && curl -sSL https://github.com/openfaas/faas/releases/download/0.13.0/fwatchdog > /usr/bin/fwatchdog \
    && chmod +x /usr/bin/fwatchdog \
    && apk del curl --no-cache

RUN mkdir -p /home/app

# Wrapper/boot-strapper
WORKDIR /home/app

# Copy outer function handler
COPY index.ts .

WORKDIR /home/app/function

# Copy in additional function files and folders
COPY --chown=deno:deno function/ .
RUN deno fetch handler.ts

WORKDIR /home/app/
RUN deno fetch index.ts

# chmod for tmp is for a buildkit issue (@alexellis)
RUN chmod +rx -R ./function \
    && chown deno:deno -R /home/app \
    && chmod 777 /tmp

USER deno

ENV cgi_headers="true"
ENV fprocess="deno index.ts"
EXPOSE 8080

HEALTHCHECK --interval=3s CMD [ -e /tmp/.lock ] || exit 1

CMD ["fwatchdog"]
