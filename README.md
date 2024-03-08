# Thumbmark Storage

Thumbmark storage uses the browser fingerprinting library [ThumbmarkJS](https://github.com/ilkkapeltola/thumbmarkjs) to implement a handy store that behaves in a similar way as `localStorage`.

There are two components

1. The backend service implemented as a simple AWS Lambda function, using the Serverless framework
2. The javascript library that extends the ThumbmarkJS with `getItem()` and `putItem()` methods.

## Usage

The following test script first sets the key `foo` to value `bar`.
And after, gets it back and prints to console. Both methods return a promise.

```
<script src="https://cdn.thumbmarkjs.com/latest/ThumbmarkStorage.js"></script>
<script>
    ThumbmarkStorage.setItem('foo', 'bar')
    .then(() => {
        ThumbmarkStorage.getItem('foo')
        .then((value) => {
            console.log(value)
        });
    })
</script>
```



## How it works

The library `ThumbmarkStorage` has methods `getItem(key)` and `setItem(key, value)`. Since the `ThumbmarkStorage` utilizes the fingerprinting library `ThumbmarkJS`, it calculates the fingerprint, which acts (together with a `namespace`, more about that later) as the unique store identifyer. When calling the `setItem('foo', 'bar')`, the backend stores the value `bar` together with the `namespace`, `fingerprint` and `key`.

When calling `getItem('foo')`, similarly, the backend knows all three (assuming a stable browser fingerprint) and returns the value `bar`. Thus, you're able to use the same storage from any page. This is useful for example when transferring a visitor from one page to another and you can't use cookies.

Why `namespace`? You can set that to be anything. The idea of the namespace is to avoid collisions with other sites happening to use the same keys and to avoid fingerprint collisions. You can for example safely use the key `id` in your own namespace. Without a namespace, common keys like `id` could cause collisions or overwriting data.

## Why not use cookies?

Cookies are more intrusive. Cookies require consent, while this approach, when certain criteria is met, apparently does not. This isn't a paid ad, but for example a fairly popular Google Analytics alternative [Matomo, provides cookieless, consentless tracking](https://matomo.org/faq/new-to-piwik/how-do-i-use-matomo-analytics-without-consent-or-cookie-banner/) that is based on short-lived fingerprinting.

This backend as well is set up so that keys are erased after 24 hours. And for as long as you don't store personal information and the data is only for analytics, it seems that at least Matomo considers this not to require tracking consent either.

But your use case might be different. It's your responsibility to ensure you adhere to all the local laws etc. This library is only for educational purposes. I take no responsibility of anything.

## Can I use this?

Feel free to give this a go. However, while the lambda will scale, the DynamoDB table is not provisioned for gazillions of operations per second. Thus, if you need this in a production environment, better to deploy your own Lambda (or equivalent), and point the library to it instead. You can set the `ThumbmarkStore.options.storageUrl` to be something else. Currently it is set to `https://storage.thumbmarkjs.com/v1/fingerprint`.

Everything you need to deploy your own lambda is in the [Lambda folder](lambda/).
