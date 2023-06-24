import nunjucks from 'vite-plugin-nunjucks'
import { resolve } from "path";
import axios from 'axios'
import { defineConfig } from 'vite'
import { ViteMinifyPlugin } from 'vite-plugin-minify'
import {viteObfuscateFile} from 'vite-plugin-obfuscator'

const cwd = process.cwd();
const port = process.env.PORT || 5173;
const localaddress = "http://localhost:" + port.toString();

function zdisableHistoryFallback() {
const path = require('path')
const fs = require('fs')

const ALLOWLIST = [
    // internal requests
    /^\/__vite_ping/,
    /^\/@vite\/client/,
    /^\/@id/,
    /^\/__open-in-editor/,

    // no check needed
    /^\/$/,
    /^\/index.html/,
]
return {
    name: 'disable-history-fallback',
    configureServer(server) {
    server.middlewares.use((req, res, next) => {
        const url = req.url.split('?')[0]

        if (ALLOWLIST.some(pattern => pattern.test(url))) {
        return next()
        }

        //check if the request url ends with .html
        if (url.endsWith('.html')) {
        console.warn(url + ' ends with .html')
        return next()
        } else {
        //check if it has any extension
        if (path.extname(url)) {
            return next()
        } else {
            console.log('No extension found')
            console.log(path.extname(url))
        }
        //redirect as long as the .html file exists
        const htmlPath = path.join(cwd, url + '.html')
        if (fs.existsSync(htmlPath)) {
            axios.get(localaddress + url + ".html").then(response => {
            res.end(response.data);
            })
        } else {
            //attempt to serve 404.html
            console.warn('😢 URL not found:', url);
            if (fs.existsSync(path.join(__dirname, '404.html'))) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            axios.get(localaddress + '/404.html').then(response => {
                res.end(response.data);
            }).catch(error => {
                res.end(error.message);
            })
            } else {
            res.statusCode = 404;
            res.end();
            return;
            }
        }
        }
    });
    }
}
}

const opts = {
rollupOptions: {
    input: {
    index: resolve(cwd, "index.html")
    },
},
};

export default {
build: opts,
devServer: {
    historyApiFallback: false
},
plugins: [
    nunjucks({
    templatesDir: resolve(cwd, "html"),
    variables: {
        'index.html': { username: 'John' }
    }
    }),
    zdisableHistoryFallback(),
    ViteMinifyPlugin({}),
    viteObfuscateFile({})
]}