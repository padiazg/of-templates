import { handler } from "./function/handler.ts"

const utf8Decoder = new TextDecoder('utf-8');
const utf8Encoder = new TextEncoder();

(async () => {
    try {
        const buffer_in = utf8Decoder.decode(await Deno.readAll(Deno.stdin));
        const result = await handler(buffer_in);

        if (result === undefined || result === null) {
            return;
        }

        const buffer_out = utf8Encoder.encode(JSON.stringify(result));
        return await Deno.stdout.write(buffer_out);

    }
    catch(e) {
        return console.error(e.stack);
    }
})();
