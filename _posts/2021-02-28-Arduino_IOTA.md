上傳感測器資料到IOTA
------------

IOTA Tangle是近幾年推出的分散式帳本，跟過去的比特幣或以太坊的區塊鏈帳本不同，它是採用DAG(有向無環圖)的結構作為分散式帳本的基礎。除了結構本身的不同，它採用的POW(工作量證明)是由交易者驗證，每上傳一筆交易，必須先驗證兩筆網路中的交易，這樣的好處是可以大幅的提高驗證速度，也就是發起交易的人越多，驗證的速度越快。IOTA Tangle還有一個好處是交易不需要手續費，因此更適合做為物聯網的應用，以太坊雖然有smart contract可以記錄資料，並且在供應鏈上的應用，以太坊已經發揮的淋漓盡致，但每發起一筆物聯網就必須負擔手續費，如果是大量且即時的資料交換，以太坊就不太適合，而IOTA的MAM就可以做到資料追溯的功能。這個例子是我實作將RFID的資料串接到IOTA，並且可以查看。

需要環境：
-----

*   PC(Windows 10、ubuntu 18.04)
*   Arduino nano 33(需要有WIFI 模組)
*   RFID reader
*   一張或數張 RFID card
*   WiFi

**流程架構：**
---------

![](https://miro.medium.com/max/1400/1*8bg-SMVp4ddGkjgicuw4IQ.png)

> **步驟 1 連接硬體設備的配置**

*   將RFID reader的腳位對應到Arduino nano板子上的腳位。

![](https://miro.medium.com/max/1100/0*RR81uwwAuSWrJrsH)rfid reader對應腳位![](https://miro.medium.com/max/1400/0*MTzmbD4LJeKv-0BD.jpg)arduino nano的腳位

> **步驟 2 燒錄讀取韌體到 arduino nano**

*   git clone [我的程式碼](https://github.com/Yorkchung/rfid_to_tangle)
*   在arduino IDE 工具>開發版 安裝對應的驅動程式

![](https://miro.medium.com/max/1400/1*0GyC54vMyZ9tZt6jw74byg.png)安裝SAMD Boards![](https://miro.medium.com/max/1400/1*ldglGD9MIUtIKdymqahCyg.png)選擇NANO 33 IOT的驅動程式

*   這裡會使用到[mqtt.ino](https://github.com/Yorkchung/rfid_to_tangle/blob/main/arduino/mqtt.ino)和[credentials.h](https://github.com/Yorkchung/rfid_to_tangle/blob/main/arduino/credentials.h)，[mqtt.ino](https://github.com/Yorkchung/rfid_to_tangle/blob/main/arduino/mqtt.ino)裡面做的是讀取RFID reader所收到的資料，並且透過wifinina連接網路，發送封包到開啟mqtt broker的主機位置
*   在[credentials.h](https://github.com/Yorkchung/rfid_to_tangle/blob/main/arduino/credentials.h)填入自己wifi的密碼和要連線主機的ip，mqtt可以暫時不用設帳密
*   upload [mqtt.ino](https://github.com/Yorkchung/rfid_to_tangle/blob/main/arduino/mqtt.ino)程式到arduino nano，測試序列埠監控視窗是否可以讀取RFID

> **步驟 3 PC讀取 mqtt 的資料**

*   因為上傳IOTA的資料是用node.js，所以讀取mqtt的資料我也是用node.js去寫的，因此必須先確認是否有安裝node.js在電腦裡
*   在package.json的同一個資料夾中開啟cmd，輸入 _npm install_
*   安裝包會安裝6個套件

1.  [@iota/converter](http://twitter.com/iota/converter)
2.  [@iota/core](http://twitter.com/iota/core)
3.  [@iota/mam](http://twitter.com/iota/mam)
4.  iota.lib.js
5.  mosca
6.  mqtt

*   讀取mqtt的資料需要使用broker跟subscribe去串接資料，執行到這，基本上就可以將RFID tag透過WiFi上傳PC的1883 port，透過subscribe讀取資料

> **步驟 4 上傳 mqtt 的資料到 IOTA**

*   這裡會使用到IOTA官方的套件：mam.client.js，可以在node module裡的@iota找到
*   上傳資料到IOTA Tangle需要選擇是哪一個主網，IOTA有三個主要的網路：Mainnet、Devnet、Comnet，我在這使用的是Devnet測試網的節點

*   初始化mam

*   設定channel 模式，mam有三種控管權限：public、private、restricted，我使用restricted控管，也就是別人知道我的root沒用，還是無法知道訊息內容，還必須知道sidekey才能解密

*   發布訊息到IOTA Tangle network

*   將mqtt的資料打包成json，mam資料傳送不一定要json格式，但使用json格式比較方便知道sensor對應的一些資料欄位

> **步驟 5 查看 MAM 的訊息資料**

*   開啟cmd執行mam\_publish.js，會印出轉碼過後的sidekey，當收到mqtt的資料並轉發到IOTA上的話，會印出root跟address

```
\> node mam\_publish.js
```

*   可以透過[https://explorer.iota.org/devnet/streams/0/](https://explorer.iota.org/devnet/streams/0/) 查看所傳送的mam資料，將root跟sidekey填入就可以查詢

![](https://miro.medium.com/max/1400/1*ioGJBN5OdqAcrxlWolOoMA.png)

*   也可以透過[https://mam-explorer.firebaseapp.com/](https://mam-explorer.firebaseapp.com/) 去查詢資料

![](https://miro.medium.com/max/1400/1*tT_W_MlB0kkHh-of0j8jWg.png)

*   還有一個網站是查詢交易的，因為mam其實是發送不連續的零值交易，所以也可以透過address查詢其中一筆mam的訊息，但如果要trace 物聯網的資料，還是必須用mam explorer來追溯

![](https://miro.medium.com/max/3792/1*xFFFP8QPC8A2n5QjFTAd-g.png)![](https://miro.medium.com/max/3774/1*k5JIDwLpsNuUJkiHvjdJ9A.png)

以上就是將RFID的資料上傳到IOTA Tangle的方法

[

Yorkchung/rfid\_to\_tangle
--------------------------

### Contribute to Yorkchung/rfid\_to\_tangle development by creating an account on GitHub.

github.com

](https://github.com/Yorkchung/rfid_to_tangle)
