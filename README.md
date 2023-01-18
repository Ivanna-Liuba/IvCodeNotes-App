# Iv-code-notes App
An App for making code notes or documentations inside browser and see the result 
of your code in the same page at real time

### Used:

1. create-react-app
2. react
3. ts
4. esbuild-wasm
5. localforage lib (for a bit of cashing with  indexDB)
6. monaco-editor/react
7. prettier
8. bulmaswatch


###  Short description:
1. Write description for your code (documentation) ("text" button)
2. Write some code ("code" button):
    - you can split your code into different cells (logic of different cells of code should be combined by one upper descript)
    - get access from the code of the upper cells3 
    - your code`ll be run automatically
3. Write another part of documentation (repeat steps 1-2)
4. Change position of different cells/descript or remove them at all
4. Enjoin =)

    - You can use inbuild ```show``` function to render some code into browser iframe. 
   The function takes as a single param any data types as well as jsx or react-components
