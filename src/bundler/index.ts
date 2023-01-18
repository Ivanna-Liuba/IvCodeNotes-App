import {useRef, useEffect} from 'react';

import * as esbuild from "esbuild-wasm"
import {unpkgPathPlugin} from './plugins/unpkg-path-plugin';
import {fetchPlugin} from './plugins/fetch-plugin';
import {BuildResult, OutputFile} from 'esbuild-wasm';


let isService: boolean = false

const bundle = async (rawInputCode: string) => {
  if(!isService) {
    await esbuild.initialize({ //early = esbuild.startService //can be called just once
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.16.12/esbuild.wasm" //instead putting "/esbuild.wasm" into public
    }).then(() => {
      isService = true
    })
      .catch(err => {
        isService = false
      })
  }

  let result: (BuildResult & { outputFiles: OutputFile[]; }) | null = null

  if(isService) {
    try {
      result = await esbuild.build({
        entryPoints: ["index.js"],
        bundle: true,
        write: false,
        plugins: [
          unpkgPathPlugin(),
          fetchPlugin(rawInputCode)
        ],
        define: {
          "process.env.NODE_ENV": "'production'",
          global: "window"
        },
        jsxFactory: "_React.createElement",
        jsxFragment: "_React.Fragment"
      })

      return {
        code: result?.outputFiles[0].text,
        err: ""
      }
    } catch (err) {
      if (err instanceof Error) {
        return {
          code: "",
          err: err.message
        }
      } else {
        throw new Error()
      }
    }

  }

  return {
    code: "",
    err: "Bundler initialization error"
  }
}

export default bundle