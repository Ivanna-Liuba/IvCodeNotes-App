import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localforage from 'localforage';

const fileCache = localforage.createInstance({
  name: "filecache"
})

export const fetchPlugin = (inputValue: string) => {
  return {
    name: "fetchPlugin",
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /(^index\.js$)/ }, () => {
        return {
          loader: 'jsx',
          contents: inputValue,
        };
      });

      build.onLoad({ filter: /.css*/ }, async (args: any) => {
        const cashedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path)

        if (cashedResult) {
          return cashedResult
        }

        const { data, request } = await axios.get(args.path)

        const escapedQuates = data
          .replace(/\n/g, '')
          .replace(/'/g, "\\'")
          .replace(/"/g, '\\"')

        const contents = `const style = document.createElement("style");
                          style.innerText = "${escapedQuates}" 
                          document.head.appendChild(style)`

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents,
          resolveDir: new URL("./", request.responseURL).pathname
        }

        await fileCache.setItem(args.path, result)

        return result
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {

        const cashedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path)

        if (cashedResult) {
          return cashedResult
        }

        const { data, request } = await axios.get(args.path)

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname
        }

        await fileCache.setItem(args.path, result)

        return result
      });
    }
  }
}