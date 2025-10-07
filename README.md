## Async Wrapper Library for [Nekos API](https://nekosapi.com/)
[![npm version](https://badge.fury.io/js/nekosapi.svg)](https://badge.fury.io/js/nekosapi)

* Supports NekosAPI [**v1**](https://v1.nekosapi.com/docs) and [**v4**](https://nekosapi.com/docs)
* Uses [Axios](https://axios-http.com/) for HTTP requests* 
* [Proxy support](https://github.com/CataDev0/nekosapi/issues/2) available via [socks-proxy-agent]("https://www.npmjs.com/package/socks-proxy-agent")

## 📘 [Documentation](https://CataDev0.github.io/nekosapi/)
### Quick overview
#### Import NekosAPI v4:
```ts
// TypeScript
import NekosAPI from "nekosapi";
// JavaScript
const { NekosAPI } = require("nekosapi");

const api = new NekosAPI();

api.getRandomImage("Catgirl")
    .then(image => console.log(image));
```

#### Import NekosAPI v1:
```js
// Using CommonJS
const { NekosAPIv1 } = require("nekosapi"); 
// Named export
const NekosAPI = require("nekosapi/v1");
// Default export

// The constructor optionally accepts an API token
const api = new NekosAPI("optional-token-here");

// Returns NekosImage object
api.getRandomImage("Catgirl")
    .then(image => console.log(image));
```

### 🧪 [Source Code](https://github.com/CataDev0/nekosapi)

---

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/C0C3IJV8A)

*Consider supporting this project on Ko-fi!*