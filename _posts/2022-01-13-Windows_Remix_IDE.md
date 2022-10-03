Windows Remix IDE
=================

在Windows建立自己的Remix IDE
----------------------

Remix是以太坊官方開發的智慧合約整合開發環境，你可以在Remix上編輯、測試、發布自己的智慧合約。因為智慧合約一旦發布到區塊鏈就不能修改，也不能刪除，因此如果自己的智慧合約寫錯，甚至有漏洞就非常危險，所以在發布合約之前會先在自己的環境測試後再發布到以太坊等公有鏈上。我們可以使用VScode或Atom，甚至notepad++來編輯自己的合約，但Remix是一個包含完整功能的編輯器，因此使用Remix來進行開發會方便許多。

> [官方Remix web IDE: https://remix.ethereum.org/](https://remix.ethereum.org/)

本篇不是介紹如何使用Remix來開發智慧合約，相信網路上已經有許多文章了，本篇主要是嘗試在自己的本地端建立網頁版IDE，Remix 有desktop版本可以進行下載這裡就不多談，這裡談的是如果需要提供一個Remix服務給別人使用要如何建置。

使用的環境是在Windows底下進行建置，如果是使用Linux系統更好，因為建置步驟更為簡單。在Windows建置環境會遇到許多問題，本篇會提到如何解決。Remix是一個open source的專案，所以可以在github找到相關的專案。詳細建置步驟如下，本篇使用WSL來建置系統，WSL是微軟開發的Linux core，可以讓我們在Windows中執行Linux指令，不用再開虛擬機。因為如果在Windows環境下直接建置有問題，我猜測可能的原因是Remix本身是Linux環境開發，因此對於Windows環境較不支援，不過幸好有WSL，仍然可以進行開發。

> 步驟1:安裝WSL

1.1 用管理員權限開啟Powershell

```
這行指令是允許Windows建立Linux子系統，電腦重開之後就可以安裝Linux  
\> Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
```![](https://miro.medium.com/max/1400/1*elFkzVrxaH86Y1aeyqnLtw.png)

1.2 在Microsoft Store安裝Ubuntu

這裡選擇Ubuntu 20.04 LTS，也可以選擇其他版本的Ubuntu，如果原本就是使用Linux系統安裝，那接下來的步驟都跟Windows的方式差不多。

![](https://miro.medium.com/max/1400/1*-ZdjifW01Zd79KCMSLgQFQ.png)Microsoft Store```
在Ubuntu的視窗執行命令，可以看到目前系統版本，即是安裝成功。  
\> wslfetch
```![](https://miro.medium.com/max/1400/1*ZnbOnhPtzv5f2fkmoeR8oQ.png)WSL terminal

> 步驟2:前置作業

2.1 準備好git、npm、node.js

```
版本最少需要這些以上  
"engines": {  
    "node": "^14.17.6",  
    "npm": "^6.14.15"  
 }
```

*   git應該原本就會存在WSL，如果沒有可以下以下指令:

`> sudo apt-get install git`

*   node.js安裝指令:

`> sudo apt install nodejs`

*   npm安裝指令:

`> sudo apt-get install npm`

2.2 安裝 Nx CLI來將環境build起來

```
\> npm install -g @nrwl/cli
```

> 步驟3:將Remix網站建置起來

3.1 將專案clone到自己想要放的資料夾

```
\> git clone  [https://github.com/ethereum/remix-project.git](https://github.com/ethereum/remix-project.git)
```

3.2 到remix-project資料夾底下後，安裝會用到的套件

```
\> cd remix-project
```

*   轉換到root權限

```
\> sudo su -
```

*   安裝套件

```
\> npm install
```

*   這時候如果是在Windows下執行這行指令會發現錯誤

![](https://miro.medium.com/max/1400/1*LdHk_qUKrcFuSLK810D2WA.png)Error![](https://miro.medium.com/max/1400/1*38FgYtV2Fwo0yyFsCCeldg.png)Error

原因是因為在安裝sha3的node-gyp套件的時候報錯，log顯示要Visual Studio 2017以上，根據其他平台的解答，可以嘗試安裝Visual Studio，並修改 ~\\node\_modules\\node-gyp\\gyp\\pylib\\gyp\\MSVSVersion.py，可以參考[這篇github](https://github.com/nodejs/node-gyp) 和[這篇](https://github.com/phusion/node-sha3/issues/27)。

![](https://miro.medium.com/max/1400/1*gRaNF8UyNwlJV84qTFJbog.png)Visual Studio Installer![](https://miro.medium.com/max/1400/1*VG-eejzHTEzHJsxCkss7Vg.png)MSVSVersion.py

但我實驗的結果是仍然無法成功執行，因此不建議直接在Windows環境下安裝，建議在WSL執行，方便且不容易出錯。
--------------------------------------------------------

*   WSL執行結果如下

![](https://miro.medium.com/max/1400/1*jcravI0U4Vp89R0360Ac6g.png)npm install

3.3 將環境build起來

```
\> npm run build:libs
```![](https://miro.medium.com/max/1400/1*u8ZscrsblXRwkjiXps45Ag.png)```
\> nx build
```![](https://miro.medium.com/max/1400/1*LeX5x-TEDhmB_m8Rr6KOJA.png)

3.4 將服務開啟

```
\> nx serve
```![](https://miro.medium.com/max/1400/1*kNu9j-5qhJgNy-8lKVuJhw.png)

> 步驟4:執行結果

4.1 可以在localhost看到結果，預設8080

```
\> curl [http://localhost:8080](http://localhost:8080)
```![](https://miro.medium.com/max/1400/1*26x96rH_mJtaKVMeNtCYLQ.png)

4.2 修改IP後可以在原本Windows開啟瀏覽網頁

*   查看WSL內網IP

```
\> ifconfig
```

*   在nx serve多加port和IP

```
nx serve --host "IP" --port "port"
```![](https://miro.medium.com/max/1400/1*ieHqasMkzH_ohENq3g5r6w.png)

4.3 開啟瀏覽器http://ip:port

![](https://miro.medium.com/max/1400/1*mYp4zfYpLXkpcJlaPPMO2w.png)Remix web IDE

成功執行!!!
=======

使用方法跟官方一樣，而且編譯器也是最新版本，以太坊很容易因為編譯器版本出錯而不能執行，如果官方更新編譯器或功能，只要再`git pull`就好，這樣我們就可以控管自己的智慧合約，並且編輯、測試和發布合約，甚至可以提供服務給其他有需求的人使用。
